const express = require("express");
const {
  createLead,
  getLeads,
  updateLead,
  deleteLead,
} = require("../controller/leadController");

const router = express.Router();

// Create lead
router.post("/", createLead);

// Get all leads
router.get("/", getLeads);

// Update  lead
router.put("/:id", updateLead);

// Delete lead
router.delete("/:id", deleteLead);

module.exports = router;
