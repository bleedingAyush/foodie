import React, {
  useMemo,
  useReducer,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  BackHandler,
  ActivityIndicator,
} from "react-native";

import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import Incrementor from "../Incrementor";
import ProductDescription from "./ProductDescription";
import { useIsMounted } from "../../../../hooks/useIsMounted";
import { useDispatch, useSelector } from "react-redux";
import { productDataItems } from "../../../../redux/FoodData/ProductSelector";
import { AddModalId } from "../../../../redux/FoodData/actions/product-actions";
import SubCategories from "../SubCategories";

const { width, height } = Dimensions.get("window");
const HomeModalScreen = () => {
  const reference = useRef(null);
  const data = useSelector(productDataItems);
  const dispatch = useDispatch();
  const modalData = data.modalFoodId;
  const modalId = modalData?.id;
  const [isShown, setIsShow] = useState(modalData?.show);
  const final_data = data.products;
  const [item, setItem] = useState({});
  const [subDataId, setSubDataId] = useState([]);
  const [price, setprice] = useState(null);
  const [itemData, setItemData] = useState([]);

  const isMounted = useIsMounted();
  useEffect(() => {
    if (!modalData) return;
    let [dataObj] = final_data.filter((item) => item.id === modalId);
    setItem(dataObj);
    priceModifier(dataObj);
  }, [modalId, JSON.stringify(final_data)]);

  useEffect(() => {
    if (modalData === null || undefined) return;
    setIsShow(true);
    handlePresentModalPress();
  }, [modalId, isShown]);

  const priceModifier = (data) => {
    const itemSubCategory = data?.itemDetails;

    if (itemSubCategory) {
      let firstItemPrice = 0;
      let firstItemSubDataId = null;
      let items = itemSubCategory.reduce(
        (initialValue, currentValue, index) => {
          let obj = {};
          if (index === 0) {
            // set the price and subDataId for the first item
            firstItemPrice = currentValue.price;
            firstItemSubDataId = currentValue.subDataId;
            obj = { status: "checked", ...currentValue };
          } else {
            obj = { status: "unchecked", ...currentValue };
          }
          initialValue.push(obj);
          return initialValue;
        },
        []
      );

      setprice(firstItemPrice);
      setSubDataId(firstItemSubDataId);
      setItemData(items);
    } else if (data?.price) {
      setprice(data.price);
    }
  };

  const handleOnPress = (item, status) => {
    let updatedStatus = status === "checked" ? "unchecked" : "checked";
    if (status == "checked") {
      return;
    }
    const updatedData = itemData.reduce((data, currentValue, index) => {
      let dataObj = {};
      item.subDataId === currentValue.subDataId
        ? (dataObj = { ...currentValue, status: updatedStatus })
        : (dataObj = { ...currentValue, status: "unchecked" });
      data.push(dataObj);
      return data;
    }, []);

    setItemData([...updatedData]);
    setprice(item.price);
    setSubDataId(item?.subDataId);
  };

  let snapPoint = item.image ? "80%" : "40%";
  const snapPoints = useMemo(() => [snapPoint], [snapPoint]);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    reference.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index) => {
    if (index === -1) {
      dispatch(AddModalId(null));
      setSubDataId(null);
    }
  }, []);

  return (
    <BottomSheetModal
      name={"HomeModalScreen"}
      ref={reference}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      handleComponent={null}
      dismissOnPanDown={true}
    >
      {isShown && price ? (
        <>
          <BottomSheetScrollView
            style={{ marginBottom: 80 }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              overflow: "hidden",
            }}
          >
            <ProductDescription data={item} />
            {item.itemDetails && (
              <>
                <View style={styles.line} />

                <Text style={styles.subTitle}>Customize</Text>
                <Text style={styles.subCategorySubTitle}>
                  Please select an option
                </Text>
              </>
            )}

            {item.itemDetails &&
              itemData.map((item) => {
                return (
                  <View key={item.subDataId}>
                    <SubCategories
                      details={item.details}
                      price={item.price}
                      status={item.status}
                      SubCategoryStyle={{
                        paddingBottom: 10,
                        paddingLeft: 10,
                      }}
                      onPress={() => handleOnPress(item, item.status)}
                    />
                  </View>
                );
              })}
          </BottomSheetScrollView>

          <View style={styles.cardLine} />
          <View style={styles.bottomCard}>
            <Incrementor
              size={"big"}
              quantity={1}
              value={1}
              price={price}
              id={item?.id}
              subDataId={subDataId}
            />
          </View>
        </>
      ) : (
        <View />
      )}
    </BottomSheetModal>
  );
};

export default HomeModalScreen;

const styles = StyleSheet.create({
  line: {
    marginTop: 10,
    paddingLeft: 0,
    opacity: 0.2,
    borderBottomColor: "black",
    borderBottomWidth: 1.2,
    alignSelf: "stretch",
  },
  subCategorySubTitle: {
    fontSize: 14,
    opacity: 0.7,
    paddingTop: 5,
    paddingBottom: 10,
    left: 10,
    fontFamily: "Medium",
  },
  subTitle: { fontSize: 20, left: 10, fontFamily: "Medium" },
  bottomCard: {
    flexDirection: "row",
    position: "absolute",
    bottom: 10,
    right: 0,
    left: 0,
  },
  cardLine: {
    position: "absolute",
    paddingLeft: 0,
    bottom: 70,
    borderBottomWidth: 1.2,
    opacity: 0.2,
    right: 0,
    left: 0,
    borderBottomColor: "black",
  },
  container: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: "hidden",
  },
});
// {price !== null && (
// <>
//   <View style={styles.cardLine} />
//   <View style={styles.bottomCard}>
//     <Incrementor
//       size={"big"}
//       quantity={1}
//       value={1}
//       price={price}
//       id={item?.id}
//       subDataId={subDataId}
//     />
//   </View>
// </>
// )}
