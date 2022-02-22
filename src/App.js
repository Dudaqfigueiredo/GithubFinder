import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; /* Importando o aquivo App.css */
import Navbar from './componentes/layout/Navbar.js';
import Users from './componentes/users/Users.js';
import User from './componentes/users/User.js';
import axios from 'axios';
import Search from './componentes/users/Search.js';
import Alert from './componentes/layout/Alert.js';
import About from './componentes/pages/About.js';

class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null,
  };
  /* Uma função. Os componentes podem ser uma função ou uma classe. */
  async componentDidMount() {
    //console.log(process.env.REACT_APP_GITHUB_CLIENT_SECRET);
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ users: res.data, loading: false });
  }
  
  //Get single user
  getUser = async (username) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ user: res.data, loading: false });
  };

  // Clear Users from state
  clearUsers = async () => {
    this.setState({ loading: false });
    const res = await axios.get(
      `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ users: res.data, loading: false });
  };

  //Alerta para quando escrever nada
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });

    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  // Search github users
  searchUsers = async (text) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ users: res.data.items, loading: false });
  };

  render() {
    const { users, loading, user } = this.state;
    const userget = (props) => {
      return(
        <User {...props} getUser={this.getUser} user={user} loading={loading} />
      )
    }
    return (
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Alert alert={this.state.alert} />
            <Routes>
              <Route
                path='/'
                element={
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                }
              />
              <Route path='/about' element={<About />} />
              <Route path='/user/:login' element={userget()} />
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
