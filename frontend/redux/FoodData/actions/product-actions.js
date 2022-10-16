import { product } from "./product-types";

export const ProductData = (data) => {
  return {
    type: product.ADD_PRODUCT_ITEMS,
    payload: data,
  };
};

export const UpdateProduct = (data) => {
  return {
    type: "MODIFY_PRODUCT_ITEM",
    payload: data,
  };
};

export const removeProduct = (data) => {
  return {
    type: "REMOVE_PRODUCT_ITEM",
    payload: data,
  };
};

export const addProduct = (data) => {
  return {
    type: "ADD_PRODUCT_ITEM",
    payload: data,
  };
};

export const AddModalId = (id, show) => {
  if (id == null) {
    return {
      type: "ADD_MODAL_ID",
      payload: null,
    };
  } else {
    return {
      type: "ADD_MODAL_ID",
      payload: { id, show },
    };
  }
};

export const foodDataRequest = () => {
  return {
    type: "FOOD_DATA_REQUEST",
  };
};

export const foodDataSuccess = () => {
  return {
    type: "FOOD_DATA_SUCCESS",
  };
};

export const foodDataFailure = () => {
  return {
    type: "FOOD_DATA_FAILURE",
  };
};

export const foodDataReset = () => {
  return {
    type: "FOOD_DATA_RESET",
  };
};

export const ApiRequestAddData = () => {
  return {
    type: "ADD_DATA_REQUEST",
  };
};

export const ApiSuccessAddData = () => {
  return {
    type: "ADD_DATA_SUCCESS",
  };
};

export const ApiFailureAddData = () => {
  return {
    type: "ADD_DATA_FAILURE",
  };
};
