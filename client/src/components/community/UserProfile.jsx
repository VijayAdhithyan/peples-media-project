import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import { useDispatch, useSelector } from "react-redux";
import noAvatar from "../../asset/noAvatar.png";
import { Link, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import axios from "axios";
import { fetchUsers } from "../../actions/post";

const UserProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers(id));
  }, [dispatch]);

  const fetchUser = useSelector((state) => state.fetchUsersReducer);

  const user = useSelector((state) => state.currentUserReducer);

  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    setIsFollowed(fetchUser.data?.followers.includes(user?.result._id));
  }, [fetchUser.data?.followers, user?.result._id]);


  const handleFollow = async () => {
    try {
      if (isFollowed) {
        await axios.put("http://localhost:5000/community/" + id + "/unfollow", {
          userId: user.result._id,
        });
      } else {
        await axios.put("http://localhost:5000/community/" + id + "/follow", {
          userId: user.result._id,
        });
      }
    } catch (error) {
      console.log(error);
    }
    setIsFollowed(!isFollowed);
  };

  return (
    <div className="user-profile-wrapper">
      <div className="user-profile">
        <img src={noAvatar} alt="" className="user-profile-img" />
        <p className="user-name">{fetchUser?.data?.name}</p>
      </div>
      <div className="user-profile-info">
        <div className="user-profile-frnds">
          <Link
            to={`/Community/Profile/Followers/${id}`}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p style={{ fontSize: "18px", color: "#111" }}>Followers</p>
            <p style={{ fontSize: "17px", color: "#111" }}>
              {fetchUser?.data?.followers.length}
            </p>
          </Link>
        </div>
        <hr />
        <div className="user-profile-frnds">
          <Link
            to={`/Community/Profile/Followings/${id}`}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p
              style={{
                fontSize: "18px",
                color: "#111",
                textDecoration: "none",
              }}
            >
              Followings
            </p>
            <p style={{ fontSize: "17px", color: "#111" }}>
              {fetchUser?.data?.followings.length}
            </p>
          </Link>
        </div>
      </div>
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
  );
};

export default UserProfile;
