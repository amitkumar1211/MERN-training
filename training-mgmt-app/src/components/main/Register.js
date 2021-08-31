import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from '../../services/UserContext';
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import http from '../../services/http-common';

export default function Register() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [role, setRole] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const newUser = { name, email, password, passwordCheck, role };
      await http.post("/users", newUser);

      const loginRes = await http.post("/auth", { email, password });

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
      <h3>Register</h3>
      {error}
      <br />
      <FormGroup>
        <Label for="registerName">Name</Label>
        <Input
          type="text"
          name="name"
          id="registerName"
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name.."
        />
      </FormGroup>
      <FormGroup>
        <Label for="registerEmail">Email</Label>
        <Input
          type="email"
          name="email"
          id="registerEmail"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email.."
        />
      </FormGroup>
      <FormGroup>
        <Label for="registerPassword">Password</Label>
        <Input
          type="password"
          name="password"
          id="registerPassword"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password.."
        />
      </FormGroup>
      <FormGroup>
        <Label>Verify Password</Label>
        <Input
          type="password"
          name="passwordCheck"
          onChange={(e) => setPasswordCheck(e.target.value)}
          placeholder="Re-enter password.."
        />
      </FormGroup>
      <FormGroup>
        <Label>User Type</Label>
        <Input
            className="input"
            type="select"
            name="role"
            id="registerRole"
            onChange={(e) => setRole(e.target.value)}
          >
            <option>Select a Role</option>
            <option>ADMIN</option>
            <option>USER</option>
          </Input>
      </FormGroup>
      <Button onClick={submit} className="button">
        Submit
      </Button>
    </Form>
  );
}
