import React from "react";
import {
  Modal,
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";
import { useSelector } from "react-redux";
import { X } from "react-native-feather";

const { width, height } = Dimensions.get("screen");
const ModalView = ({ orderId, modalVisible, hideModal }) => {
  const data = useSelector((state) => state.ordersReducer.orders);
  const item = data.find((item) => item.orderId == orderId);
  let total_price = 0 + item.deliveryCharge;
  item.order_items.forEach((data) => {
    total_price += data.quantityPrice;
  });

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={hideModal}
    >
      <Pressable
        style={[
          styles.cross,
          {
            height: 50,
            width: 50,
            backgroundColor: "#232423",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 35,
          },
        ]}
        onPress={hideModal}
      >
        <X
          color="#fff"
          height={30}
          width={30}
          // style={}
          strokeWidth={2.5}
        />
      </Pressable>
      <View style={styles.modalView}>
        <View style={styles.header}>
          {/* <Text style={styles.cardDate}>{day}</Text> */}
        </View>
        <View style={styles.headerTextView}>
          <Text style={styles.cardsText}>Items</Text>

          <Text style={styles.cardsText}>Quantity</Text>
        </View>
        <ScrollView style={{ backgroundColor: "#f2f2f2" }}>
          {item.order_items.map((orders, index) => {
            let key = `${orders.id}` + `${orders.subDataId}`;

            return (
              <View style={styles.ordersModal} key={key}>
                <Text style={styles.itemText}>{orders.name}</Text>
                <Text style={styles.quantityText}>{orders.quantity}</Text>
                <Text style={styles.itemText}>₹ {orders.price}</Text>
                <Text style={styles.quantityPriceText}>
                  ₹ {orders.quantityPrice}
                </Text>
              </View>
              // </View>
            );
          })}
        </ScrollView>

        <View style={styles.orderStatus}>
          <Text style={styles.orderStatusText}>{item.order_status}</Text>
        </View>
        <Text style={styles.totalPriceText}>Total: ₹ {total_price}</Text>
      </View>
    </Modal>
  );
};

export default ModalView;

const styles = StyleSheet.create({
  modalView: {
    height: "40%",
    marginTop: "auto",
    backgroundColor: "#fff",
    shadowRadius: 0.2,
    elevation: 5,
    width: "100%",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    // padding: 5,
  },
  cross: {
    position: "absolute",
    right: "45%",
    left: "45%",
    // bottom: 0,
    top: "50%",
  },

  backArrowStyle: {
    position: "absolute",
    left: 10,
    top: 5,
  },
  header: {
    justifyContent: "space-between",

    flexDirection: "row",
    marginBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    width: "100%",
  },
  cardsText: {
    fontFamily: "Medium",
    fontSize: 18,
    paddingRight: 5,
    paddingLeft: 5,
  },
  itemText: {
    color: "#000",
    fontFamily: "Medium",
    paddingBottom: 2.5,
    opacity: 0.8,
    paddingLeft: 5,
  },
  quantityText: {
    fontFamily: "Medium",
    position: "absolute",
    right: 5,
    paddingRight: 5,
    opacity: 0.8,
  },

  quantityPriceText: {
    fontFamily: "Medium",
    position: "absolute",
    right: 0,
    top: 22,
    paddingRight: 5,
  },
  headerTextView: { flexDirection: "row", justifyContent: "space-between" },

  totalPriceText: {
    position: "absolute",
    right: 0,
    bottom: 5,
    right: 5,
    fontSize: 16,
    fontFamily: "Medium",
  },
  ordersModal: {
    marginTop: 10,
    // borderColor: "#d9d9d9",
    // width: width * 0.97,
    height: 40,
    paddingBottom: 15,
    borderBottomColor: "#cccccc",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "transparent",
    borderWidth: 1,
    opacity: 0.7,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  cards: {
    width: width * 0.85,
    height: height * 0.07,
    elevation: 5,
    borderRadius: 5,
    margin: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  titleText: {
    marginTop: 25,
    fontFamily: "Regular",
    fontSize: 18,
  },
  containerContent: { marginTop: 20 },
  orderStatus: {
    height: 25,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#15a17b",
    borderRadius: 4,
  },
  orderStatusText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Medium",
    // fontSize: 15,
  },
  font: { fontFamily: "Medium" },
});
