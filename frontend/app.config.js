import "dotenv/config";

export default {
  expo: {
    name: "foodie",
    slug: "bj-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF",
      },
      package: "com.yourcompany.yourappname",
      googleServicesFile: "./google-services.json",
      useNextNotificationsApi: true,
      softwareKeyboardLayoutMode: "pan",
    },
    plugins: [
      "@react-native-firebase/app",
      "@react-native-firebase/perf",
      "@notifee/react-native",
      ["expo-community-flipper", "0.123.0"],
    ],
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      eas: {
        projectId: "fdf04bf7-3c02-4667-bb53-a14596009f5e",
      },
    },
  },
};
