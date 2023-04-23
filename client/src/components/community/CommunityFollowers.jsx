import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchFollowers } from "../../actions/post";
import Followers from "./Followers";
import UserProfile from "./UserProfile";

const CommunityFollowers = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchFollowers(id));
  }, []);

  const userFollowers = useSelector((state) => state.fetchFollowerReducer);

  return (
    <div style={{ marginTop: "100px" }}>
      <UserProfile />
      <div className="followers-container">
        <hr />
        <p style={{textAlign:"center",marginTop:"20px",fontSize:"20px",fontWeight:"500"}}>Followers</p>
      </div>

      {userFollowers.data === null ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {userFollowers.data.map((userFollower) => (
            <Followers key={userFollower._id} userFollower={userFollower} />
          ))}
        </>
      )}
    </div>
  );
};

export default CommunityFollowers;
