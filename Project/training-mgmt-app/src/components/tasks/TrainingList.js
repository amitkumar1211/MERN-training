import React, { Component } from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import http from '../../services/http-common';

const Training = (props) => (
  <tr>
    <td>{props.trainings.name}</td>
    <td>{props.trainings.description}</td>
    <td>{props.trainings.status}</td>
    <td>{props.trainings.references}</td>
    <td>
      <Link to={"/edit/" + props.ticket._id} style={{ color: "#20c997" }}>
        Edit
      </Link>{" "}
      |{" "}
      <button
        style={{
          color: "#dc3545",
          border: "none",
          background: "transparent",
          padding: "0",
        }}
        href="#"
        onClick={() => {
          props.deleteTicket(props.ticket._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default class TrainingList extends Component {
  constructor(props) {
    super(props);

    this.state = { trainings: [] };
  }

  componentDidMount() {
    const token = localStorage.getItem("auth-token");
    http
      .get("/api/trainings/", { headers: { "x-auth-token": token } })
      .then((res) => {
        this.setState({ trainings: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteTicket = (id) => {
    const token = localStorage.getItem("auth-token");
    http
      .delete("/api/trainings/" + id, { headers: { "x-auth-token": token } })
      .then((res) => console.log(res.data));

    this.setState({
      trainings: this.state.trainings.filter((el) => el._id !== id),
    });
  };

  ticketList = () => {
    return this.state.trainings.map((currentTicket) => {
      return (
        <Training
          ticket={currentTicket}
          deleteTicket={this.deleteTicket}
          key={currentTicket._id}
        />
      );
    });
  };

  clearInputs = () => {
    this.setState({
      trainings: [],
    });
  };

  render() {
    return (
      <Table striped className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Status</th>
            <th>References</th>
          </tr>
        </thead>
        <tbody>{this.ticketList()}</tbody>
      </Table>
    );
  }
}
