import { createSelector } from "reselect";

const foodState = (state) => state.ProductItems;
const cartState = (state) => state.CartItems;
const loadingState = (state) => state.loadingReducer;
const restaurantState = (state) => state.ResturantReducer;

export const foodDataItems = createSelector(foodState, (items) => {
  let food_data = items.foodProductData;
  if (food_data !== null && food_data !== undefined) {
    let arrData = food_data;
    return arrData;
  }
});

const filterArray = (cartItems, foodItems) => {
  let result = [];
  let price = 0;
  cartItems.forEach((cart) => {
    let foodItemExists = foodItems.find((food) => food.id === cart.id);

    if (foodItemExists) {
      let subIdObj = foodItemExists.itemDetails?.find(
        (item) => item.subDataId === cart.subDataId
      );

      let itemPrice = subIdObj ? subIdObj.price : foodItemExists.price;
      result.push({
        id: cart.id,
        name: foodItemExists.name,
        price: itemPrice,
        quantityPrice: cart.itemTotalPrice,
        quantity: cart.quantity,
      });

      if (cart.subDataId) {
        let index = result.length - 1;
        result[index].subDataId = cart.subDataId;
      }
    }
  });
  return result;
};

const calcPrice = (arr) => {
  let price = 0;
  arr.forEach((item) => {
    price += item.quantityPrice;
  });

  return arr;
};

function calcTotalPrice(arr) {
  if (arr.length == 0) return 0;
  let price = 0;
  arr.forEach((item) => {
    price += item.quantityPrice;
  });
  return price;
}

export const cartDataItems = createSelector(
  [cartState, foodDataItems, loadingState, restaurantState],
  (cartItems, foodItems, loading, restaurant) => {
    const filteredArray = filterArray(cartItems.cartData, foodItems);
    const final_result = calcPrice(filteredArray);
    const output = filteredArray.length === 1 ? filteredArray : final_result;
    let final_output = {
      loading,
      data: output,
      restaurant: {},
      totalPrice: calcTotalPrice(output),
    };
    let resturantLength = Object.keys(restaurant).length;
    if (resturantLength !== 0) {
      final_output = { ...final_output, restaurant };
    }

    return final_output;
  }
);
