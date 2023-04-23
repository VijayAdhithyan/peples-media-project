import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchUserPost } from "../../actions/post";
import Share from "./Share";
import UserPost from "./UserPost";
import UserProfile from "./UserProfile";

const CommunityProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserPost(id));
  }, [dispatch]);

  const userPost = useSelector((state) => state.UserPostReducer);

  const user = useSelector((state) => state.currentUserReducer);

  return (
    <div style={{ marginTop: "100px" }}>
      <div>
        <UserProfile />
      </div>
      <div>{user?.result._id === id && <Share />}</div>
      <div>
        {userPost.data === null ? (
          <h1>Loading...</h1>
        ) : (
          <>
            {userPost.data.map((userPost) => (
              <UserPost key={userPost._id} userPost={userPost} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default CommunityProfile;
