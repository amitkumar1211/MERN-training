import React from "react"
import ReactDOM from "react-dom"

import { BrowserRouter as Router } from "react-router-dom";

//functional component
import TodoContainer from "./functionBased/components/TodoContainer"

//class component
//import TodoContainer from "./classBased/components/TodoContainer"

//stylesheet
import "./functionBased/App.css"

//import "./classBased/App.css"

ReactDOM.render(
  <React.StrictMode>
    <Router basename={process.env.PUBLIC_URL}>
      <TodoContainer />
    </Router>  
  </React.StrictMode>, 
  document.getElementById("root")
);