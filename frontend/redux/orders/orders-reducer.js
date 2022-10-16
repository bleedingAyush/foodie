import produce from "immer";

const initialState = {
  orders: [],
};
const ordersReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case "SHOW_ORDERS_ITEMS": {
        draft.orders = action.payload;
        break;
      }
      case "MODIFY_ORDER_ITEM": {
        const findIndex = draft.orders.findIndex(
          (item) => item.orderId == action.payload?.orderId
        );
        draft.orders[findIndex] = action.payload;
        break;
      }
      case "ADD_ORDER_ITEM": {
        draft.orders.splice(0, 0, action.payload);
        break;
      }
      default:
        return state;
    }
  });
};

export default ordersReducer;
