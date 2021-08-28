import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import AppNavBar from './services/AppNavBar';
import UserContext from './services/UserContext';
import Home from './components/main/Welcome';
import AddTraining from './components/tasks/AddTraining';
import EditTraining from './components/tasks/EditTraining';
import TrainingList from './components/tasks/TrainingList';
import Login from './components/main/Login';
import Register from './components/main/Register';
import './App.css';

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
    role: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await axios.post("api/auth/tokenIsValid", null, {
        headers: { "x-auth-token": token },
      });
      if (tokenRes.data) {
        const userRes = await axios.get("/api/auth/user", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
          role: userRes.data.role,
        });
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <Router>
      <UserContext.Provider value={{ userData, setUserData }}>
        <div className="App">
          <AppNavBar />
          <br />
          <Route exact path="/" component={Home} />
          <Route path="/trainings" component={TrainingList} />
          <Route path="/edit/:id" component={EditTraining} />
          <Route path="/createtraining/" component={AddTraining} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
