import React, { useEffect, useState } from "react";
import likeImg from "../../asset/like.png";
import "./UserPost.css";
import noAvatar from "../../asset/noAvatar.png";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import moment from "moment";
import copy from "copy-to-clipboard";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const UserPost = ({ userPost }) => {
  
  const user = useSelector((state) => state.currentUserReducer);

  const [postUser, setPostUser] = useState({});

  const location = useLocation();

  const url = "http://localhost:3000";

  const handleShare = () => {
    copy(url + location.pathname + "/Profile/" + userPost.userId);
    alert(
      "Copied url : " + url + location.pathname + "/Profile/" + userPost.userId
    );
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        "http://localhost:5000/community/" + userPost.userId
      );
      setPostUser(res.data);
    };
    fetchUser();
  }, []);

  const [isLiked, setIsLiked] = useState(
    userPost.likes.includes(user?.result._id)
  );

  const [like, setLike] = useState(userPost.likes.length);

  const handleLikes = () => {
    try {
      axios.put(
        "http://localhost:5000/community/post/" + userPost._id + "/like",
        {
          userId: user.result._id,
        }
      );
    } catch (error) {
      console.log(error);
    }
    isLiked ? setLike(like - 1) : setLike(like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="post-wrapper">
      <div className="user-post-top">
        <div className="post-top-info">
          <img src={noAvatar} alt="" className="post-profile" />
          <p className="post-user">{postUser.name}</p>
          <p style={{ fontSize: "13px", marginTop: "6px" }}>
            {moment(userPost.createdAt).fromNow()}
          </p>
        </div>
      </div>
      <div className="post-middle">
        <p className="post-desc">{userPost.desc}</p>
        {userPost.img !== undefined && (
          <img src={userPost.img.url} alt="" className="post-img" />
        )}
        {userPost.video !== undefined && (
          <>
            <video
              className="post-img"
              preload="auto"
              width="100%"
              height="500px"
              controls
            >
              <source src={userPost.video.url} alt="" className="post-img" />
            </video>
          </>
        )}
      </div>
      <div className="post-bottom">
        <div className="post-likes">
          <img
            src={likeImg}
            alt=""
            className="post-like"
            onClick={handleLikes}
          />
          <p className="liked-text">
            {like}
            <span style={{ opacity: "0.9", marginLeft: "2px" }}>
              {" "}
              peoples are liked your post
            </span>{" "}
          </p>
        </div>
        <div className="post-comments">
          <p
            style={{ opacity: "0.8", cursor: "pointer" }}
            onClick={handleShare}
          >
            share
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserPost;
