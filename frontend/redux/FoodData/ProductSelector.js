import { createSelector } from "reselect";

const loading = (state) => state.loadingReducer;
const foodState = (state) => state.ProductItems;
const restaurantState = (state) => state.ResturantReducer;

const productsSelector = createSelector([foodState], (items) => {
  let food_data = [...items.foodProductData];
  if (food_data !== null && food_data !== undefined) {
    return items;
  }
});

export const productDataItems = createSelector(
  [loading, productsSelector, restaurantState],
  (loadingState, products, restaurant) => {
    let resturantLength = Object.keys(restaurant).length;

    if (products !== undefined && resturantLength !== 0) {
      let data = {
        products: products.foodProductData,
        loading: loadingState,
        restaurant,
        modalFoodId: products.modalFoodId,
      };
      return data;
    } else {
      return {
        products: [],
        loading: loadingState,
        restaurant: {},
        modalFoodId: products.modalFoodId,
      };
    }
  }
);
