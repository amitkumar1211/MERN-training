import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { NavItem, NavLink, Nav } from "reactstrap";
import UserContext from "../services/UserContext";

export default function AuthOptions() {
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  const register = () => history.push("/register");
  const login = () => history.push("/login");
  const myTrainings = () => history.push("/trainings");
  const createTraining = () => history.push("/createtraining");
  const assignTraining = () => history.push("/assigntraining");

  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
      userId: undefined,
      role: undefined,
    });
    localStorage.removeItem("auth-token");
    window.location = "/";
  };

  return (
    <Nav>
        { (userData.role === 'ADMIN' ) ?
        <>
        <NavItem className="auth-options">
          <NavLink onClick={assignTraining}>Assign Trainings</NavLink>
        </NavItem>
        <NavItem className="auth-options">
          <NavLink onClick={myTrainings}>Trainings</NavLink>
        </NavItem>
        <NavItem className="auth-options">
          <NavLink onClick={createTraining}>Create a Training</NavLink>
        </NavItem>
        <NavItem className="auth-options">
          <NavLink onClick={logout}>Logout</NavLink>
        </NavItem>
        </>
        
          :
          <>
          { (userData.role === 'USER') ?
             
             <>
            <NavItem className="auth-options">
            <NavLink onClick={myTrainings}>My Trainings</NavLink>
            </NavItem>
            <NavItem className="auth-options">
          <NavLink onClick={logout}>Logout</NavLink>
        </NavItem>
            </>
            :
            <>
              <NavItem className="auth-options">
            <NavLink onClick={login}>Login</NavLink>
            </NavItem>
            <NavItem className="auth-options">
            <NavLink onClick={register}>Register</NavLink>
            </NavItem>
            </>
          }
          </>
      }
    </Nav>
  );
}
