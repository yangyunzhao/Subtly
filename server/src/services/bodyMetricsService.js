const bodyMetricsRepository = require("../repositories/bodyMetricsRepository");
const { getRange } = require("../utils/date");

const createBodyMetricsEntry = (payload) => {
  return bodyMetricsRepository.create(payload);
};

const listBodyMetricsEntries = ({ range = "7d" } = {}) => {
  const { start, end } = getRange(range);
  if (!start) {
    return bodyMetricsRepository.listAll();
  }
  return bodyMetricsRepository.listByDateRange(start, end);
};

const getBodyMetricsEntry = (id) => {
  return bodyMetricsRepository.getById(id);
};

const updateBodyMetricsEntry = (id, patch) => {
  bodyMetricsRepository.update(id, patch);
};

const deleteBodyMetricsEntry = (id) => {
  bodyMetricsRepository.delete(id);
};

module.exports = {
  createBodyMetricsEntry,
  listBodyMetricsEntries,
  getBodyMetricsEntry,
  updateBodyMetricsEntry,
  deleteBodyMetricsEntry
};
