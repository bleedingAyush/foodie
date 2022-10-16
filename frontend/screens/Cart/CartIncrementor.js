import React, { useRef, useState, useEffect, memo, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useDispatch } from "react-redux";
import {
  showCartItems,
  decreaseItems,
  removeItems,
} from "../../redux/cart/actions/cart-actions";

const { width } = Dimensions.get("window");
const buyButtonWidth = width * 0.5;
const buttonWidth = width * 0.1;
const buttonHeight = 30;

const CartIncrementor = (props) => {
  let initial_num = props.value;
  const quantity = props.quantity;

  const [num, setNum] = useState(initial_num);
  const dispatch = useDispatch();

  const increase = () => {
    if (num < 10) {
      changeCartItems();
    }
  };

  const decrease = () => {
    if (num > 1) {
      setNum((num) => num - 1);
      decreaseCartItems();
    } else {
      removeCartItems();
    }
  };

  const changeCartItems = () => {
    let result = null;
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
    const isQuantityLessThanZero = quantity - 1 < 1;
    if (isQuantityLessThanZero) {
      return removeCartItems();
    }
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

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={decreaseCartItems}
          activeOpacity={1}
          style={styles.decreaseButton}
        >
          <Text style={styles.decreaseButtonText}>-</Text>
        </TouchableOpacity>
        <View style={styles.valueContainer}>
          <Text style={styles.initialValue}>{props.value}</Text>
        </View>
        <TouchableOpacity
          onPress={increase}
          activeOpacity={1}
          style={styles.increaseButton}
        >
          <Text style={styles.increaseButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default CartIncrementor;

CartIncrementor.defaultProps = {
  value: 1,
  price: null,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
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
    fontSize: 23,
  },
  valueContainer: {
    elevation: 10,

    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",

    width: buttonWidth,
    height: buttonHeight,
    fontFamily: "Medium",
    fontSize: 23,
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
    height: buttonHeight,
    width: buttonWidth,

    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  increaseButtonText: { fontSize: 23, color: "#000", textAlign: "center" },
  buttonView: { marginLeft: "auto", right: 10 },
  buyText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontFamily: "Bold",
  },

  buyButton: {
    backgroundColor: "#f62459",
    borderRadius: 5,
    justifyContent: "center",
    alignSelf: "flex-start",
    elevation: 10,

    height: 50.5,
    width: buyButtonWidth,
  },
});
