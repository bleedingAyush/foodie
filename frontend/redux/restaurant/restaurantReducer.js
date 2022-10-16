const initialState = {};

const ResturantReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_RESTURANT_DATA": {
      return { ...state, ...action.payload };
    }
    case "ADD_USER_NOTIFICATION_TOKEN": {
      return { ...state, notificationToken: action.payload };
    }
    default:
      return state;
  }
};

export default ResturantReducer;
