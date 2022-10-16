import { combineReducers } from "redux";
import ProductItems from "./FoodData/reducers/Product-reducer";
import CartItems from "./cart/reducers/Cart-reducer";
import ordersReducer from "./orders/orders-reducer";
import ResturantReducer from "./restaurant/restaurantReducer";
import loadingReducer from "./loading/loading-reducer";
import UserReducer from "./user/user-reducer";

const appReducer = combineReducers({
  CartItems,
  ProductItems,
  ordersReducer,
  ResturantReducer,
  loadingReducer,
  UserReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};
export default rootReducer;
