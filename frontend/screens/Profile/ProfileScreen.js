import React, { useContext, memo, useRef, useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import { AuthContext } from "../../components/context";
import * as FeatherIcons from "react-native-feather";
import auth from "@react-native-firebase/auth";
import { useIsMounted } from "../../hooks/useIsMounted";
import FocusAwareStatusBar from "../../hooks/FocusAwareStatusBar";
import { useSelector } from "react-redux";
import { COLORS } from "../../constants";
import { useFocusEffect } from "@react-navigation/native";
const { height, width } = Dimensions.get("window");

const itemWidth = width * 0.4;
const ProfileScreen = ({ navigation }) => {
  const { signOut } = useContext(AuthContext);

  const restaurantState = useSelector((state) => state.ResturantReducer);
  const image = restaurantState.image;

  const [info, setInfo] = useState({
    name: "",
  });

  const user = auth().currentUser;

  const handleInfoChange = (name) => {
    setInfo({
      ...info,
      name,
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      if (user !== null) {
        if (user.displayName !== null && user.email !== null) {
          handleInfoChange(user.displayName);
        }
      }
      return () => {
        if (auth().currentUser) auth().currentUser.reload();
      };
    }, [user?.displayName])
  );

  function navtoOrders() {
    navigation.navigate("OrderScreen");
  }

  function navtoSettings() {
    navigation.navigate("SettingsScreen");
  }
  const logOutOfTheApp = async () => {
    signOut();
  };

  return (
    <>
      <View style={styles.container}>
        <FocusAwareStatusBar backgroundColor={COLORS.primary} />
        <View style={styles.header} />
        <View style={styles.footer}>
          <View style={styles.imageViewStyle}>
            <Image
              style={styles.imgStyle}
              source={{
                uri: image,
              }}
            />
          </View>
          <Text style={styles.name}>{info.name}</Text>
          <Text style={styles.email}>{info.email}</Text>
          <View style={styles.iconsView}>
            <TouchableOpacity style={styles.iconsCard} onPress={navtoOrders}>
              <FeatherIcons.ShoppingBag
                style={styles.iconsStyle}
                color="#000"
                width={20}
                height={20}
              />

              <Text style={styles.iconsText}>Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconsCard} onPress={navtoSettings}>
              <FeatherIcons.Settings
                style={styles.iconsStyle}
                color="#000"
                width={20}
                height={20}
              />

              <Text style={styles.iconsText}>Settings</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.signOutView}>
            <TouchableOpacity
              onPress={logOutOfTheApp}
              style={styles.signOutCard}
            >
              <Text style={styles.SignOutButtonText}>Sign Out</Text>
              <FeatherIcons.LogOut
                style={styles.iconLogout}
                width={21}
                height={21}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  SignOutButtonText: { fontFamily: "Bold", fontSize: 17, color: "#fff" },
  name: {
    fontFamily: "Bold",
    fontSize: 20,
    textAlign: "center",
  },
  container: {
    flex: 1,

    backgroundColor: COLORS.primary,
  },
  header: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingBottom: 35,
  },
  footer: {
    flex: 4,
    backgroundColor: "#f5f5f5",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 60,
  },
  imageViewStyle: {
    position: "absolute",
    alignSelf: "center",
    top: "-10%",
    borderRadius: 50,
    elevation: 5,

    height: width * 0.25,
    width: width * 0.25,
  },
  imgStyle: {
    flex: 1,
    width: undefined,
    height: undefined,

    borderRadius: 50,
  },
  iconsView: {
    alignItems: "flex-start",
    paddingLeft: width * 0.09,
    paddingTop: height * 0.05,
  },
  iconsStyle: { position: "absolute", left: 5 },
  iconsText: {
    fontFamily: "Medium",
    fontSize: 18,
    color: "#000",
    position: "absolute",
    left: 60,
    textAlign: "center",
  },
  iconsCard: {
    height: 35,
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center",
    width: itemWidth,
  },
  signOutCard: {
    flexDirection: "row",
    backgroundColor: COLORS.primary,
    height: 35,
    width: width * 0.35,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  signOutView: {
    alignSelf: "center",
    position: "absolute",
    bottom: "15%",
  },
  iconLogout: { marginLeft: 5 },
});
