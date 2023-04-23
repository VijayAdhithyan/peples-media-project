import React, { useState, useEffect } from "react";
import "./Post.css";
import likeImg from "../../asset/like.png";
import moment from "moment";
import copy from "copy-to-clipboard";
import { useSelector } from "react-redux";
import axios from "axios";
import noAvatar from "../../asset/noAvatar.png";
import { Link, useLocation } from "react-router-dom";

const Post = ({ post }) => {
  const user = useSelector((state) => state.currentUserReducer);

  const [User, setUser] = useState({});

  const location = useLocation();

  const url = "http://localhost:3000";

  const handleShare = () => {
    copy(url + location.pathname + "/Profile/" + post.userId);
    alert(
      "Copied url : " + url + location.pathname + "/Profile/" + post.userId
    );
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        "http://localhost:5000/community/" + post.userId
      );
      setUser(res.data);
    };
    fetchUser();
  }, []);

  const [isLiked, setIsLiked] = useState(post.likes.includes(user?.result._id));

  const [like, setLike] = useState(post.likes.length);

  const handleLikes = () => {
    try {
      axios.put("http://localhost:5000/community/post/" + post._id + "/like", {
        userId: user.result._id,
      });
    } catch (error) {
      console.log(error);
    }
    isLiked ? setLike(like - 1) : setLike(like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="post-wrapper">
      <div className="post-top">
        <Link
          to={`/Community/Profile/${User._id}`}
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <img src={noAvatar} alt="" className="post-profile" />
          <p className="post-user">{User.name}</p>
        </Link>

        <p style={{ fontSize: "13px", marginTop: "6px" }}>
          {moment(post.createdAt).fromNow()}
        </p>
      </div>
      <div className="post-middle">
        <p className="post-desc">{post.desc}</p>
        {post.img !== undefined && (
          <>
            <img src={post.img.url} alt="" className="post-img" />
          </>
        )}
        {post.video !== undefined && (
          <>
            <video
              className="post-img"
              preload="auto"
              width="100%"
              height="500px"
              controls
            >
              <source src={post.video.url} alt="" className="post-img" />
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

export default Post;
