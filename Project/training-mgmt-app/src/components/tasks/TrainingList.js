import React, { useState, useEffect, useContext } from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import http from '../../services/http-common';
//import UserContext from "../../services/UserContext";


// const Training = (props) => (

  <tr>
    <td>{props.training.name}</td>
    <td>{props.training.description}</td>
    <td>{props.training.status}</td>
    <td>{props.training.reference}</td>
    <td>
      <Link to={"/edit/" + props.training._id} style={{ color: "#20c997" }}>
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
          props.deleteTraining(props.training._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
// );

const TrainingsList = () => {

  const {trainings, setTrainings} = useState([]);
  //const { userData } = useContext(UserContext);

  
  // constructor(props) {
  //   super(props);

  //   this.state = { trainings: [] };
    
  // }

  const findTrainings = () => {
    let token = localStorage.getItem("auth-token");
    http.get("/trainings/", { headers: { "x-auth-token": token } })
    .then(res => {
      setTrainings(res.data);
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  useEffect(() => {
    console.log("use Effect called");
    
    findTrainings();
  }, []);

  // var deleteTraining = (id) => {
  //   const token = localStorage.getItem("auth-token");
  //   http
  //     .delete("/trainings/" + id, { headers: { "x-auth-token": token } })
  //     .then((res) => console.log(res.data));

  //   this.setTrainings(
  //     this.trainings.filter((el) => el._id !== id),
  //   );
  // };

  // var trainingDisplay = () => {
  //   return trainings.map((currentTraining) => {
  //     return (
  //       <Training
  //         training={currentTraining}
  //         deleteTraining={this.deleteTraining}
  //         key={currentTraining._id}
  //       />
  //     );
  //   });
  // };

  // var trainingDisplay = () => {
  //   return trainings.map((currentTraining) => {
  //     return (
  //       // <Training
  //       //   training={currentTraining}
  //       //   deleteTraining={this.deleteTraining}
  //       //   key={currentTraining._id}
  //       // />
  //       console.log(currentTraining)
  //     );
  //   });
  // };

  // var clearInputs = () => {
  //   this.setTraining([]);
  // };

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
        {/* <tbody>{trainingDisplay()}</tbody> */}
        <div className="col-md-6">
        <h4>Tutorials List</h4>

        <ul className="list-group">
          {trainings &&
            trainings.map((training, index) => (
              <li
              >
                {training.name}
              </li>
            ))}
        </ul>

        {/* <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllTutorials}
        >
          Remove All
        </button> */}
      </div>
      </Table>
    );
  }

  export default TrainingsList;
