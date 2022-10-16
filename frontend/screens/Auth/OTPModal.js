import React, { useState, useRef, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ToastAndroid,
  StatusBar,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Modal,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import auth from "@react-native-firebase/auth";
import { useEffect } from "react";
import OTPinputField from "../../components/OTPinputField";
import { useFocusEffect } from "@react-navigation/native";

const { height, width } = Dimensions.get("screen");
const OTPModal = ({
  phoneNumber,
  isModalVisible,
  hideModal,
  verifyUser,
  isLoading,
  setIsLoading,
  confirm,
}) => {
  const [verificationCode, setVerificationCode] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      if (verificationCode.length === 6) {
        verifySmscode();
      }
    }, [verificationCode])
  );

  const verifySmscode = async () => {
    setIsLoading(true);
    if (verificationCode.length === 6) {
      try {
        await confirm.confirm(verificationCode);
      } catch (err) {
        setIsLoading(false);
        ToastAndroid.show(
          "Someting went wrong please try again",
          ToastAndroid.SHORT
        );
      }
    } else {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Modal
        animationType="slide"
        visible={isModalVisible}
        transparent={true}
        onRequestClose={hideModal}
      >
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.sendCodeText}>
              Verification Code has been sent to {phoneNumber}
            </Text>
            <Text style={styles.text}>Enter verification code</Text>

            <OTPinputField
              code={verificationCode}
              setCode={setVerificationCode}
              maxLength={6}
            />
          </View>

          <TouchableOpacity style={styles.resendButton} onPress={verifyUser}>
            {isLoading ? (
              <ActivityIndicator color={"#fff"} />
            ) : (
              <Text style={styles.resendButtonText}>Resend</Text>
            )}
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

export default OTPModal;

const styles = StyleSheet.create({
  container: {
    width: width,
    alignItems: "center",
    height: "67%",
    marginTop: "auto",
    backgroundColor: "#f5f5f5",
  },
  sendCodeText: { fontFamily: "Bold", fontSize: 16 },
  content: {
    marginTop: 50,
  },
  title: {
    marginBottom: 2,
    fontSize: 29,
    fontWeight: "bold",
  },
  subtitle: {
    marginBottom: 10,
    opacity: 0.35,
    fontWeight: "bold",
  },
  text: {
    fontFamily: "Medium",
    fontSize: 14,
    marginTop: 30,
    marginBottom: 4,
  },
  textInput: {
    marginBottom: 8,
    fontSize: 17,
    fontWeight: "bold",
  },
  otpStyle: {
    width: "100%",
    height: 70,
  },
  error: {
    marginTop: 10,
    fontWeight: "bold",
    color: "red",
  },
  loader: {
    marginTop: 10,
  },
  resendButton: {
    height: 45,
    backgroundColor: "#262626",
    borderRadius: 5,
    marginTop: 20,
    width: "90%",
    alignSelf: "center",
    justifyContent: "center",
  },
  resendButtonText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Bold",
    fontSize: 18,
  },
  sendButton: {
    backgroundColor: "#e62253",
    color: "#fff",
    height: 45,
    borderRadius: 5,
    elevation: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  sendbuttonText: { color: "#fff", fontFamily: "Bold", fontSize: 20 },
});
