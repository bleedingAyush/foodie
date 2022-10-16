import { produce } from "immer";

const initialState = {
  location: {},
  notificaitonToken: "",
};

const UserReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case "ADD_LOCATION_DATA": {
        draft.location = action.payload;
        break;
      }
      case "ADD_NOTIFICATION_TOKEN": {
        draft.notificaitonToken = action.payload;
        break;
      }

      default:
        return state;
    }
  });
};

export default UserReducer;
