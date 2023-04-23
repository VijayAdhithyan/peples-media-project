const fetchPostReducer = (state = { data: null }, action) => {
  switch (action.type) {
    case "FETCH_ALL_POST":
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

export default fetchPostReducer;
