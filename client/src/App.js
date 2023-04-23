import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AllRoutes from "./AllRoutes";
import NavBar from "./components/navBar/NavBar";
// import { fetchQuestion } from "./actions/question";
import { useDispatch } from "react-redux";
import { fetchAllPost } from "./actions/post";
// import { fetchAllUsers } from "./actions/users";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(fetchQuestion());
    // dispatch(fetchAllUsers());
    dispatch(fetchAllPost());
  }, [dispatch]);

  return (
    <Router>
      <NavBar />
      <AllRoutes />
    </Router>
  );
}

export default App;
