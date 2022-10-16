import React from "react";
import { useState, useEffect } from "react";
import {
  Text,
  View,
  Modal,
  Pressable,
  StyleSheet,
  Dimensions,
} from "react-native";
import { X } from "react-native-feather";
import OTPinputField from "../../../components/OTPinputField";

const { height, width } = Dimensions.get("screen");

const OTPModal = ({ confirmCode, hideModal, modalVisible, sendCode }) => {
  const [code, setCode] = useState("");
  useEffect(() => {
    if (code.length === 6) {
      confirmCode(code);
    }
  }, [code]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={hideModal}
    >
      <View style={styles.modalView}>
        <View style={styles.backArrowView}>
          <X
            color="#000"
            height={22}
            width={22}
            onPress={hideModal}
            strokeWidth={2.5}
          />
        </View>
        <Text style={styles.titlefont}>Enter otp sent to your number</Text>

        <OTPinputField code={code} maxLength={6} setCode={setCode} />
        <Pressable
          android_ripple={{ color: "#3b3b3b" }}
          onPress={sendCode}
          style={styles.PressableStyle}
        >
          <Text style={styles.resendText}>Resend</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

export default OTPModal;

const styles = StyleSheet.create({
  titlefont: { fontFamily: "Bold", paddingLeft: 14 }, //

  PressableStyle: {
    position: "absolute",
    bottom: 0,
    width: width * 0.9,
    height: 50,
    left: 15,
    borderRadius: 5,
    right: 15,
    backgroundColor: "#030303",
    justifyContent: "center",
  },
  otpStyle: {
    width: "100%",
    height: 70,
    paddingLeft: 15,
    paddingRight: 15,
  },
  resendText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
    fontFamily: "Medium",
  },
  codeInputFieldStyle: { color: "#000", justifyContent: "space-evenly" }, //

  backArrowView: {
    //
    borderBottomColor: "#cccccc",
    borderWidth: 1,
    borderTopColor: "transparent",
    borderRightColor: "transparent",
    borderLeftColor: "transparent",
    height: 25,
    alignItems: "flex-end",
    paddingRight: 10,
  },

  modalView: {
    height: "43%",
    marginTop: "auto",
    backgroundColor: "#fff",

    elevation: 5,
  },
});
