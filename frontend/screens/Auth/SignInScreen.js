import React, { useState, useContext, useRef, memo, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
  ActivityIndicator,
  ToastAndroid,
  Dimensions,
  Modal,
  Alert,
} from "react-native";
import auth from "@react-native-firebase/auth";
import OTPModal from "./OTPModal";
import { COLORS } from "../../constants";

const { width, height } = Dimensions.get("window");

const buttonWidth = width * 0.85;
const SignInScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [values, setValues] = useState({
    phoneNumber: "",
  });

  const [confirm, setConfirm] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (text) => {
    setValues({
      ...values,
      phoneNumber: text,
    });
  };
  const hideModal = () => {
    if (isModalVisible) {
      setIsModalVisible(false);
    }
  };
  const showModal = () => {
    if (!isModalVisible) {
      setIsModalVisible(true);
    }
  };

  const verifyUser = async () => {
    let phoneNumber = values.phoneNumber;

    const regex = /^[6-9]\d{9}$/gi;

    if (regex.test(phoneNumber) === true) {
      let IndianPhoneNumber = "+91" + phoneNumber;
      try {
        setIsLoading(true);

        const confirm = await auth().signInWithPhoneNumber(IndianPhoneNumber);
        setConfirm(confirm);
        setIsLoading(false);
        showModal();
      } catch (err) {
        setIsLoading(false);
        ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
      }
    } else {
      setIsLoading(false);

      ToastAndroid.show(
        "Please enter a valid Indian phone number",
        ToastAndroid.SHORT
      );
    }
  };

  return (
    <>
      <View style={styles.container}>
        <StatusBar backgroundColor={COLORS.primary} />

        <View style={styles.header}>
          <Text style={styles.titleStyle}>Foodie</Text>
        </View>

        <View style={styles.footer}>
          <View style={styles.phoneNumberViewStyle}>
            <Image
              source={require("../../assets/images/Flag-India.webp")}
              style={styles.indImg}
            />
            <Text style={styles.countryCodeText}>+91</Text>
            <TextInput
              placeholder="Phone number"
              style={styles.textInput}
              placeholderTextColor="#000"
              value={values.phoneNumber}
              onChangeText={handleInputChange}
              keyboardType="numeric"
            />
          </View>

          <TouchableOpacity style={styles.otpButtonCard} onPress={verifyUser}>
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.text}>Send OTP</Text>
            )}
          </TouchableOpacity>
        </View>
        <OTPModal
          phoneNumber={"+91" + values.phoneNumber}
          isModalVisible={isModalVisible}
          hideModal={hideModal}
          verifyUser={verifyUser}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          confirm={confirm}
        />
      </View>
    </>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  textInput: {
    height: 30,
    position: "absolute",
    width: buttonWidth * 0.7,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    color: "#000",
  },
  header: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingBottom: 35,
  },
  footer: {
    flex: 3,
    backgroundColor: "#f5f5f5",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 60,
    alignItems: "center",
  },
  titleStyle: { fontFamily: "Bold", color: "#fff", fontSize: 25 },
  phoneNumberViewStyle: {
    height: 45,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    elevation: 5,
    width: buttonWidth,
  },
  indImg: {
    position: "absolute",
    left: 10,
    height: 15,
    width: 25,
    borderRadius: 2,
  },
  otpButtonCard: {
    height: 45,
    marginTop: 10,
    marginBottom: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    elevation: 5,
    backgroundColor: "#0C0C0C",
    width: buttonWidth,
  },
  text: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Medium",
    fontSize: 18,
  },
  countryCodeText: {
    position: "absolute",
    left: 40,
    color: "#000",
    fontSize: 16,
  },
});
