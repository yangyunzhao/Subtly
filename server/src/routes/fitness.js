const express = require("express");
const fitnessService = require("../services/fitnessService");

const router = express.Router();

router.post("/", (req, res) => {
  try {
    const entry = fitnessService.createFitnessEntry(req.body);
    res.json({ data: entry, error: null });
  } catch (error) {
    res.status(500).json({ data: null, error: error.message });
  }
});

router.get("/", (req, res) => {
  try {
    const entries = fitnessService.listFitnessEntries({ range: req.query.range });
    res.json({ data: entries, error: null });
  } catch (error) {
    res.status(500).json({ data: null, error: error.message });
  }
});

router.get("/:id", (req, res) => {
  try {
    const entry = fitnessService.getFitnessEntry(req.params.id);
    if (!entry) {
      res.status(404).json({ data: null, error: "Not found" });
      return;
    }
    res.json({ data: entry, error: null });
  } catch (error) {
    res.status(500).json({ data: null, error: error.message });
  }
});

router.patch("/:id", (req, res) => {
  try {
    fitnessService.updateFitnessEntry(req.params.id, req.body);
    res.json({ data: true, error: null });
  } catch (error) {
    res.status(500).json({ data: null, error: error.message });
  }
});

router.delete("/:id", (req, res) => {
  try {
    fitnessService.deleteFitnessEntry(req.params.id);
    res.json({ data: true, error: null });
  } catch (error) {
    res.status(500).json({ data: null, error: error.message });
  }
});

module.exports = router;
