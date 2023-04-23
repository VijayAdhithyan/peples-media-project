const fetchUsersReducer = (state = { data: null }, action) => {
  switch (action.type) {
    case "FETCH_USER":
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

export default fetchUsersReducer;
