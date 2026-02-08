const fitnessRepository = require("../repositories/fitnessRepository");
const bodyMetricsRepository = require("../repositories/bodyMetricsRepository");

const execute = ({ kind, id }) => {
  if (kind === "body") {
    bodyMetricsRepository.delete(id);
    return;
  }
  fitnessRepository.delete(id);
};

module.exports = {
  execute
};
