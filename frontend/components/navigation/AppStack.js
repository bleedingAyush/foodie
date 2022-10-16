import React from "react";
import MainTabScreen from "./MainTabScreen";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import OrderScreen from "../../screens/orders/OrderScreen";
import SettingsScreen from "../../screens/Profile/SettingsScreen";
import EditProfileScreen from "../../screens/Profile/EditProfileScreen";

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen name="MainTabScreen" component={MainTabScreen} />
      <Stack.Screen name="OrderScreen" component={OrderScreen} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
