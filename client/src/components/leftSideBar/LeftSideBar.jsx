import { Box } from "@mui/material";
import React from "react";
import "./LeftSideBar.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import noAvatar from "../../asset/noAvatar.png";

const LeftSideBar = () => {
  const user = useSelector((state) => state.currentUserReducer);
  return (
    <Box className="left-side-bar">
      <Box className="lsb-container" pt={9}>
        <Box className="nav-title-container">
          <img className="user-profile-detail" src={noAvatar} alt="" />
          <p>{user?.result.name}</p>
          {user ? (
            <>
              <Link to={`/Community/Profile/${user?.result._id}`}>
                <button className="profile-btn">Profile</button>
              </Link>
            </>
          ) : (
            <>
              <Link to={`/`}>
                <button className="profile-btn">Profile</button>
              </Link>
            </>
          )}
        </Box>
        <Box className="nav-sub-link-container"></Box>
      </Box>
    </Box>
  );
};

export default LeftSideBar;
