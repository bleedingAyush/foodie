import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState, useRef } from "react";
import { TextInput } from "react-native-gesture-handler";
import { useEffect } from "react";
import { COLORS } from "../constants";

const OTPinputField = ({ setPinReady, code, maxLength, setCode }) => {
  const textInputRef = useRef(null);
  const codeDigitsArray = new Array(maxLength).fill(0);

  const toCodeDigitInput = (_value, index) => {
    const emptyInputChar = " ";
    const digit = code[index] || emptyInputChar;

    return (
      <View style={styles.OTPInput} key={index}>
        <Text style={styles.OTPInputText}>{digit}</Text>
      </View>
    );
  };

  const handleOnPress = () => {
    if (textInputRef?.current?.isFocused()) textInputRef?.current?.blur();
    textInputRef?.current?.focus();
  };

  return (
    <View style={styles.otpSection}>
      <Pressable style={styles.otpInputContainer} onPress={handleOnPress}>
        {codeDigitsArray.map(toCodeDigitInput)}
      </Pressable>
      <TextInput
        style={styles.textInput}
        value={code}
        onChangeText={setCode}
        maxLength={maxLength}
        keyboardType="number-pad"
        returnKeyType="done"
        textContentType="oneTimeCode"
        ref={textInputRef}
      />
    </View>
  );
};

export default OTPinputField;

const styles = StyleSheet.create({
  textInput: {
    position: "absolute",
    width: 1,
    height: 1,
    opacity: 0,
  },
  otpSection: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
  },
  otpInputContainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  OTPInput: {
    borderColor: COLORS.primary,
    minWidth: "13%",
    borderWidth: 2,
    borderRadius: 4,
    padding: 10,
  },
  OTPInputText: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "rgba(0, 0, 0, 0.7)",
  },
});
