import React, { useState, memo, useCallback } from "react";
import { useEffect } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";

import CartIncrementor from "./CartIncrementor";

const { width, height } = Dimensions.get("window");

const CartRowRender = ({ item }) => {
  const [price, setPrice] = useState(item?.quantityPrice);

  useEffect(() => {
    setPrice(item?.quantityPrice);
  }, [item?.quantityPrice]);

  return (
    <>
      <View style={styles.card}>
        <View style={styles.cardItems}>
          <Text style={styles.text}>{item.name}</Text>
          <CartIncrementor
            value={item.quantity}
            id={item.id}
            subDataId={item.subDataId}
            price={item.price}
            quantity={item?.quantity}
          />

          <View style={styles.priceView}>
            <Text style={styles.text}>₹ {price}</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default CartRowRender;

const styles = StyleSheet.create({
  cardItems: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
  },
  spinnerStyle: {
    width: 120,
    borderRadius: 5,
    height: 10,
  },

  priceView: { alignItems: "flex-end" },
  text: { fontFamily: "Medium", fontSize: 14 },

  card: {
    height: 0,
    width: 0,
    backgroundColor: "#fff",
    // elevation: 7,
    marginTop: 5,
    borderRadius: 5,
    width: width * 0.9,
    height: height * 0.07,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  error: {
    marginTop: 10,
    fontWeight: "bold",
    color: "red",
    bottom: 90,
    paddingLeft: 5,
  },
});
