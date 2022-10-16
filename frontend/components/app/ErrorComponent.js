import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";

const ErrorComponent = ({ reload }) => {
  return (
    <View style={styles.center}>
      <Text>Something went wrong</Text>
      <Button title="Try Again" onPress={reload} />
    </View>
  );
};

export default ErrorComponent;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
