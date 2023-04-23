import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import noAvatar from "../../asset/noAvatar.png";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useSelector } from "react-redux";
import axios from "axios";

const Followings = ({ userFollowing }) => {
  const { id } = useParams;
  const user = useSelector((state) => state.currentUserReducer);

  useEffect(() => {
    setIsFollowed(userFollowing?.followings.includes(user?.result._id));
  }, [userFollowing?.followings, user?.result._id]);

  const [isFollowed, setIsFollowed] = useState(false);

  const handleFollow = async () => {
    try {
      if (isFollowed) {
        await axios.put(
          "http://localhost:5000/community/" + userFollowing._id + "/unfollow",
          {
            userId: user.result._id,
          }
        );
      } else {
        await axios.put(
          "http://localhost:5000/community/" + userFollowing._id + "/follow",
          {
            userId: user.result._id,
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
    setIsFollowed(!isFollowed);
  };
  return (
    <div style={{ marginTop: "30px", width: "100%" }}>
      <div className="follower_wrapper">
        <Link
          to={`/Community/Profile/${userFollowing._id}`}
          className="follower_info"
        >
          <img src={noAvatar} alt="" className="follower_profile" />
          <p className="follower_name">{userFollowing.name}</p>
        </Link>
        {user?.result._id !== id && (
          <div>
            {isFollowed ? (
              <>
                <button className="user-unfollow-btn" onClick={handleFollow}>
                  Unfollow
                  <RemoveIcon style={{ fontSize: "19px" }} />
                </button>
              </>
            ) : (
              <>
                <button className="user-follow-btn" onClick={handleFollow}>
                  Follow
                  <AddIcon style={{ fontSize: "19px" }} />
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Followings;
