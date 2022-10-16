import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export const showOrders = (data) => {
  return {
    type: "SHOW_ORDERS_ITEMS",
    payload: data,
  };
};

export const modifyOrder = (data) => {
  return {
    type: "MODIFY_ORDER_ITEM",
    payload: data,
  };
};

export const addOrder = (data) => {
  return {
    type: "ADD_ORDER_ITEM",
    payload: data,
  };
};

export const requestOrders = () => {
  return {
    type: "ORDERS_REQUEST",
  };
};

export const succesOrders = () => {
  return {
    type: "ORDERS_SUCCESS",
  };
};

export const failureOrders = (data) => {
  return {
    type: "ORDERS_FAILURE",
    payload: data,
  };
};

export const resetOrders = () => {
  return {
    type: "ORDERS_RESET",
  };
};

export const showOrderItems = () => {
  return async function (dispatch) {
    dispatch(requestOrders());
    const userId = auth().currentUser.uid;
    await firestore()
      .collection("users")
      .doc(userId)
      .collection("orders")
      .orderBy("created_at", "desc")
      .get()
      .then((snap) => {
        let arr = [];
        snap.docs.forEach((data) => {
          let orderArr = data.data();
          arr = [...arr, orderArr];
        });

        dispatch(showOrders(arr));
        dispatch(succesOrders());
      })
      .catch((err) => {
        dispatch(failureOrders());
      })
      .finally(() => {
        dispatch(resetOrders());
      });
  };
};
