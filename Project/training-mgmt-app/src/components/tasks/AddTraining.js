import React, { Component } from "react";
import axios from "axios";
//import DatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import http from '../../services/http-common';

export default class AddTraining extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subject: "",
      category: "",
      priority: "",
      description: "",
      status: "",
      date: new Date(),
    };
  }

  onChangeName = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  onChangeDescription = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  onChangeStatus = (e) => {
    this.setState({
      status: e.target.value,
    });
  };

  onChangeReference = (e) => {
    this.setState({
      reference: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const ticket = {
        name: this.state.name,
        description: this.state.description,
        status: this.state.status,
        reference: this.state.reference,
    };

    console.log(ticket);

    const token = localStorage.getItem("auth-token");
    http
      .post("/api/trainings/", ticket, { headers: { "x-auth-token": token } })
      .then((res) => console.log(res.data));

    window.location = "/trainings";
  };

  render() {
    return (
      <Form>
        <h3>Create a Ticket</h3>
        <br />
        <FormGroup className="form-group">
          <Label for="subject">Training Name</Label>
          <Input
            className="input"
            type="text"
            name="name"
            id="trainingName"
            value={this.state.name}
            onChange={this.onChangeSubject}
            placeholder="Enter training name..."
          />
        </FormGroup>
        <FormGroup className="form-group">
          <Label for="status">Status</Label>
          <Input
            className="input"
            type="select"
            name="status"
            id="trainingStatus"
            value={this.state.status}
            onChange={this.onChangeStatus}
          >
            <option>Select a Status</option>
            <option>Open</option>
            <option>Closed</option>
          </Input>
        </FormGroup>
        
        <FormGroup className="form-group">
          <Label for="description">Description</Label>
          <Input
            className="input"
            type="textarea"
            name="description"
            id="trainingDescription"
            value={this.state.description}
            onChange={this.onChangeDescription}
            placeholder="Enter ticket description.."
          />
        </FormGroup>
        <FormGroup className="form-group">
          <Label for="reference">References</Label>
          <Input
            className="input"
            type="textarea"
            name="reference"
            id="trainingReference"
            value={this.state.reference}
            onChange={this.onChangeReference}
            placeholder="Enter references.."
          />
        </FormGroup>

        <Button onClick={this.onSubmit} className="button">
          Submit
        </Button>
      </Form>
    );
  }
}
