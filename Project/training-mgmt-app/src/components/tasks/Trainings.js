import React, { useState, useEffect, useContext } from "react";
//import TutorialDataService from "../services/TutorialService";
import { Link } from "react-router-dom";
import http from '../../services/http-common';
import { Table } from "reactstrap";
import UserContext from "../../services/UserContext";

const TrainingList = () => {
    // var assigntraining = {
    //     userId: assignedTraining.userId,
    //     trainingId: assignedTraining.trainingId,
    //     completion: assignedTraining.completion,
    //     dueDate: assignedTraining.dueDate,
    //   };

  const [trainings, setTrainings] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
//   const [assignTraining, setAssignTraining] = useState([]);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    retrieveTrainings();
    // retrieveAssignments();

  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveTrainings = () => {
    let token = localStorage.getItem("auth-token");
    http.get("/trainings/", { headers: { "x-auth-token": token } })
      .then(response => {
        setTrainings(response.data);
        console.log(trainings);
      })
      .catch(e => {
        console.log(e);
      });
  };

  
  // const retrieveAssignments = () => {
  //   let token = localStorage.getItem("auth-token");
  //   http.get("/trainngAssignments/"+userData.user.id, { headers: { "x-auth-token": token } })
  //     .then(response => {
  //       setTrainings(response.data);
  //       console.log(response.data);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // };

  const deleteTraining = () => {
    // TutorialDataService.removeAll()
    //   .then(response => {
    //     console.log(response.data);
    //     refreshList();
    //   })
    //   .catch(e => {
    //     console.log(e);
    //   });
  };

  const findByTitle = () => {
    // TutorialDataService.findByTitle(searchTitle)
    //   .then(response => {
    //     setTutorials(response.data);
    //     console.log(response.data);
    //   })
    //   .catch(e => {
    //     console.log(e);
    //   });
    trainings.map(training)

  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onChange={findByTitle}
            >
              Search Tutorial
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-8">
        <h4>Tutorials List</h4>
        <Table striped className="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>References</th>
                </tr>
            </thead>
            <tbody>
            {trainings &&
                trainings.map((training, index) => (
                <tr>
                    <td>{training.name}</td>
                    <td>{training.description}</td>
                    <td>{training.status}</td>
                    <td>{training.reference}</td>
                    {
                        (userData.role === 'ADMIN') ?
                    
                            <td>
                            <Link to={"/edit/" + training._id} style={{ color: "#20c997" }}>
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
                                deleteTraining(training._id);
                                }}
                            >
                                Delete
                            </button>
                            </td>
                        :
                        <td>
                        <Link to={"/updateassigntraining/" + training._id} style={{ color: "#20c997" }}>
                            Update Training
                        </Link>
                        </td>    

                    }
                </tr>
            ))}
            </tbody>
        </Table>

    
      </div>
    </div>
  );
};

export default TrainingList;
