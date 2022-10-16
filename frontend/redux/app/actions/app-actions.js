import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

import { ProductData } from "../../FoodData/actions/product-actions";
import { addRestaurantData } from "../../restaurant/firestoreActions";
import {
  addToken,
  LocationData,
  AddLocationData,
} from "../../user/user-actions";

export const fetchHomeScreenData = () => {
  return async function (dispatch) {
    const currentUser = auth().currentUser;
    if (!currentUser) return;
    dispatch({ type: "HOME_SCREEN_DATA_REQUEST" });

    const products = firestore().collection("products").orderBy("id");
    const restaurant = firestore()
      .collection("restaurant")
      .doc("FjQ8YlhREcSZaGtTbid3");

    const userId = currentUser.uid;
    const userInfo = firestore().collection("users").doc(userId);
    // Promise.all([restaurantDoc.get(), userDoc.get()])
    Promise.all([products.get(), restaurant.get(), userInfo.get()])
      .then((result) => {
        let [foodDocData, restaurantDocData, userDocData] = result;

        // let [restaurantDocData, userDocData] = result;
        let foodDocArr = [];
        foodDocData.forEach((item) => foodDocArr.push(item.data()));

        let resturantData = restaurantDocData.data();
        let location = userDocData.data()?.location;
        let expoToken = userDocData.data()?.expoNotificationToken;

        dispatch(ProductData(foodDocArr));
        dispatch(addRestaurantData(resturantData));

        if (location) dispatch(LocationData(location));
        if (expoToken) dispatch(addToken(expoToken));
        dispatch({ type: "HOME_SCREEN_DATA_SUCCESS" });
      })
      .catch((err) => {
        if (err.code === "firestore/unavailable") {
          dispatch({
            type: "HOME_SCREEN_DATA_FAILURE",
            payload: "networkIssue",
          });
        } else {
          dispatch({ type: "HOME_SCREEN_DATA_FAILURE" });
        }
      });
  };
};
