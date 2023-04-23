import React from "react";
import { Route, Routes } from "react-router-dom";
// import Home from "./pages/homePage/Home";
import Login from "./pages/authPage/loginPage/Login";
import SignUp from "./pages/authPage/signUpPage/SignUp";
// import AskQuestion from "./pages/askQuestionPage/AskQuestion";
// import Questions from "./pages/questionsPage/Questions";
// import DisplayQuestion from "./pages/questionsPage/DisplayQuestion";
// import Tags from "./pages/tags/TagPage";
// import Users from "./pages/users/Users";
import CommunityHome from "./pages/communityPost/CommunityHome";
import ProfilePage from "./pages/communityPost/ProfilePage";
import FollowersPage from "./pages/communityPost/FollowersPage";
import FollowingsPage from "./pages/communityPost/FollowingsPage";
// import UserProfile from "./pages/userProfile/UserProfile";

const AllRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" element={<CommunityHome />} />
      <Route path="/Auth/Login" element={<Login />} />
      <Route path="/Auth/Signup" element={<SignUp />} />
      {/* <Route path="/AskQuestion" element={<AskQuestion />} /> */}
      {/* <Route path="/Question" element={<Questions />} /> */}
      {/* <Route path="/Question/:id" element={<DisplayQuestion />} /> */}
      {/* <Route path="/Tags" element={<Tags />} /> */}
      {/* <Route path="/Users" element={<Users />} /> */}
      {/* <Route path="/Users/:id" element={<UserProfile />} /> */}
      {/* <Route path="/Community" element={<CommunityHome />} /> */}
      <Route path="/Community/Profile/:id" element={<ProfilePage />} />
      <Route
        path="/Community/Profile/Followers/:id"
        element={<FollowersPage />}
      />
      <Route
        path="/Community/Profile/Followings/:id"
        element={<FollowingsPage />}
      />
    </Routes>
  );
};

export default AllRoutes;
