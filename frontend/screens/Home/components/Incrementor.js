import React, { useRef, useState, useEffect, memo, useMemo } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  useWindowDimensions,
  ToastAndroid,
  Dimensions,
} from "react-native";
import { useDispatch } from "react-redux";
import {
  showCartItems,
  removeItems,
  decreaseItems,
} from "../../../redux/cart/actions/cart-actions";
import { useIsMounted } from "../../../hooks/useIsMounted";
import { COLORS } from "../../../constants";
const { height, width } = Dimensions.get("window");
const buttonWidth = width * 0.135;
const buttonHeight = 50;

const Incrementor = (props) => {
  let size = props.size;

  const height_view = size === "small" ? 30 : 50;
  const width_view = size === "small" ? 40 : 50;

  let intital_num = props.value;
  let initialPrice = props.price;
  let quantity = props.quantity;

  const [num, setNum] = useState(quantity);
  const [price, setPrice] = useState(initialPrice);
  const dispatch = useDispatch();
  const isMounted = useIsMounted();

  const increase = () => {
    if (num < 10) {
      setNum(num + 1);
      setPrice(num * initialPrice);
      if (size === "small") {
        changeCartItems();
      }
    }
  };

  const decrease = () => {
    if (num > 1) {
      setNum(num - 1);
      setPrice(num * initialPrice);
      if (size === "small") {
        decreaseCartItems();
      }
      //   if (num !== 1) {
      //     setPrice(num * initialPrice - initialPrice);
      //   }
    } else {
      removeCartItems();
    }
  };

  const changeCartItems = () => {
    let result = null;
    // let quantity = item.quantity - itemQuantity;
    let id = props.id;
    let price = props.price;
    let subDataId = props.subDataId;
    if (subDataId) {
      result = { id, quantity: 1, price, subDataId };
    } else {
      result = { id, quantity: 1, price };
    }
    if (result !== null) {
      dispatch(showCartItems(result));
    }
  };

  const decreaseCartItems = () => {
    let id = props.id;
    let subDataId = props.subDataId;
    let result = null;
    if (subDataId) {
      result = { id, subDataId };
    } else {
      result = { id };
    }
    if (result !== null) {
      dispatch(decreaseItems(result));
    }
  };

  const removeCartItems = () => {
    let result = null;
    let id = props.id;
    let subDataId = props.subDataId;
    if (subDataId) {
      result = { id, subDataId };
    } else {
      result = { id };
    }
    if (result !== null) {
      dispatch(removeItems(result));
    }
  };

  useEffect(() => {
    if (isMounted.current) {
      setPrice(num * initialPrice);
    }
  }, [num, initialPrice]);

  const sendToCart = () => {
    let result = null;
    let subDataId = props.subDataId;
    let id = props.id;

    if (subDataId === null) {
      result = { id, quantity: num, price: initialPrice };
    } else {
      result = { id, quantity: num, price: initialPrice, subDataId };
    }
    dispatch(showCartItems(result));

    ToastAndroid.show("Items added to the cart 🎉", ToastAndroid.SHORT);
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={decrease}
          activeOpacity={1}
          style={styles.decreaseButton}
        >
          <Text style={styles.decreaseButtonText}>-</Text>
        </TouchableOpacity>
        <View style={styles.valueContainer}>
          <Text style={styles.initialValue}>{num}</Text>
        </View>
        <TouchableOpacity
          onPress={increase}
          activeOpacity={1}
          style={styles.increaseButton}
        >
          <Text style={styles.increaseButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      {size !== "small" && (
        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.buyButton} onPress={sendToCart}>
            <Text style={styles.buyText}>Add to Cart ₹ {price}</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default Incrementor;

Incrementor.defaultProps = {
  value: 1,
  size: "small",
  price: null,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    left: 10,
  },
  decreaseButton: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,

    backgroundColor: "#fff",
    justifyContent: "center",
    elevation: 10,
    alignItems: "center",
    width: buttonWidth,
    height: buttonHeight,
  },
  decreaseButtonText: {
    color: "#000",
    textAlign: "center",
    fontFamily: "Medium",
    fontSize: 35,
  },
  valueContainer: {
    elevation: 10,

    backgroundColor: "#fff",
    width: buttonWidth,
    height: buttonHeight,
    justifyContent: "center",
    alignItems: "center",
  },
  initialValue: {
    fontStyle: "normal",
    fontWeight: "bold",
  },
  increaseButton: {
    backgroundColor: "#fff",
    justifyContent: "center",
    elevation: 10,
    alignItems: "center",
    width: buttonWidth,
    height: buttonHeight,

    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  increaseButtonText: {
    fontSize: 25,
    fontFamily: "Medium",
    color: "#000",
    textAlign: "center",
  },
  buttonView: { marginLeft: "auto", right: 10 },
  buyText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontFamily: "Bold",
  },

  buyButton: {
    backgroundColor: COLORS.primary, // #f62459
    borderRadius: 5,
    justifyContent: "center",
    alignSelf: "flex-start",
    elevation: 10,

    height: 50.5,
    width: width * 0.5,
  },
});
