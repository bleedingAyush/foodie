import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Dimensions,
} from "react-native";
import RoundedCheckbox from "./RoundedCheckbox";
import { COLORS } from "../../../constants";

const { width } = Dimensions.get("screen");

const SubCategories = ({
  details,
  price,
  status,
  onPress,
  SubCategoryStyle,
  checkbox,
}) => {
  return (
    <View style={(styles.container, { ...SubCategoryStyle })}>
      <View style={{ flexDirection: "row" }}>
        <Pressable style={{ width: width * 0.85 }} onPress={onPress}>
          <Text
            style={{
              fontSize: 15,
              fontFamily: "Medium",
              color: status === "checked" ? "#000" : "#5c5c5c",
            }}
          >
            {details}
          </Text>
        </Pressable>
        <RoundedCheckbox
          status={status}
          onPress={onPress}
          checkedColor={COLORS.primary}
          checkbox={checkbox}
        />
      </View>
    </View>
  );
};

export default SubCategories;

const styles = StyleSheet.create({
  container: { paddingLeft: 10 },
});
