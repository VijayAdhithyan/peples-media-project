import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchFollowings } from "../../actions/post";
import UserProfile from "./UserProfile";
import Followings from "./Followings";

const CommunityFollowings = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchFollowings(id));
  }, []);

  const userFollowings = useSelector((state) => state.fetchFollowingReducer);

  return (
    <div style={{ marginTop: "100px" }}>
      <UserProfile />
      <div className="followers-container">
        <hr />
        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            fontSize: "20px",
            fontWeight: "500",
          }}
        >
          Followings
        </p>
      </div>

      {userFollowings.data === null ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {userFollowings.data.map((userFollowing) => (
            <Followings key={userFollowing._id} userFollowing={userFollowing} />
          ))}
        </>
      )}
    </div>
  );
};

export default CommunityFollowings;
