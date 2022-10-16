import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { ArrowLeft } from "react-native-feather";

const { width, height } = Dimensions.get("window");
const SettingsScreen = ({ navigation }) => {
  const goBack = () => {
    navigation.goBack();
  };
  const goToEditProfileScreen = () => {
    navigation.navigate("EditProfileScreen");
  };

  return (
    <>
      <View style={styles.container}>
        <ArrowLeft
          color="#000"
          height={25}
          width={25}
          style={styles.backArrow}
          onPress={goBack}
        />

        <Text style={styles.titleText}>Settings</Text>
        <View style={styles.contentView}>
          <TouchableOpacity style={styles.card} onPress={goToEditProfileScreen}>
            <Text style={styles.alignLeft}>Edit profile</Text>
            <Text style={[styles.alignLeft, styles.reduceOpacity]}>
              Change your name email and location
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backArrow: {
    left: 10,
    top: 5,
  },
  titleText: {
    fontFamily: "Regular",
    fontSize: 23,
    position: "absolute",
    top: 50,
    left: 10,
    marginBottom: 20,
  },
  reduceOpacity: { opacity: 0.7 },
  contentView: { position: "absolute", top: 100, left: 10 },
  alignLeft: { left: 10 },
  card: {
    justifyContent: "center",

    alignSelf: "center",
    height: height * 0.07,
    width: width * 0.95,
    marginTop: 10,
    borderTopColor: "#ededed",
    borderWidth: 1,
    borderRightColor: "transparent",
    borderLeftColor: "transparent",
    borderBottomColor: "#ededed",

    backgroundColor: "#fff",
  },
  secondCard: {
    justifyContent: "center",

    alignSelf: "center",
    height: height * 0.07,
    width: width * 0.95,
    borderTopColor: "transparent",
    borderWidth: 1,
    borderRightColor: "transparent",
    borderLeftColor: "transparent",
    borderBottomColor: "#ededed",
    backgroundColor: "#fff",
  },
});
