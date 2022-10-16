import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./components/AuthStack";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { navigationRef, isReadyRef } from "./components/RootNavigation";

const AppWrapper = () => {
  React.useEffect(() => {
    return () => {
      isReadyRef.current = false;
    };
  }, []);
  return (
    <Provider store={store}>
      <BottomSheetModalProvider>
        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            isReadyRef.current = true;
          }}
        >
          <AuthStack />
        </NavigationContainer>
      </BottomSheetModalProvider>
    </Provider>
  );
};

export default AppWrapper;
