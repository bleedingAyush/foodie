import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addProduct,
  removeProduct,
  UpdateProduct,
} from "../../../redux/FoodData/actions/product-actions";
import firestore from "@react-native-firebase/firestore";

const useRealtimeProductUpdate = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    let firstLoad = true;
    const subscriber = firestore()
      .collection("products")
      .onSnapshot(
        (querySnapshot) => {
          if (firstLoad) {
            firstLoad = false;
          } else {
            querySnapshot.docChanges().map((change) => {
              const docData = change.doc.data();
              if (change.type == "removed") {
                dispatch(removeProduct(docData));
              }
              if (change.type == "added") {
                dispatch(addProduct(docData));
              }
              if (change.type == "modified") {
                dispatch(UpdateProduct(docData));
              }
            });
          }
        },
        (error) => {
          console.log({ error });
        }
      );
    return () => subscriber();
  }, []);
};

export default useRealtimeProductUpdate;
