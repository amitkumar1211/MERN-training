import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import http from './services/http-common';
import AppNavBar from './services/AppNavBar';
import UserContext from './services/UserContext';
import Home from './components/main/Welcome';
import AddTraining from './components/tasks/AddTraining';
import EditTraining from './components/tasks/EditTraining';
//import TrainingList from './components/tasks/TrainingList';
import TrainingList from "./components/tasks/Trainings";
import Login from './components/main/Login';
import "bootstrap/dist/css/bootstrap.min.css";
import Register from './components/main/Register';
import AssignTraining from './components/tasks/AssignTraining'
import './App.css';

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
    userId: undefined,
    role: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await http.post("auth/tokenIsValid", null, {
        headers: { "x-auth-token": token },
      });
      if (tokenRes.data) {
        const userRes = await http.get("/auth/user", {
          headers: { "x-auth-token": token },
        });
        console.log(userRes);
        setUserData({
          token,
          user: userRes.data,
          userId: userRes.data.id,
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
          <Route path="/assigntraining/" component={AssignTraining} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
