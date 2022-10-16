import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SignInScreen from "../../screens/Auth/SignInScreen";
import UserInfoScreen from "../../screens/Auth/UserInfoScreen";

const Root = createStackNavigator();

const RootStack = () => {
  return (
    <Root.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator:
          CardStyleInterpolators.forRevealFromBottomAndroid,
      }}
    >
      <Root.Screen name="SignInScreen" component={SignInScreen} />
      <Root.Screen name="UserInfoScreen" component={UserInfoScreen} />
    </Root.Navigator>
  );
};

export default RootStack;

const styles = StyleSheet.create({});
