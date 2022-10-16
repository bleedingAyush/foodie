import React, { useRef, memo, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";

const { width, height } = Dimensions.get("window");
const ProductDescription = ({ data }) => {
  const descriptionLength = data.description?.length;
  const [textLines, setTextLines] = useState(descriptionLength <= 93 ? 1 : 2);
  const showText = descriptionLength && textLines == 2 ? true : false;

  return (
    <>
      {data.image && (
        <View style={styles.container}>
          <Image style={styles.image} source={{ uri: data.image }} />
        </View>
      )}

      <View style={styles.textView}>
        <Text style={styles.title}>{data.name}</Text>
        <Text style={styles.descriptionText} numberOfLines={textLines}>
          {data.description}
        </Text>
        {showText && (
          <TouchableOpacity
            style={{ width: 100 }}
            onPress={() => {
              setTextLines(4);
            }}
          >
            <Text style={{ color: "#f24569" }}>Read More</Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

export default ProductDescription;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height / 2.7,
    borderTopLeftRadius: 10,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  backArrow: {
    position: "absolute",
    top: 30,
    backgroundColor: "#fff",
    opacity: 0.7,
    left: 10,
    borderRadius: 60,
  },
  descriptionText: {
    fontFamily: "Medium",
    fontSize: 15,
    marginTop: 5,
    opacity: 0.6,
  },
  title: { fontFamily: "Medium", fontSize: 25 },
  textView: { padding: 10, paddingBottom: 0 },
});
