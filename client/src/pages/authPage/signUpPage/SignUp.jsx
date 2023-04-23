import React, { useState } from "react";
import "./SignUp.css";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { signup } from "../../../actions/auth";

const SignUp = () => {
  const [isFetching, setIsFetching] = useState(false);

  const handleFetch = () => {
    setIsFetching(true);
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      alert("Enter Name");
    }
    if (!email) {
      alert("Enter Email");
    }
    if (!password) {
      alert("Enter Password");
    }
    dispatch(signup({ name, email, password }, navigate));
  };

  return (
    <Box className="signup-session">
      <Box className="signup-container">
        <Box className="signup-left-container">
          <p
            style={{
              fontSize: "27px",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Join the Social Media community
          </p>
          <p
            style={{
              fontSize: "17px",
              fontWeight: "300",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Post your daily activities
          </p>
          <p
            style={{
              fontSize: "17px",
              fontWeight: "300",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Unlock new privileges like voting and sharing
          </p>
          <p
            style={{
              fontSize: "17px",
              fontWeight: "300",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            See your favorite photos and videos in one place
          </p>
        </Box>
        <Box className="signup-right-container">
          <form className="Signup-form" onSubmit={handelSubmit}>
            <Box className="signup-name-container">
              <label className="login-label" id="name">
                Display Name
              </label>
              <input
                type="text"
                className="login-input"
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
            <Box className="signup-email-container">
              <label className="login-label">Email</label>
              <input
                type="e-mail"
                className="login-input"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            <Box className="signup-password-container">
              <Box className="signup-password-label-container">
                <label className="login-label">Password</label>
              </Box>
              <input
                type="password"
                className="login-input"
                onChange={(e) => setPassword(e.target.value)}
              />
              <p
                style={{
                  fontSize: "9px",
                  textAlign: "justify",
                  margin: "1px 11px",
                  color: "#555",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Passwords must contain at least eight characters, including at
                least 1 letter and 1 number.
              </p>
            </Box>
            <button
              className={isFetching ? "btnd" : "btn"}
              onClick={handleFetch}
            >
              {isFetching ? (
                <CircularProgress color="inherit" size="16px" />
              ) : (
                "Sign Up"
              )}
            </button>
            <p className="term-para">
              By clicking “Sign up”, you agree{" "}
              <span>our terms of service, privacy policy </span>and{" "}
              <span> cookie policy</span>
            </p>
          </form>
          <Box style={{ display: "flex", columnGap: "10px" }}>
            <p sx={{ fontSize: "13px" }}>Already have an account?</p>
            <Link
              to="/Auth/Login"
              style={{
                color: "#0A95FF",
                fontSize: "13px",
                cursor: "pointer",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Log in
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
