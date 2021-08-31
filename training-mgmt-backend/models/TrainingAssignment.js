const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TrainingAssignmentSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  trainingId: {
    type: String,
    required: true,
  },
  completion: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  }
  
});

module.exports = TrainingAssignment = mongoose.model("trainingAssignment", TrainingAssignmentSchema);
