import { cart } from "../actions/cart-types";
import { produce } from "immer";

const initialState = {
  cartData: [],
};
const CartItems = (state = initialState, action) => {
  return produce(state, (draft) => {
    const data = action.payload;
    switch (action.type) {
      case cart.ADD_CART_ITEMS: {
        const idInCart = state.cartData.find((item) => item.id === data.id);
        const subIdInCart = state.cartData.find(
          (item) =>
            item?.id === idInCart?.id && item?.subDataId === data?.subDataId
        );
        if (state.cartData.length !== 0 && subIdInCart) {
          let filteredArray = [];
          const filtered = draft.cartData.find(
            (filterItem) =>
              filterItem.subDataId === subIdInCart.subDataId &&
              filterItem.id === subIdInCart.id
          );

          if (filtered) {
            filtered.quantity++;
            filtered.itemTotalPrice = filtered.quantity * filtered.price;
          }
        } else {
          data.itemTotalPrice = data.price * data.quantity;
          draft.cartData.push(data);
        }
        break;
      }

      case cart.DECREASE_CART_ITEMS: {
        const CartId = state.cartData.find((item) => item.id === data.id);
        const CartSubId = state.cartData.find(
          (item) => item.id === CartId.id && item.subDataId === data.subDataId
        );
        if (CartSubId) {
          const item = draft.cartData.find(
            (filterItem) =>
              filterItem.subDataId === CartSubId.subDataId &&
              filterItem.id === CartSubId.id
          );

          if (item) {
            item.quantity--;
            item.itemTotalPrice = item.quantity * item.price;
          }
        }
        break;
      }

      case cart.REMOVE_CART_ITEMS: {
        if (data.subDataId) {
          const filtered = draft.cartData.filter((filterItem) => {
            return !(
              filterItem.id === data.id &&
              filterItem.subDataId === data.subDataId
            );
          });
          if (filtered.length !== 0) {
            draft.cartData = filtered;
          } else if (state.cartData.length === 1) {
            draft.cartData = [];
          }
        } else {
        }
        break;
      }

      case cart.RESET_CART: {
        draft.cartData = [];
        break;
      }

      default:
        return state;
    }
  });
};

export default CartItems;
