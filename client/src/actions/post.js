import * as api from "../api";

export const fetchAllPost = () => async (dispatch) => {
  try {
    const { data } = await api.fetchAllPost();
    dispatch({ type: "FETCH_ALL_POST", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchUserPost = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchUserPost(id);
    dispatch({ type: "FETCH_USER_POST", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchUsers = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchUsers(id);
    dispatch({ type: "FETCH_USER", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchFollowers = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchFollowers(id);
    dispatch({ type: "FETCH_FOLLOWERS", payload: data });
  } catch (error) {
    console.log(error);
  }
}

export const fetchFollowings = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchFollowings(id);
    dispatch({ type: "FETCH_FOLLOWINGS", payload: data });
  } catch (error) {
    console.log(error);
  }
};
