const express = require("express");
const router = express.Router();
const { firestore, appCheck, auth } = require("firebase-admin");
const { sendMessage } = require("../utils/sendMessage");

function updateData(prevOrders, newOrders) {
  // console.log("PrevOrders", prevOrders);
  let i = 0;
  let new_arr = [...prevOrders];
  for (i; i < newOrders.length; i++) {
    let cart = newOrders[i];

    // Check if the cart id matches with the order id
    let idMatch = prevOrders.find((item) => item.id === cart.id);
    if (idMatch) {
      // check if sub id exists.
      let subIdMatch = cart.subDataId;
      if (subIdMatch) {
        // find if the id matches and the sub id matches
        let subId = prevOrders.find(
          (item) => idMatch.id === item.id && item.subDataId === cart.subDataId
        );
        // if subid matches then increment the quantity and insert the updated item in place of the previous item
        if (subId) {
          // these are the products with sub id present in both orders and cart.
          cart.quantity += subId.quantity;
          cart.quantityPrice = cart.quantity * cart.price;
          let itemIndex = prevOrders.indexOf(subId);
          new_arr[itemIndex] = cart;
        }
        // if the sub id does not match it means that the item is not there in orders so add it.
        else {
          new_arr.push(cart);
        }
      } else {
        let itemIndex = prevOrders.indexOf(idMatch);
        cart.quantity += idMatch.quantity;
        cart.quantityPrice = cart.quantity * cart.price;
        new_arr[itemIndex] = cart;
      }
    }
    // if the id does not match then add the items to the order
    else {
      new_arr.push(cart);
    }
  }
  return new_arr;
}

const updateOrderItems = (orderSubColl, orderData, newOrders) => {
  let order_id = orderData.orderId;
  let existingOrders = orderData.order_items;
  const orderDocRef = orderSubColl.doc(order_id);
  let items = updateData(existingOrders, newOrders);
  orderDocRef
    .update({
      order_items: items,
    })
    .catch((err) => {
      throw new Error(err);
    });
};

function addOrderData(orderSubColl, cartData, deliveryCharge) {
  let id = orderSubColl.doc().id;
  const order_details = {
    orderId: id,
    order_items: cartData,
    created_at: firestore.FieldValue.serverTimestamp(),
    order_status: "pending",
    deliveryCharge,
  };
  orderSubColl
    .doc(id)
    .set(order_details)
    .catch((err) => {
      throw new Error(err);
      // console.log(err);
    });
}

const fetchOrderSubCollData = async (orderSubColl) => {
  const data = await orderSubColl
    .where("order_status", "==", "pending")
    .limit(1)
    .get();
  if (data?.size !== 0) {
    let orderData;
    data.forEach((item) => {
      orderData = item?.data();
    });
    return orderData;
  } else {
    return null;
  }
};

const appCheckVerification = async (req, res, next) => {
  const appCheckToken = req.header("X-Firebase-AppCheck");
  if (!appCheckToken) {
    res.status(401);
    next(new Error("unauthorized"));
  }

  try {
    const appCheckClaims = await appCheck().verifyToken(appCheckToken);

    // If verifyToken() succeeds, continue with the next middleware
    // function in the stack.
    return next();
  } catch (err) {
    res.status(401);
    next(new Error("unauthorized"));
  }
};

const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      req.user = await auth().verifyIdToken(token);
      next();
    }
  } catch (err) {
    res.status(401);
    next(new Error("unauthorized"));
  }
};

router.post(
  "/order",
  [appCheckVerification, protect],
  async (req, res, next) => {
    const { cartData, deliveryCharge } = req.body;
    const user = req.user;

    const userColl = firestore().collection("users");
    const userRef = userColl.doc(user.uid);
    const orderSubColl = userRef.collection("orders");
    try {
      let orderData = await fetchOrderSubCollData(orderSubColl);
      if (orderData !== null) {
        updateOrderItems(orderSubColl, orderData, cartData);
      } else {
        addOrderData(orderSubColl, cartData, deliveryCharge);
      }
      const userDoc = await firestore().collection("users").doc(user.uid).get();
      const token = userDoc.data()?.notificationToken;
      await sendMessage(
        token,
        "Order Placed 🎉",
        "Your order has been placed",
        "orders"
      );
      res.status(200).send({ status: "ok" });
    } catch (error) {
      console.log({ error });
      next(new Error("error"));
    }
  }
);

module.exports = router;
