import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";

export const LocationData = (data) => {
  return {
    type: "ADD_LOCATION_DATA",
    payload: data,
  };
};

export const addToken = (data) => {
  return {
    type: "ADD_EXPO_TOKEN",
    payload: data,
  };
};

export const succesNameChange = () => {
  return {
    type: "CHANGE_NAME_SUCCESS",
  };
};

export const failureNameChange = (data) => {
  return {
    type: "CHANGE_NAME_FAILURE",
    payload: data,
  };
};

export const requestNameChange = () => {
  return {
    type: "CHANGE_NAME_REQUEST",
  };
};

export const resetNameChange = () => {
  return {
    type: "CHANGE_NAME_RESET",
  };
};

export const changeName = (changedValue) => {
  const updatedName = changedValue.name;
  const currentUser = auth().currentUser;

  return async function (dispatch) {
    dispatch(requestNameChange());
    currentUser
      .updateProfile({
        displayName: updatedName,
      })
      .then(() => {
        dispatch(succesNameChange());
      })
      .catch((err) => {
        dispatch(failureNameChange(err));
      })
      .finally(() => {
        dispatch(resetNameChange());
      });
  };
};

export const postUserInfo = (userLoc) => {
  return async function (dispatch) {
    if (userLoc.latitude && userLoc.longitude) {
      dispatch(AddLocationData(userLoc));
    } else {
    }
  };
};

export const enableLocation = () => {
  return async function (dispatch) {
    dispatch({ type: "ENABLE_LOCATION_REQUEST" });

    let { status } = await requestForegroundPermissionsAsync();
    if (status !== "granted") {
      dispatch({ type: "ENABLE_LOCATION_FAILURE" });
      return status;
    }
    try {
      let currentLocation = await getCurrentPositionAsync({
        accuracy: 4,
      });

      if (currentLocation) {
        let userLoc = {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        };
        dispatch(postUserInfo(userLoc));
      }
    } catch (err) {
      dispatch({ type: "ENABLE_LOCATION_FAILURE" });
    }
  };
};

export const AddLocationData = (location, token) => {
  return async function (dispatch) {
    const currentUser = auth().currentUser;
    if (currentUser) {
      const userId = currentUser.uid;
      const userName = currentUser.displayName;
      const phoneNumber = currentUser.phoneNumber;
      if (userId && userName && phoneNumber) {
        let updatedObject = {
          location,
          phoneNumber,
          name: userName,
        };
        firestore()
          .collection("users")
          .doc(userId)
          .set(updatedObject, { merge: true })
          .then(() => {
            dispatch(getUserInfo());
            dispatch({ type: "ENABLE_LOCATION_SUCCESS" });
          })
          .catch((err) => {
            dispatch({ type: "ENABLE_LOCATION_FAILURE" });
          });
      }
    }
  };
};

export const getUserInfo = () => {
  return async function (dispatch) {
    dispatch(requestLocationInfo());
    const currentUser = auth().currentUser;
    if (currentUser) {
      const userId = currentUser.uid;
      try {
        const data = await firestore().collection("users").doc(userId).get();
        let location = data.data().location;
        let notificationToken = data.data().notificationToken;
        if (location !== undefined) dispatch(LocationData(location));
        if (expoToken !== undefined) dispatch(addToken(notificationToken));
        dispatch(successLocationInfo());
      } catch (err) {
        dispatch(failureLocationInfo());
      } finally {
        dispatch(resetLocationInfo());
      }
    }
  };
};

export const saveNotificationToken = (token) => {
  return async function (dispatch) {
    const uid = auth().currentUser.uid;
    const userRef = firestore().collection("users").doc(uid);
    userRef
      .update({
        notificationToken: token,
      })
      .then(() => {})
      .catch((err) => {});
  };
};

export const requestLocationInfo = () => {
  return {
    type: "LOCATION_INFO_REQUEST",
  };
};

export const successLocationInfo = () => {
  return {
    type: "LOCATION_INFO_SUCCESS",
  };
};

export const failureLocationInfo = () => {
  return {
    type: "LOCATION_INFO_FAILURE",
  };
};

export const resetLocationInfo = () => {
  return {
    type: "LOCATION_INFO_RESET",
  };
};
