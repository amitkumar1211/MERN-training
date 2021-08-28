const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

// TrainingAssignment Model
const TrainingAssignment = require("../models/TrainingAssignment");

// Route: GET api/trainingAssignment
// Description: Get all TrainingAssignments
// Access: Private

router.get("/", (req, res) => {
  TrainingAssignment.find()
    .then((trainingAssignment) => res.json(trainingAssignment));
});

// Route: GET api/trainingAssignment
// Description: Get a single trainingAssignment
// Access: Private

router.get("/:id", (req, res) => {
  TrainingAssignment.findById(req.params.id)
    .then((trainingAssignment) => res.json(trainingAssignment))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Route: POST api/trainingAssignment
// Description: Create a trainingAssignment
// Access: Private

router.post("/", auth, async (req, res) => {
  try {
    const newTrainingAssignment = new TrainingAssignment({
      userId: req.body.userId,
      trainingId: req.body.trainingId,
      completion: req.body.completion,
      dueDate: Date.parse(req.body.dueDate),
    });

    if (!newTrainingAssignment) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    const savedTrainingAssignment = await newTrainingAssignment.save();
    res.json(savedTrainingAssignment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route: UPDATE api/trainingAssignment/update/:id
// Description: Update an existing trainingAssignment
// Access: Private

router.put("/update/:id", auth, (req, res) => {
  TrainingAssignment.findById({ _id: req.params.id })
    .then((trainingAssignment) => {
      trainingAssignment.userId = req.body.userId;
      trainingAssignment.trainingId = req.body.trainingId;
      trainingAssignment.completion = req.body.completion;
      trainingAssignment.dueDate = Date.parse(req.body.dueDate);

      trainingAssignment
        .save()
        .then(() => res.json("TrainingAssignment updated!"))
        .catch((err) => res.status(400).json("Error " + err));
    })
    .catch((err) => res.status(400).json("Error " + err));
});

// Route: DELETE api/trainingAssignment/:id
// Description: Delete an existing trainingAssignment
// Access: Private

router.delete("/:id", auth, (req, res) => {
  TrainingAssignment.findById({_id: req.params.id })
    .then((trainingAssignment) => trainingAssignment.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
