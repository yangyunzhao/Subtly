const fitnessRepository = require("../repositories/fitnessRepository");
const { getRange } = require("../utils/date");

const createFitnessEntry = (payload) => {
  return fitnessRepository.create(payload);
};

const listFitnessEntries = ({ range = "7d" } = {}) => {
  const { start, end } = getRange(range);
  if (!start) {
    return fitnessRepository.listAll();
  }
  return fitnessRepository.listByDateRange(start, end);
};

const getFitnessEntry = (id) => {
  return fitnessRepository.getById(id);
};

const updateFitnessEntry = (id, patch) => {
  fitnessRepository.update(id, patch);
};

const deleteFitnessEntry = (id) => {
  fitnessRepository.delete(id);
};

module.exports = {
  createFitnessEntry,
  listFitnessEntries,
  getFitnessEntry,
  updateFitnessEntry,
  deleteFitnessEntry
};
