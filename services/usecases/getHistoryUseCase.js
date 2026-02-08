const fitnessRepository = require("../repositories/fitnessRepository");
const bodyMetricsRepository = require("../repositories/bodyMetricsRepository");
const { formatDate } = require("../../utils/date");

const getRange = (range) => {
  if (range === "all") return { start: null, end: null };
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (range === "7d") {
    const startDate = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000);
    return { start: formatDate(startDate), end: formatDate(today) };
  }
  if (range === "month") {
    const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    return { start: formatDate(startDate), end: formatDate(today) };
  }
  return { start: null, end: null };
};

const execute = async ({ range = "7d" } = {}) => {
  const { start, end } = getRange(range);
  const fitnessEntries = start
    ? await fitnessRepository.listByDateRange(start, end)
    : await fitnessRepository.listAll();
  const bodyEntries = start
    ? await bodyMetricsRepository.listByDateRange(start, end)
    : await bodyMetricsRepository.listAll();
  return {
    fitnessEntries,
    bodyEntries
  };
};

module.exports = {
  execute
};
