import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
} from "react-native";
import { COLORS } from "../../../../constants";

import { AddModalId } from "../../../../redux/FoodData/actions/product-actions";
import { useDispatch } from "react-redux";

const { height, width } = Dimensions.get("screen");

const RenderRow = (props) => {
  let item = props.item;
  const dispatch = useDispatch();

  const navigateToProduct = () => {
    dispatch(AddModalId(item.id, true));
  };

  return (
    <>
      <Pressable
        style={styles.card}
        onPress={navigateToProduct}
        disabled={!item.enabled}
      >
        <Image
          resizeMode={"cover"}
          style={styles.image}
          source={{ uri: item.image }}
        />
        <View style={styles.textView}>
          <Text style={styles.itemNameText}>{item.name}</Text>
          <View style={{ marginLeft: "auto" }}>
            <View style={styles.addButton}>
              <Text style={styles.addTextStyle}>ADD +</Text>
            </View>
          </View>
        </View>
      </Pressable>
    </>
  );
};

export default RenderRow;

const styles = StyleSheet.create({
  addButton: {
    right: 10,
    height: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    justifyContent: "center",
    width: width * 0.22,
  },
  addTextStyle: {
    textAlign: "center",
    fontFamily: "Medium",
    color: "#fff",
    fontSize: 16,
  },

  card: {
    backgroundColor: "#fafafa",
    elevation: 8,
    marginTop: 10,
    left: 8,

    height: height * 0.32,
    width: width * 0.85,

    borderRadius: 10,
  },
  image: {
    height: height * 0.25,
    width: width * 0.85,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  textView: {
    marginTop: "auto",
    padding: 5,

    paddingBottom: 10,
    flexDirection: "row",
  },
  itemNameText: { fontFamily: "Bold", fontSize: 20 },
});
