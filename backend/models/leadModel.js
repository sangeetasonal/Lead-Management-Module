const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String },   
    phone: { type: String },
    status: {
      type: String,
      enum: ["New", "Follow-Up", "Qualified", "Converted"],
      default: "New"
    },
    qualification: { type: String },
    interestField: { type: String },
    source: { type: String },
    assignedTo: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lead", leadSchema);
