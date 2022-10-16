import React, { useEffect } from "react";

import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { useDispatch } from "react-redux";
import {
  addOrder,
  modifyOrder,
  showOrders,
} from "../../../redux/orders/order-actions";

const useRealtimeOrders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    let firstLoad = true;
    const userId = auth().currentUser.uid;
    const subscribe = firestore()
      .collection("users")
      .doc(userId)
      .collection("orders")
      .orderBy("created_at", "desc")
      .onSnapshot(
        (snap) => {
          if (firstLoad) {
            firstLoad = false;
          } else {
            snap.docChanges().map((change) => {
              const data = change.doc.data();
              if (change.type == "modified") {
                // console.log({ type: "modified", data: change.doc.data() });
                dispatch(modifyOrder(data));
              }
              if (change.type == "added") {
                // console.log({ type: "added", data: change.doc.data() });
                dispatch(addOrder(data));
              }
            });
          }
        },
        (err) => {
          // console.log(err);
        }
      );

    return () => subscribe();
  }, []);
};

export default useRealtimeOrders;
