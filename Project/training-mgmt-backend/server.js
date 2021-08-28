const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("config");
const path = require("path");

const users = require("./routes/users");
const trainings = require("./routes/training");
const trainingAssignments = require("./routes/training_assignments");
const auth = require("./routes/auth");

const app = express();

//Bodyparser
app.use(express.json());

//cors
app.use(cors());

//database config
const db = config.get('db.url');

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("mongodb connected!"))
.catch((err) => console.log(err));

//use routes
app.use("/api/users", users);
app.use("/api/trainings", trainings);
app.use("/api/trainngAssignments", trainingAssignments);
app.use("/api/auth", auth);

const port = 5010;

app.listen(port, () => console.log(`Server started on port: ${port}`));
