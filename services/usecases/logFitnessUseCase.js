const { createFitnessEntry } = require("../../domain/models");
const fitnessApi = require("../api/fitnessApi");

const execute = async (payload) => {
  const entry = createFitnessEntry(payload);
  return fitnessApi.create(entry);
};

module.exports = {
  execute
};
