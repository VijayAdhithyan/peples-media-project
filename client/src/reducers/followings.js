const fetchFollowingReducer = (state = { data: null }, action) => {
  switch (action.type) {
    case "FETCH_FOLLOWINGS":
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

export default fetchFollowingReducer;
