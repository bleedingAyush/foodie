import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { cartDataItems } from "../../redux/cart/selectors/CartSelector";
import CartRowRender from "./CartRowRender";
import {
  ApiReset,
  postOrder,
  resetCart,
} from "../../redux/cart/actions/cart-actions";
import { COLORS } from "../../constants";
import produce from "immer";
import { useFocusEffect } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");
const CartScreen = ({ navigation }) => {
  const stateOfCart = useSelector(cartDataItems);
  const dispatch = useDispatch();
  const cartdata = stateOfCart.data;
  const [cartDataState, setCartDataState] = useState(cartdata);

  const restaurant = stateOfCart.restaurant;
  const loading = stateOfCart.loading;
  const isLoading = loading?.REQUEST?.id?.includes("POST_ORDER_REQUEST");

  let deliveryCharge = restaurant.deliveryCharge;
  const totalPrice = stateOfCart.totalPrice;

  useEffect(() => {
    setCartDataState(
      produce((draft) => {
        if (cartdata.length == 0) {
          return (draft = []);
        }
        return (draft = cartdata);
      })
    );
  }, [JSON.stringify(cartdata)]);

  const sendOrder = () => {
    let data = cartdata.map((a) => {
      return { ...a };
    });
    dispatch(postOrder(data, deliveryCharge));
  };

  const renderRow = ({ item }) => {
    return <CartRowRender item={item} />;
  };

  const keyExtractor = (item) => `${item.id + item?.subDataId}`;

  useEffect(() => {
    if (loading?.SUCCESS?.id?.includes("POST_ORDER_SUCCESS")) {
      ToastAndroid.show("Order Placed 🎉", ToastAndroid.SHORT);
      dispatch(ApiReset());
      dispatch(resetCart());

      navigation.navigate("OrderScreen");
    } else if (loading?.FAILURE?.id?.includes("POST_ORDER_FAILURE")) {
      ToastAndroid.show("Something went wrong ❌", ToastAndroid.LONG);

      dispatch(ApiReset());
    }
  }, [JSON.stringify(loading)]);

  if (cartDataState.length === 0) {
    return (
      <View style={styles.emptyCartView}>
        <Image
          style={styles.image}
          source={require("../../assets/images/EmptyCart.png")}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cartDataState}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        renderItem={renderRow}
        contentContainerStyle={styles.contentContainer}
        ListFooterComponent={<View style={styles.FooterComponentView} />}
        showsVerticalScrollIndicator={false}
      />
      <View>
        <Text style={styles.error}>Orders once placed cannot be cancelled</Text>
        <View style={styles.card}>
          <View style={styles.itemView}>
            <Text style={styles.footerTextTitle}>Item Total: </Text>
            <Text style={styles.footerTextPrice}>₹ {totalPrice}</Text>
          </View>
          <View style={styles.itemView}>
            <Text style={styles.footerTextTitle}>Delivery Charge</Text>
            <Text style={styles.footerTextPrice}>₹ {deliveryCharge}</Text>
          </View>
          <View style={styles.itemView}>
            <Text style={styles.footerTextTitle}>You have to pay:</Text>
            <Text style={styles.totalPrice}>
              ₹ {totalPrice + deliveryCharge}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.4}
        style={styles.orderNow}
        onPress={sendOrder}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Order now</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  emptyCartView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },

  modalView: {
    marginTop: "auto",
    height: "15%",
    backgroundColor: "#000",
  },
  image: { width: width * 0.5, height: height * 0.5 },
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  card: {
    height: 0,
    width: 0,
    backgroundColor: "#fff",
    marginTop: 5,
    borderRadius: 10,
    bottom: 42,
    borderRadius: 0,
    padding: 10,

    width: width,
    height: height * 0.12,
  },

  error: {
    marginTop: 10,
    fontWeight: "bold",
    color: "red",
    bottom: 40,
    paddingLeft: 5,
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  orderNow: {
    height: 40,

    right: 0,
    left: 0,
    backgroundColor: COLORS.primary,
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
  },
  buttonText: {
    textAlign: "center",
    fontFamily: "Medium",
    color: "#fff",
    fontSize: 16,
  },
  FooterComponentView: {
    marginBottom: 40,
  },
  itemView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerTextTitle: { fontFamily: "Medium", fontSize: 16 },
  footerTextPrice: {
    fontFamily: "Bold",
    fontSize: 16,
    textAlign: "center",
  },
  totalPrice: {
    fontFamily: "Bold",
    fontSize: 18,
  },
});
