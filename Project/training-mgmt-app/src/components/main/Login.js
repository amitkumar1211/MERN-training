import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from '../../services/UserContext';
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import http from '../../services/http-common';

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const loginUser = { email, password };
      const loginRes = await http.post("/auth", loginUser);

      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
        userId: loginRes.data.user.id,
        role: loginRes.data.user.role,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      localStorage.setItem("userId", loginRes.data.user.id);
      history.push("/trainings");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <Form>
      <h3>Login</h3>
      {error}
      <br />
      <FormGroup>
        <Label for="loginEmail">Email</Label>
        <Input
          type="email"
          name="email"
          id="registerEmail"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email.."
        />
      </FormGroup>
      <FormGroup>
        <Label for="loginPassword">Password</Label>
        <Input
          type="password"
          name="password"
          id="registerPassword"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password.."
        />
      </FormGroup>
      <Button onClick={submit} className="button">
        Submit
      </Button>
    </Form>
  );
}
