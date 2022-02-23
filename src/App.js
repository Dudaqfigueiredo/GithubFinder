import React, { Fragment, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css"; /* Importando o aquivo App.css */
import Navbar from "./componentes/layout/Navbar.js";
import Users from "./componentes/users/Users.js";
import User from "./componentes/users/User.js";
import axios from "axios";
import Search from "./componentes/users/Search.js";
import Alert from "./componentes/layout/Alert.js";
import About from "./componentes/pages/About.js";

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  /*   state = {
    users: [],
    user: {},
    repos: [],
    alert: null,
    repos: [],
  }; */
  /* Uma função. Os componentes podem ser uma função ou uma classe. */
  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await axios.get(
        `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      setUsers(res.data.items);
      setLoading(false);
    })();
  }, []);

  // Search github users
  const searchUsers = async (text) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setUsers(res.data.items);
    console.log(setUsers(res.data.items));
    setLoading(false);
  };

  //Get single user
  const getUser = async (username) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setUser(res.data);
    setLoading(false);
  };

  //Get users repos
  const getUserRepos = async (username) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setRepos(res.data);
    setLoading(false);
  };

  // Clear Users from state
  const clearUsers = async () => {
    setLoading(false);
    setUsers([]);
    setLoading(false);
  };

  //Alerta para quando escrever nada
  const showAlert = (msg, type) => {
    setAlert({ msg, type });

    setTimeout(() => setAlert(null), 5000);
  };

  const userget = (props) => {
    return (
      <User
        {...props}
        getUser={getUser}
        getUserRepos={getUserRepos}
        user={user}
        repos={repos}
        loading={loading}
      />
    );
  };
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={alert} />
          <Routes>
            <Route
              path="/"
              element={
                <Fragment>
                  <Search
                    //usersNow={usersNow}
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClear={users?.length > 0}
                    setAlert={showAlert}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/user/:login" element={userget()} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
