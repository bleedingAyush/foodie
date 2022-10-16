import produce from "immer";
import { product } from "../actions/product-types";

const initialState = {
  foodProductData: [],
  modalFoodId: null,
};

const ProductItems = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case product.ADD_PRODUCT_ITEMS: {
        draft.foodProductData = action.payload;
        break;
      }
      case "MODIFY_PRODUCT_ITEM": {
        const modifiedItem = action.payload;
        const index = draft.foodProductData.findIndex(
          (item) => item.id === modifiedItem?.id
        );
        if (index != -1) {
          draft.foodProductData[index] = modifiedItem;
        }
        break;
      }

      case "ADD_PRODUCT_ITEM": {
        const item = action.payload;
        draft.foodProductData.push(item);
        break;
      }
      case "REMOVE_PRODUCT_ITEM": {
        const data = action.payload;
        draft.foodProductData = draft.foodProductData.filter(
          (item) => item.id != data.id
        );
        break;
      }

      case "ADD_MODAL_ID": {
        draft.modalFoodId = action.payload;
        break;
      }
      default:
        return state;
    }
  });
};

export default ProductItems;
