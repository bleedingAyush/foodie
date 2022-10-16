import firestore from "@react-native-firebase/firestore";
const collection = firestore().collection("restaurant");

export const fetchRestrauntData = () => {
  return async function (dispatch) {
    dispatch(requestResurantData());
    collection
      .doc("FjQ8YlhREcSZaGtTbid3")
      .get()
      .then((snapshot) => {
        let data = snapshot.data();
        if (typeof data.deliveryCharge === "number")
          if (typeof data.restaurantEnabled === "boolean")
            dispatch(addRestaurantData(data));
        dispatch(successResturantData());
      })
      .catch((err) => {
        dispatch(failureResturantData());
      })
      .finally(() => {
        dispatch(resetResturantData());
      });
  };
};

export const addRestaurantData = (data) => {
  return {
    type: "ADD_RESTURANT_DATA",
    payload: data,
  };
};

export const requestResurantData = () => {
  return {
    type: "RESTURANT_DATA_REQUEST",
  };
};

export const successResturantData = () => {
  return {
    type: "RESTURANT_DATA_SUCCESS",
  };
};

export const failureResturantData = () => {
  return {
    type: "RESTURANT_DATA_FAILURE",
  };
};

export const resetResturantData = () => {
  return {
    type: "RESTURANT_DATA_RESET",
  };
};
