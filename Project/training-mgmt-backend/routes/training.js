const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

// Training Model
const Training = require("../models/Training");

// TrainingAssignment Model
const TrainingAssignment = require("../models/TrainingAssignment");

// Route: GET api/training
// Description: Get all Trainings
// Access: Private

router.get("/", auth, (req, res) => {
// 	Training.aggregate([{ 
//  $lookup: {
//   from: 'TrainingAssignment',
//   localField: 'trainingId',
//   foreignField: 'trainingId',
//   as: 'Customer'
//  }}]);
  Training.find()
    .then((training) => res.json(training));
});

// Route: GET api/training
// Description: Get a single training
// Access: Private

router.get("/:id", auth, (req, res) => {
  Training.findById(req.params.id)
    .then((training) => res.json(training))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Route: POST api/training
// Description: Create a training
// Access: Private

router.post("/", auth, async (req, res) => {
  try {
    const newTraining = new Training({
      name: req.body.name,
      description: req.body.description,
      status: req.body.status,
      reference: req.body.reference,
    });

    if (!newTraining) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    const savedTraining = await newTraining.save();
    res.json(savedTraining);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route: UPDATE api/training/update/:id
// Description: Update an existing training
// Access: Private

router.post("/update/:id", auth, (req, res) => {
  Training.findById({_id: req.params.id })
    .then((training) => {
      training.name = req.body.name;
      training.description = req.body.description;
      training.status = req.body.status;
      training.reference = req.body.reference;

      training
        .save()
        .then(() => res.json("Training updated!"))
        .catch((err) => res.status(400).json("Error " + err));
    })
    .catch((err) => res.status(400).json("Error " + err));
});

// Route: DELETE api/training/:id
// Description: Delete an existing training
// Access: Private

router.delete("/:id", auth, (req, res) => {
  Training.findById({_id: req.params.id })
    .then((training) => training.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
