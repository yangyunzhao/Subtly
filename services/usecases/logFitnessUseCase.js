const { createFitnessEntry } = require("../../domain/models");
const fitnessRepository = require("../repositories/fitnessRepository");

const execute = async (payload) => {
  const entry = createFitnessEntry(payload);
  return fitnessRepository.create(entry);
};

module.exports = {
  execute
};
