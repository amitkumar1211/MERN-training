import React, { useState, useEffect, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import TutorialDataService from "../services/TutorialService";
import { Link } from "react-router-dom";
import http from '../../services/http-common';
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import UserContext from "../../services/UserContext";

const AssignedTraining = () => {

  const initialAssignedTraining = {
    userId: "",
    trainingId: "",
    completion: "0",
    dueDate: new Date(),
  };

  const [trainings, setTrainings] = useState([]);
  const [users, setUsers] = useState([]);
  const [assignedTraining, setAssignedTraining] = useState(initialAssignedTraining);


  useEffect(() => {
    retrieveTrainings();
    retrieveUsers();
  }, []);

  const retrieveTrainings = () => {
    let token = localStorage.getItem("auth-token");
    http.get("/trainings/", { headers: { "x-auth-token": token } })
      .then(response => {
        setTrainings(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const retrieveUsers = () => {
    let token = localStorage.getItem("auth-token");
    http.get("/users/", { headers: { "x-auth-token": token } })
      .then(response => {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setAssignedTraining({ ...assignedTraining, [name]: value });
  };

  const onChangeDate = (date) => {
    setAssignedTraining({
      dueDate: date,
    })
  };

  const onSubmit = (e) => {
    e.preventDefault();

    var assigntraining = {
      userId: assignedTraining.userId,
      trainingId: assignedTraining.trainingId,
      completion: assignedTraining.completion,
      dueDate: assignedTraining.dueDate,
    };

    console.log(assigntraining);

    const token = localStorage.getItem("auth-token");
    http
      .post("/trainngAssignments/", assigntraining, { headers: { "x-auth-token": token } })
      .then((res) => console.log(res.data));

    window.location = "/trainings";
  };


  return (
    <Form>
        <h3>Assign Training</h3>
        <br />
        <FormGroup className="form-group">
          <Label for="status">Select Training</Label>
          <Input
            className="input"
            type="select"
            name="trainingId"
            id="trainingId"
            value={assignedTraining.trainingId}
            onChange={handleInputChange}
          >
            {trainings.map(training => (
            <option
              key={training.id}
              value={training.id}
            >
              {training.name}
            </option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup className="form-group">
          <Label for="status">Select User</Label>
          <Input
            className="input"
            type="select"
            name="userId"
            id="userId"
            value={assignedTraining.userId}
            onChange={handleInputChange}
          >
            {users.map(user => (
            <option
              key={user.id}
              value={user.id}
            >
              {user.name}
            </option>
            ))}
          </Input>
        </FormGroup>
        
        <FormGroup className="form-group">
          <Label for="description">% of Completion:</Label>
          <Input
            className="input"
            type="input"
            name="completion"
            id="completion"
            value={assignedTraining.completion}
            onChange={handleInputChange}
            placeholder="Enter training completion in %"
          />
        </FormGroup>
        <FormGroup className="form-group">
          <Label for="Date">Due Date</Label>
          <div>
            <DatePicker
              className="date"
              selected={assignedTraining.dueDate}
              onChange={onChangeDate}
            />
          </div>
        </FormGroup>

        <Button onClick={onSubmit} className="button">
          Assign
        </Button>
      </Form>
  );
};

export default AssignedTraining;
