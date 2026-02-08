const fitnessRepository = require("../repositories/fitnessRepository");
const bodyMetricsRepository = require("../repositories/bodyMetricsRepository");

const execute = async ({ kind, id }) => {
  if (kind === "body") {
    return bodyMetricsRepository.getById(id);
  }
  return fitnessRepository.getById(id);
};

module.exports = {
  execute
};
