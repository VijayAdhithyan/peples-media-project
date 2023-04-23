const userDetailReducer = (state = { data: null }, action) => {
  switch (action.type) {
    case "FETCH_USER_DETAIL":
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

export default userDetailReducer;
