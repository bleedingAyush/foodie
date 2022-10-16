import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  ActivityIndicator,
  Dimensions,
  View,
  TextInput,
  Button,
  Modal,
  Pressable,
  ToastAndroid,
} from "react-native";
import { ArrowLeft, Navigation, X } from "react-native-feather";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { COLORS } from "../../constants";
import auth from "@react-native-firebase/auth";
import OTPModal from "./components/OTPModal";
import { changeName } from "../../redux/user/user-actions";
import LottieView from "lottie-react-native";
import { useFocusEffect } from "@react-navigation/native";

const { height, width } = Dimensions.get("screen");

const EditProfileScreen = ({ navigation }) => {
  const loadingSelector = useSelector((state) => state.loadingReducer);
  const isChangeNameRequest = loadingSelector?.REQUEST?.id?.includes(
    "CHANGE_NAME_REQUEST"
  );
  const isChangeNameSuccess = loadingSelector?.SUCCESS.id?.includes(
    "CHANGE_NAME_SUCCESS"
  );
  const isChangeNameFailure = loadingSelector?.FAILURE.id?.includes(
    "CHANGE_NAME_FAILURE"
  );

  const user = auth().currentUser;
  const name = user.displayName;
  const email = user.email;
  const phoneNumber = user.phoneNumber;

  const [values, setValues] = useState({
    name,
    email,
    phoneNumber,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [verificationId, setVerificationId] = useState(null);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      if (isChangeNameRequest) {
        setIsLoading(true);
      }
      if (isChangeNameSuccess) {
        setIsLoading(false);
        ToastAndroid.show("Name Changed Successfully", ToastAndroid.SHORT);
      }
      if (isChangeNameFailure) {
        setIsLoading(false);
        ToastAndroid.show("Name Change Failed", ToastAndroid.LONG);
      }
    }, [isChangeNameRequest])
  );

  const handleInputChange = (data, value) => {
    if (value === "email") {
      setValues({
        ...values,
        email: data,
      });
    } else if (value === "name") {
      setValues({
        ...values,
        name: data,
      });
    } else if (value === "phone") {
      setValues({
        ...values,
        phoneNumber: data,
      });
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  const reauthenticateUser = async () => {
    try {
      const verificationId = (await auth().verifyPhoneNumber(phoneNumber))
        .verificationId;
      setVerificationId(verificationId);
    } catch (err) {
      setIsLoading(false);
    }
  };

  const confirmCode = async (otp) => {
    if (otp !== null) {
      try {
        const credential = auth.PhoneAuthProvider.credential(
          verificationId,
          otp
        );
        await user.reauthenticateWithCredential(credential);
        saveChanges();
      } catch (error) {
        setIsLoading(false);
      }
    }
  };

  const saveChanges = () => {
    if (values.email !== email) {
      setIsLoading(true);
      user
        .updateEmail(values.email)
        .then(() => {
          hideModal();
          setIsLoading(false);
          ToastAndroid.show("Email Changed Successfully", ToastAndroid.SHORT);
        })
        .catch((err) => {
          if (err.code === "auth/invalid-email") {
            ToastAndroid.show("Please enter a valid email", ToastAndroid.SHORT);
          }
          if (err.code == "auth/requires-recent-login") {
            reauthenticateUser()
              .then(() => {
                setIsLoading(false);
                showModal();
              })
              .catch((err) => {
                setIsLoading(false);
                // console.log(err);
              });
          }
        });
    }
  };

  const hideModal = () => {
    if (modalVisible) setModalVisible(false);
  };

  const showModal = () => {
    if (!modalVisible) setModalVisible(true);
  };

  const handleChange = () => {
    if (values.name != name && values.email !== email) {
      saveChanges();
    } else if (values.name !== name) {
      dispatch(changeName(values));
    } else if (values.email !== email) {
      saveChanges();
    }
  };

  const LoadingComponent = () => (
    <View
      style={{
        height: height,
        width: width,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LottieView
        source={require("../../assets/LottieAnimations/loading.json")}
        autoPlay
        loop
        style={styles.lottie}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {isLoading ? <LoadingComponent /> : null}
      <ArrowLeft
        color="#000"
        height={25}
        width={25}
        style={styles.backArrowStyle}
        onPress={goBack}
      />
      <Text></Text>
      <Text style={styles.titleText}>Edit Profile</Text>
      <View style={styles.textInputView}>
        <TextInput
          value={values.name}
          placeholder="Name"
          onChangeText={(e) => handleInputChange(e, "name")}
          style={styles.nameTextInput}
        />
        <TextInput
          value={values.email}
          placeholder="Email"
          autoCapitalize={"none"}
          onChangeText={(e) => handleInputChange(e, "email")}
          style={styles.emailTextInput}
        />
      </View>
      <Pressable
        android_ripple={{ color: "#c93a5f" }}
        onPress={handleChange}
        style={styles.saveChangesPressable}
      >
        <Text style={styles.saveChangesText}>Save Changes</Text>
      </Pressable>

      <OTPModal
        confirmCode={confirmCode}
        hideModal={hideModal}
        modalVisible={modalVisible}
        sendCode={reauthenticateUser}
      />
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lottie: {
    width: 100,
    height: 100,
  },
  titleText: {
    fontFamily: "Regular",
    fontSize: 23,
    position: "absolute",
    left: 10,
    top: 50,
  },
  titlefont: { fontFamily: "Bold", paddingLeft: 14 },
  nameTextInput: {
    borderWidth: 1,
    borderTopColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    fontFamily: "Medium",
    fontSize: 16,
    borderBottomColor: "#cccccc",
  },
  phoneNumberText: {
    fontFamily: "Regular",
    fontSize: 15,
    marginTop: 10,
    opacity: 0.7,
  },
  textInputView: { position: "absolute", top: 100, right: 15, left: 15 },
  saveChangesPressable: {
    marginTop: "auto",
    bottom: 10,

    backgroundColor: COLORS.primary,
    width: width * 0.95,
    height: height * 0.07,
    borderRadius: 5,
    left: 10,
    justifyContent: "center",
    right: 10,
  },
  saveChangesText: {
    fontFamily: "Regular",
    fontSize: 19,
    textAlign: "center",
    color: "#fff",
  },

  valuePhoneNumberText: { fontFamily: "Medium", fontSize: 16 },
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
  backArrowStyle: {
    left: 10,
    top: 5,
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
  codeInputFieldStyle: { color: "#000", justifyContent: "space-evenly" },
  backArrowView: {
    borderBottomColor: "#cccccc",
    borderWidth: 1,
    borderTopColor: "transparent",
    borderRightColor: "transparent",
    borderLeftColor: "transparent",
    height: 25,
    alignItems: "flex-end",
    paddingRight: 10,
  },
  emailTextInput: {
    borderWidth: 1,
    borderTopColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    fontFamily: "Medium",
    marginTop: 20,
    fontSize: 16,
    borderBottomColor: "#cccccc",
  },
  numberView: {
    width: "100%",
    height: "55%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderTopColor: "transparent",
    borderRightColor: "transparent",
    borderLeftColor: "transparent",
    borderBottomColor: "#cccccc",
  },
  changeText: {
    fontFamily: "Regular",
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#000",
  },
  otpBoxesContainer: {
    flexDirection: "row",
  },
  otpBox: {
    padding: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#000",
    height: 45,
    width: 45,
    textAlign: "center",
  },

  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  modalView: {
    height: "43%",
    marginTop: "auto",
    backgroundColor: "#fff",
    elevation: 5,
  },
});
