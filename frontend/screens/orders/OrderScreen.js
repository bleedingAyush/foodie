"use-strict";

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  FlatList,
  Pressable,
  RefreshControl,
  Modal,
  ToastAndroid,
} from "react-native";
import LottieView from "lottie-react-native";
import {
  addOrder,
  modifyOrder,
  showOrderItems,
} from "../../redux/orders/order-actions";
import { useDispatch, useSelector } from "react-redux";
import dayjs, { unix } from "dayjs";
import { ChevronRight, X, ArrowLeft } from "react-native-feather";
import { ScrollView } from "react-native";
import ErrorComponent from "../../components/app/ErrorComponent";
import ModalView from "./components/ModalView";
import useRealtimeOrders from "./hooks/useRealtimeOrders";

const { width, height } = Dimensions.get("screen");
const OrderScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const ordersSelector = useSelector((state) => state.ordersReducer);
  const loading = useSelector((state) => state.loadingReducer);
  const isOrdersLoading = loading?.REQUEST?.id.includes("ORDERS_REQUEST");
  const isOrdersSuccess = loading?.SUCCESS?.id?.includes("ORDERS_SUCCESS");
  const isOrderFailure = loading?.FAILURE?.id?.includes("ORDERS_FAILURE");
  const orderData = ordersSelector.orders;

  const [modalVisible, setModalVisible] = useState(false);
  const [itemData, setItemData] = useState(null);

  useEffect(() => {
    dispatch(showOrderItems());
  }, []);
  useRealtimeOrders();

  useEffect(() => {
    if (isOrderFailure) {
      ToastAndroid.show("Something went wrong", ToastAndroid.LONG);
    }
  }, [isOrderFailure]);

  const hideModal = () => {
    if (modalVisible) setModalVisible(false);
  };

  const showModal = (item) => {
    if (!modalVisible) {
      setItemData(item);
      setModalVisible(true);
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  const renderItem = ({ item }) => {
    const unixSeconds = item.created_at.seconds;
    let day = dayjs.unix(unixSeconds).format("DD MMM YYYY");

    const PassData = () => {
      showModal(item);
    };
    return (
      <>
        <Pressable onPress={PassData}>
          <View style={styles.cards}>
            <View style={styles.orderStatus}>
              <Text style={styles.orderStatusText}>{item.order_status}</Text>
            </View>
            <Text style={styles.font}>{day}</Text>
            <Text style={styles.font}>items : {item.order_items.length}</Text>
            <ChevronRight color="#000" opacity={0.65} height={24} width={24} />
          </View>
        </Pressable>
      </>
    );
  };

  const refreshData = () => {
    dispatch(showOrderItems());
  };

  if (isOrderFailure) return <ErrorComponent reload={refreshData} />;

  if (orderData.length === 0 && isOrdersLoading) {
    return (
      <View style={styles.lottieView}>
        <LottieView
          autoPlay
          source={require("../../assets/LottieAnimations/loading.json")}
          style={styles.lottie}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ArrowLeft
        color="#000"
        height={25}
        width={25}
        style={styles.backArrowStyle}
        onPress={goBack}
      />
      <Text style={styles.titleText}>Orders</Text>
      <FlatList
        data={orderData}
        contentContainerStyle={styles.containerContent}
        keyExtractor={(item, index) => `${item.orderId}`}
        renderItem={renderItem}
        onRefresh={refreshData}
        refreshing={isOrdersLoading}
      />

      {itemData !== null && (
        <ModalView
          orderId={itemData?.orderId}
          modalVisible={modalVisible}
          hideModal={hideModal}
        />
      )}
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  lottieView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lottie: { width: 100, height: 100 },
  modalView: {
    height: "40%",
    marginTop: "auto",
    backgroundColor: "#fff",
    shadowRadius: 0.2,
    elevation: 5,
    width: "100%",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    // padding: 5,
  },
  cross: {
    position: "absolute",
    right: "45%",
    left: "45%",
    // bottom: 0,
    top: "50%",
  },

  backArrowStyle: {
    position: "absolute",
    left: 10,
    top: 5,
  },
  header: {
    justifyContent: "space-between",

    flexDirection: "row",
    marginBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    width: "100%",
  },
  cardsText: {
    fontFamily: "Medium",
    fontSize: 18,
    paddingRight: 5,
    paddingLeft: 5,
  },
  itemText: {
    color: "#000",
    fontFamily: "Medium",
    paddingBottom: 2.5,
    opacity: 0.8,
    paddingLeft: 5,
  },
  quantityText: {
    fontFamily: "Medium",
    position: "absolute",
    right: 5,
    paddingRight: 5,
    opacity: 0.8,
  },

  quantityPriceText: {
    fontFamily: "Medium",
    position: "absolute",
    right: 0,
    top: 22,
    paddingRight: 5,
  },
  headerTextView: { flexDirection: "row", justifyContent: "space-between" },

  totalPriceText: {
    position: "absolute",
    right: 0,
    bottom: 5,
    right: 5,
    fontSize: 16,
    fontFamily: "Medium",
  },
  ordersModal: {
    marginTop: 10,
    // borderColor: "#d9d9d9",
    // width: width * 0.97,
    height: 40,
    paddingBottom: 15,
    borderBottomColor: "#cccccc",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "transparent",
    borderWidth: 1,
    opacity: 0.7,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  cards: {
    width: width * 0.85,
    height: height * 0.07,
    elevation: 5,
    borderRadius: 5,
    margin: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  titleText: {
    marginTop: 25,
    fontFamily: "Regular",
    fontSize: 18,
  },
  containerContent: { marginTop: 20 },
  orderStatus: {
    height: 25,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#15a17b",
    borderRadius: 4,
  },
  orderStatusText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Medium",
    // fontSize: 15,
  },
  font: { fontFamily: "Medium" },
});
