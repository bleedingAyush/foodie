import React, { useEffect, useMemo, useReducer } from "react";
import { View } from "react-native";
import AppStack from "./navigation/AppStack";
import RootStack from "./navigation/RootStack";
import { AuthContext } from "./context";
import LottieView from "lottie-react-native";
import { StyleSheet } from "react-native";
import auth from "@react-native-firebase/auth";
import { useDispatch } from "react-redux";
import * as RootNavigation from "../components/RootNavigation";

const resetReduxState = () => {
  return {
    type: "USER_LOGOUT",
  };
};
const AuthStack = (props) => {
  const initialLoginState = {
    isLoading: true,
    user: null,
  };
  const reduxDispatch = useDispatch();

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "SIGNIN":
        return {
          ...prevState,
          user: action.user,
          isLoading: false,
        };
      case "SIGNOUT":
        return {
          ...prevState,
          user: null,
          isLoading: false,
        };
    }
  };

  const [authState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(
    () => ({
      signIn: async (user) => {
        dispatch({ type: "SIGNIN", user: user });
      },
      signOut: async () => {
        try {
          await auth().signOut();
          reduxDispatch(resetReduxState());
        } catch (e) {}
        dispatch({ type: "SIGNOUT" });
      },
    }),
    []
  );

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        if (user.email == null && user.displayName == null) {
          RootNavigation.navigate("UserInfoScreen");
        } else {
          authContext.signIn(user.uid);
        }
      } else {
        authContext.signOut();
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  if (authState.isLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#f5f5f5",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LottieView
          source={require("../assets/LottieAnimations/loading.json")}
          autoPlay
          loop
          style={styles.lottie}
        />
      </View>
    );
  }

  return (
    <>
      <AuthContext.Provider value={authContext}>
        {authState.user !== null ? <AppStack /> : <RootStack />}
      </AuthContext.Provider>
    </>
  );
};

export default AuthStack;

const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100,
  },
});
