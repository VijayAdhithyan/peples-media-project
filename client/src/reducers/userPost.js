const UserPostReducer = (state = { data: null }, action) => {
  switch (action.type) {
    case "FETCH_USER_POST":
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

export default UserPostReducer;
