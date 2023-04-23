import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllPost } from "../../actions/post";
import Post from "./Post";
import { useSelector } from "react-redux";
import Share from "./Share";

const CommunityPost = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPost());
  }, [dispatch]);

  const allPosts = useSelector((state) => state.fetchPostReducer);

  return (
    <div>
      <Share />
      <div>
        {allPosts.data === null ? (
          <h1>Loading...</h1>
        ) : (
          <>
            {allPosts.data.map((post) => (
              <Post key={post._id} post={post} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default CommunityPost;
