import React, { useContext, useState } from "react";

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ToastAndroid,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useDispatch } from "react-redux";
import { AuthContext } from "../../components/context";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { COLORS } from "../../constants";

const { width } = Dimensions.get("screen");

const lineWidth = width * 0.9;
const marginTop = width * 0.1;
const UserInfoScreen = () => {
  const { signIn } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
  });

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
    }
  };

  const loginUser = () => {
    const user = auth().currentUser;
    signIn(user.uid);
  };

  const submitData = () => {
    setIsLoading(true);
    const user = auth().currentUser;

    let email = values.email.trim();
    let name = values.name.trim();
    user
      .updateEmail(email)
      .then((res) => {
        user
          .updateProfile({
            displayName: name,
          })
          .then(() => {
            loginUser();
          })
          .catch((err) => {
            setIsLoading(false);
            ToastAndroid.show(
              "Something Went wrong",
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
            );
          });
      })
      .catch((err) => {
        setIsLoading(false);
        const message = err.message;
        if (err.message === "The email address is badly formatted.") {
          ToastAndroid.show(message, ToastAndroid.SHORT);
        } else {
          ToastAndroid.show(
            "Something Went wrong",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
        }
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"dark-content"} backgroundColor={"#f5f5f5"} />
      <View style={styles.inputView}>
        <TextInput
          placeholder="Name"
          value={values.name}
          style={styles.nameTextInput}
          onChangeText={(val) => handleInputChange(val, "name")}
        />
        <View style={styles.line} />
        <TextInput
          style={styles.emailTextInput}
          placeholder="Email"
          autoCapitalize={"none"}
          value={values.email}
          onChangeText={(val) => handleInputChange(val, "email")}
        />
        <View style={styles.line} />
      </View>
      <TouchableOpacity
        style={styles.submitButton}
        disabled={!(values.name && values.email)}
        onPress={submitData}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.submitButtonText}>Submit</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default UserInfoScreen;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center" },
  line: {
    borderBottomColor: COLORS.primary,
    borderBottomWidth: 1.5,
    width: lineWidth,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    height: 45,
    borderRadius: 5,
    justifyContent: "center",

    marginTop: marginTop,
    width: lineWidth,
  },
  inputView: { padding: 20, marginTop: width * 0.2 },
  submitButtonText: {
    textAlign: "center",
    fontFamily: "Bold",
    fontSize: 20,
    color: "#fff",
  },
  nameTextInput: { fontFamily: "Medium", fontSize: 20 },
  emailTextInput: { fontFamily: "Medium", fontSize: 20, marginTop: marginTop },
});
