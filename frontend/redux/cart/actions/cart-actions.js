import { cart } from "./cart-types";
import auth from "@react-native-firebase/auth";
import { firebase } from "@react-native-firebase/app-check";

export const showCartItems = (data) => {
  return {
    type: cart.ADD_CART_ITEMS,
    payload: data,
  };
};

export const decreaseItems = (data) => {
  return {
    type: cart.DECREASE_CART_ITEMS,
    payload: data,
  };
};

export const removeItems = (data) => {
  return {
    type: cart.REMOVE_CART_ITEMS,
    payload: data,
  };
};

export const resetCart = () => {
  return {
    type: cart.RESET_CART,
  };
};

export const ApiSuccess = (data) => {
  return {
    type: "POST_ORDER_SUCCESS",
    payload: data,
  };
};

export const ApiRequest = (data) => {
  return {
    type: "POST_ORDER_REQUEST",
  };
};

export const ApiFailure = (data) => {
  return {
    type: "POST_ORDER_FAILURE",
    payload: data,
  };
};

export const ApiReset = (data) => {
  return {
    type: "POST_ORDER_RESET",
  };
};

const getAppCheckToken = async (forceRefresh) => {
  try {
    return await firebase.appCheck().getToken(forceRefresh);
  } catch (err) {
    // Handle any errors if the token was not retrieved.
    return;
  }
};

const getIdToken = async (forceRefresh) => {
  try {
    return await auth().currentUser.getIdToken(forceRefresh);
  } catch {
    return null;
  }
};

export const postOrder = (cartData, deliveryCharge) => {
  return async function (dispatch) {
    dispatch(ApiRequest());
    const appCheckTokenResponse = await getAppCheckToken(false);
    const userToken = await getIdToken(false);

    var requestOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "X-Firebase-AppCheck": appCheckTokenResponse,
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        cartData,
        deliveryCharge,
      }),
    };
    fetch("https://foodie.messagely.tech/order", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((result) => {
        dispatch(ApiSuccess());
      })
      .catch((error) => {
        dispatch(ApiFailure());
      });
  };
};
