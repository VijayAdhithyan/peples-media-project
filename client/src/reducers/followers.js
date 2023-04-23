const fetchFollowerReducer = (state = { data: null }, action) => {
  switch (action.type) {
    case "FETCH_FOLLOWERS":
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

export default fetchFollowerReducer;
