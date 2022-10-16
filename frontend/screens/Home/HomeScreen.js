import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Button,
  Pressable,
  Modal,
  StyleSheet,
  Alert,
  StatusBar,
  ToastAndroid,
} from "react-native";
import { ShoppingBag } from "react-native-feather";
import { useStore, useDispatch, useSelector } from "react-redux";
import LottieView from "lottie-react-native";
import RecyclerList from "./components/RecyclerList";
import { useIsMounted } from "../../hooks/useIsMounted";
import { productDataItems } from "../../redux/FoodData/ProductSelector";
import HomeModalScreen from "./components/ProductModal";
import { fetchHomeScreenData } from "../../redux/app/actions/app-actions";
import ErrorComponent from "../../components/app/ErrorComponent";
import useRealtimeProductUpdate from "./hooks/useRealtimeProductUpdate";
import useLocation from "./hooks/useLocation";
import messaging from "@react-native-firebase/messaging";
import { saveNotificationToken } from "../../redux/user/user-actions";
import { useFocusEffect } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const top = height * 0.05;

const HomeScreen = ({ navigation }) => {
  const data = useSelector(productDataItems);
  const dispatch = useDispatch();
  const isMounted = useIsMounted();
  const productData = data.products;
  const isRestaurantClosed = data.restaurant?.restaurantEnabled == false;
  const loading = data.loading;

  const loadingFailure = loading.FAILURE.id;
  const loadingRequest = loading.REQUEST.id;
  const loadingSuccess = loading.SUCCESS.id;
  const failureMessage = loading.FAILURE.message;
  const isHomeScreenDataRequest = loadingRequest.includes(
    "HOME_SCREEN_DATA_REQUEST"
  );
  const isHomeScreenDataFailure = loadingFailure.includes(
    "HOME_SCREEN_DATA_FAILURE"
  );

  useFocusEffect(
    React.useCallback(() => {
      if (isHomeScreenDataRequest) {
      }

      if (isHomeScreenDataFailure) {
        if (failureMessage.includes("networkIssue")) {
          ToastAndroid.show("Something went wrong");
        }
      }
    }, [isHomeScreenDataRequest, isHomeScreenDataFailure])
  );

  useRealtimeProductUpdate();
  useLocation(loadingSuccess);

  const [modalVisible, setModalVisible] = useState(false);

  const [final_data, setFinalData] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      if (productData !== undefined && productData.length !== 0) {
        setFinalData(productData);
      }
    }, [JSON.stringify(productData)])
  );

  const fetchHomeScreenDataFunc = () => {
    dispatch(fetchHomeScreenData());
  };

  useEffect(() => {
    fetchHomeScreenDataFunc();
  }, []);

  const goToOrders = () => {
    navigation.navigate("OrderScreen");
  };

  async function onAppBootstrap() {
    await messaging().registerDeviceForRemoteMessages();

    // Get the token
    const token = await messaging().getToken();

    dispatch(saveNotificationToken(token));
  }
  useEffect(() => {
    if (isMounted.current) onAppBootstrap();
  }, []);

  if (isHomeScreenDataFailure) {
    return <ErrorComponent reload={fetchHomeScreenDataFunc} />;
  }

  if (isHomeScreenDataRequest && final_data.length == 0) {
    return (
      <View style={styles.lottieView}>
        <LottieView
          source={require("../../assets/LottieAnimations/loading.json")}
          autoPlay
          loop
          style={styles.lottie}
        />
      </View>
    );
  }

  if (isRestaurantClosed) {
    return (
      <View style={styles.lottieView}>
        <Text>The restaurant is closed</Text>
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <StatusBar backgroundColor="#f5f5f5" barStyle="dark-content" />
        <Text style={styles.titleText}>Foodie</Text>
        <TouchableOpacity style={styles.bell} onPress={goToOrders}>
          <ShoppingBag color="#000" width={25} height={25} />
        </TouchableOpacity>
      </View>

      {final_data.length !== 0 && (
        <RecyclerList data={final_data} navigation={navigation} />
      )}

      <HomeModalScreen />
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  lottieView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lottie: {
    width: 100,
    height: 100,
  },
  container: {
    flexDirection: "row",
  },
  titleText: {
    alignItems: "flex-start",

    marginTop: top,
    marginLeft: width * 0.08,

    fontFamily: "Bold",
    fontSize: 20,
  },
  modalSubtitleText: {
    textAlign: "center",
    fontFamily: "Regular",
    opacity: 0.5,
    marginBottom: 5,
  },
  bell: {
    position: "absolute",
    right: 25,
    marginTop: top,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    marginTop: 17,
    width: width,
  },
  modalView: {
    margin: 60,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",

    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 3,
    textAlign: "center",
    fontFamily: "Medium",
  },
});
