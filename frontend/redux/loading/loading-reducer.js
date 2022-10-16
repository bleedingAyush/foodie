const initialState = {
  REQUEST: { id: [] },
  SUCCESS: { id: [] },
  FAILURE: { id: [], message: [] },
};

/*
if it's like GET_TODOS_REQUEST then split it 
you will get an array like ['GET', "TODOS",  'REQUEST']
and use array methods like slice to remove the last item, 
afte removing them u will something like this ["GET", "TODOS"] 
then join it with _
then after that look for it in existing array and once found perform actions
*/
function filterLoading(item, actionMatch) {
  let [match] = item.match(/([A-Z])\w+_/);

  return match !== actionMatch;
}
const loadingReducer = (state = initialState, action) => {
  const { type, payload } = action;
  const matches = /(REQUEST|SUCCESS|FAILURE|RESET)/.exec(type);

  if (!matches) return state;

  const [actionMatch] = type.match(/([A-Z])\w+_/);
  const [, requestName] = matches;

  const filteredRequestsArr = state.REQUEST.id.filter((item) => {
    return filterLoading(item, actionMatch);
  });

  switch (requestName) {
    case "REQUEST": {
      if (state.REQUEST.id.includes(type)) return state;
      return {
        ...state,
        // Store whether a request is happening at the moment or not

        REQUEST: { ...state.REQUEST, id: state.REQUEST.id.concat(type) },
      };
    }
    case "SUCCESS": {
      if (state.SUCCESS.id.includes(type)) return state;

      // store wether a request is resloved
      // remove the existing request stored

      return {
        ...state,
        SUCCESS: { ...state.SUCCESS, id: state.SUCCESS.id.concat(type) },
        REQUEST: { ...state.REQUEST, id: [...filteredRequestsArr] },
      };
    }
    case "FAILURE": {
      if (state.FAILURE.id.includes(type)) return state;
      // store wether a request is resloved
      // remove the existing request stored
      /* 
      When we are resetting other loading the failure message of some other loading gets deleted
      */

      return {
        ...state,
        FAILURE: {
          ...state.FAILURE,
          id: state.FAILURE.id.concat(type),
          message: payload
            ? [...state.FAILURE.message.concat(payload)]
            : [...state.FAILURE.message],
        },
        REQUEST: { ...state.REQUEST, id: [...filteredRequestsArr] },
      };
    }
    case "RESET": {
      const filteredSuccessArr = state.SUCCESS.id.filter((item) => {
        return filterLoading(item, actionMatch);
      });
      const failureFilteredArr = state.FAILURE.id.filter((item) => {
        return filterLoading(item, actionMatch);
      });

      /* 
      Over here we are finding the index of message(object) to 
      be removed then removing ti with the help of splice
      */
      let matchMessage = state.FAILURE.message.find((item) => {
        let [itemType] = Object.keys(item);
        let [match] = itemType.match(/([A-Z])\w+_/);
        return match === actionMatch;
      });
      let filteredMessageArr = state.FAILURE.message.filter((item) => {
        if (!matchMessage) return;
        let [itemType] = Object.keys(item)[0].match(/([A-Z])\w+_/);

        let [message] = Object.keys(matchMessage)[0].match(/([A-Z])\w+_/);

        return itemType !== message;
      });

      /*
      RESET the store 
      by removing existing success or failure stored in the store.
      */

      return {
        ...state,
        FAILURE: {
          ...state.FAILURE,
          id: [...failureFilteredArr],
          message: matchMessage
            ? [...filteredMessageArr]
            : [...state.FAILURE.message],
        },
        SUCCESS: { ...state.SUCCESS, id: [...filteredSuccessArr] },
      };
    }
    default:
      return state;
  }
};
export default loadingReducer;
