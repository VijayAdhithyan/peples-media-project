import { Box, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../actions/auth";

const Login = () => {
  const [isFetching, setIsFetching] = useState(false);

  const handleFetch = () => {
    setIsFetching(true);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      alert("Enter Email");
      setIsFetching(false);
    }
    if (!password) {
      alert("Enter Password");
      setIsFetching(false);
    }

    dispatch(login({ email, password }, navigate));
  };

  return (
    <Box className="login-session">
      <Box className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <Box className="login-email-container">
            <label className="login-label">Email</label>
            <input
              type="text"
              className="login-input"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box className="login-password-container">
            <Box className="login-password-label-container">
              <label className="login-label">Password</label>
              <span className="login-span">Forget password?</span>
            </Box>
            <input
              type="password"
              className="login-input"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <button className={isFetching ? "btnd" : "btn"} onClick={handleFetch}>
            {isFetching ? (
              <CircularProgress color="inherit" size="16px" />
            ) : (
              "Log in"
            )}
          </button>
        </form>
        <p className="login-text">
          Don’t have an account?
          <Link to="/Auth/Signup" className="login-span">
            Sign up
          </Link>
        </p>
      </Box>
    </Box>
  );
};

export default Login;
