import React, { useState } from "react";
import "./Share.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchAllPost } from "../../actions/post";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import noAvatar from "../../asset/noAvatar.png";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { CircularProgress } from "@mui/material";

const Share = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const [isFetching, setIsFetching] = useState(false);

  const handleFetch = () => {
    setIsFetching(true);
  };

  const user = useSelector((state) => state.currentUserReducer);

  const [isImg, setIsImg] = useState(null);
  const [img, setImg] = useState("");

  const [isVideo, setIsVideo] = useState(null);
  const [video, setVideo] = useState("");

  const [desc, setDesc] = useState("");

  //Img File
  const handleImgUpload = (e) => {
    const imgFile = e.target.files[0];
    setIsImg(imgFile);
    TransformImgFileData(imgFile);
  };

  const TransformImgFileData = (imgFile) => {
    const reader = new FileReader();

    if (imgFile) {
      reader.readAsDataURL(imgFile);
      reader.onloadend = () => {
        setImg(reader.result);
      };
    } else {
      setImg("");
    }
  };

  //Video File
  const handleVideoUpload = (e) => {
    const videoFile = e.target.files[0];
    setIsVideo(videoFile);
    TransformVideoFileData(videoFile);
  };

  const TransformVideoFileData = (videoFile) => {
    const reader = new FileReader();

    if (videoFile) {
      reader.readAsDataURL(videoFile);
      reader.onloadend = () => {
        setVideo(reader.result);
      };
    } else {
      setVideo("");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user.result._id,
      desc: desc,
    };

    if (desc) {
      if (!img && !video) {
        try {
          await axios.post(
            "http://localhost:5000/community/posts/desc",
            newPost
          );

          // navigate("/");
          window.location.reload();
          dispatch(fetchAllPost());
        } catch (err) {
          console.log(err);
        }
      }
      if (img) {
        newPost.img = img;
        try {
          await axios.post(
            "http://localhost:5000/community/posts/img",
            newPost
          );

          // navigate("/");
          window.location.reload();
          dispatch(fetchAllPost());
        } catch (err) {
          console.log(err);
        }
      }
      if (video) {
        newPost.video = video;
        try {
          await axios.post(
            "http://localhost:5000/community/posts/video",
            newPost
          );

          // navigate("/");
          window.location.reload();
          dispatch(fetchAllPost());
        } catch (err) {
          console.log(err);
        }
      }
    }
    if (desc === "" && img) {
      newPost.img = img;
      try {
        await axios.post("http://localhost:5000/community/posts/img", newPost);

        // navigate("/");
        window.location.reload();
        dispatch(fetchAllPost());
      } catch (err) {
        console.log(err);
      }
    }
    if (desc === "" && video) {
      newPost.video = video;
      try {
        await axios.post(
          "http://localhost:5000/community/posts/video",
          newPost
        );

        // navigate("/");
        window.location.reload();
        dispatch(fetchAllPost());
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="share-post">
      <div className="share-post-wrapper">
        <div className="share-top">
          <Link
            to={`/Community/Profile/${user?.result._id}`}
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <img src={noAvatar} alt="" className="post-profile" />
          </Link>
          <input
            className="share-desc"
            placeholder="Share your posts"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <hr />
        {isImg && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(isImg)} alt="" />
            <CloseIcon
              className="shareCancelImg"
              onClick={() => setIsImg(null)}
            />
          </div>
        )}
        {isVideo && (
          <div className="shareImgContainer">
            <video
              preload="auto"
              width="100%"
              height="100%"
              controls
              className="shareImg"
              src={URL.createObjectURL(isVideo)}
              alt=""
            />
            <CloseIcon
              className="shareCancelImg"
              onClick={() => setVideo(null)}
            />
          </div>
        )}
        <form className="share-bottom" onSubmit={submitHandler}>
          <div style={{ display: "flex", columnGap: "50px" }}>
            <label htmlFor="shareImg" className="share-folder">
              <AddPhotoAlternateIcon htmlColor="tomato" />
              <p className="share-btn">Share photo</p>
              <input
                style={{ display: "none" }}
                type="file"
                name="file"
                id="shareImg"
                accept="image/*"
                onChange={handleImgUpload}
              />
            </label>
            <label htmlFor="shareVideo" className="share-folder">
              <VideoLibraryIcon htmlColor="tomato" />
              <p className="share-btn">Share video</p>
              <input
                style={{ display: "none" }}
                type="file"
                name="file"
                id="shareVideo"
                accept="video/*"
                onChange={handleVideoUpload}
              />
            </label>
          </div>

          <button
            type="submit"
            className={isFetching ? "share-button-disable" : "share-button"}
            onClick={handleFetch}
          >
            {isFetching ? (
              <CircularProgress color="inherit" size="12px" />
            ) : (
              "Share"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Share;
