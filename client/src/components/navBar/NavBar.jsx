import React, { useEffect } from "react";
import "./NavBar.css";
import BsLogo from "../../asset/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { GrSearch } from "react-icons/gr";
import { Box } from "@mui/material";
import setCurrentUser from "../../actions/currentUser";
import decode from "jwt-decode";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.currentUserReducer);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/Auth/Login");
    dispatch(setCurrentUser(null));
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      }
    }
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
  }, [dispatch]);

  return (
    <Box className="navbar">
      <Box fluid className="navbar-container">
        <Box className="hamburger-container">
        </Box>
        <Link
          to="/"
          className="navitem navlogo bs-logo"
          style={{
            display: "flex",
            alignItems: "center",
            color: "#111",
            columnGap: "5px",
          }}
        >
          <img src={BsLogo} alt="Bs-logo" width={30} />
          <p className="logo-name" style={{fontWeight:"600",letterSpacing:"1px"}}>
            <i>PEPLES MEDIA</i>
          </p>
        </Link>
        <form style={{ marginLeft: "20px" }} className="search-box">
          <input
            type="text"
            placeholder="Search...."
            className="search-box-input"
          />
          <GrSearch className="search-box-icon" />
        </form>
        {user === null ? (
          <>
            <Link to="/Auth/Login" className="navitem navlink navlink-1">
              <p>Log in</p>
            </Link>
            <Link to="/Auth/Signup" className="navitem navlink navlink-2">
              <p>Sign up</p>
            </Link>
          </>
        ) : (
          <>
            <Link
              to={`/`}
              style={{ textDecoration: "none", color: "#111" }}
            >
              <p className="avatar">
                {user.result.name.toUpperCase().charAt(0)}
              </p>
            </Link>

            <Link to="/" className="navitem navlink navlink-1 log-out-btn">
              <p onClick={handleLogout}>Log out</p>
            </Link>
          </>
        )}
      </Box>
    </Box>
  );
};

export default NavBar;
