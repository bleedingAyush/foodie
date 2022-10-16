import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import AppWrapper from "./AppWrapper";
import notifee, { EventType } from "@notifee/react-native";
import messaging from "@react-native-firebase/messaging";
import { getItemAsync, setItemAsync } from "expo-secure-store";
import { firebase } from "@react-native-firebase/app-check";
import { Alert, ToastAndroid } from "react-native";

firebase.appCheck().activate("ignored_param", false);

// remeber to add react-native-webview, why did you re render, redux devtools extension
// eas build --profile development --platform android
// eas build --profile production --platform android

notifee.onBackgroundEvent(async ({ type, detail }) => {
  const { notification, pressAction } = detail;
  // Check if the user pressed the "Mark as read" action
  if (type === EventType.ACTION_PRESS && pressAction.id === "mark-as-read") {
    // Remove the notification
    await notifee.cancelNotification(notification.id);
  }
});

async function onMessageReceived(message) {
  notifee.displayNotification(JSON.parse(message.data.notifee));
}

messaging().onMessage(onMessageReceived);
messaging().setBackgroundMessageHandler(onMessageReceived);

export default function App() {
  async function checkIfAppisFirstinstalled() {
    const result = await getItemAsync("isFirstInstalled");
    if (result == null) {
      await notifee.requestPermission();
      await notifee.createChannels([
        {
          id: "orders",
          name: "Orders",
          vibration: false,
          sound: "default",
        },
        {
          id: "default",
          name: "default",
          vibration: false,
          sound: "default",
        },
      ]);
      setItemAsync("isFirstInstalled", "false");
    }
  }

  useEffect(() => {
    checkIfAppisFirstinstalled();
  }, []);

  useEffect(() => {
    return notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.DISMISSED:
          break;
        case EventType.PRESS:
          break;
      }
    });
  }, []);

  let [fontsLoaded] = useFonts({
    Medium: require("./assets/Fonts/Roboto-Medium.ttf"),
    Bold: require("./assets/Fonts/Roboto-Bold.ttf"),
    Regular: require("./assets/Fonts/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return <AppWrapper />;
}
