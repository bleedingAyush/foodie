import React, { useEffect } from "react";
import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Icon from "react-native-feather";
import CartScreen from "../../screens/Cart/CartScreen";
import HomeScreen from "../../screens/Home/HomeScreen";
import ProfileScreen from "../../screens/Profile/ProfileScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { COLORS } from "../../constants";

const Tab = createBottomTabNavigator();

const tabOptions = {
  activeTintColor: COLORS.primary,
  inactiveTintColor: "#000",
  showLabel: false,
};
const MainTabScreen = () => {
  return (
    <Tab.Navigator tabBarOptions={tabOptions}>
      <Tab.Screen
        name="MainHome"
        component={MainHomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon.Home color={color} height={28} width={28} />
          ),
        }}
      />
      <Tab.Screen
        name="MainCart"
        component={MainCartScreen}
        options={{
          tabBarIcon: ({ route, color }) => {
            return <Icon.ShoppingCart color={color} width={28} height={28} />;
          },
        }}
      />
      <Tab.Screen
        name="MainProfile"
        component={MainProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon.User color={color} height={28} width={28} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Stack = createStackNavigator();

const MainHomeScreen = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
};

const MainProfileScreen = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

const MainCartScreen = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  );
};

export default MainTabScreen;
