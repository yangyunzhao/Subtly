const fitnessRepository = require("../repositories/fitnessRepository");
const bodyMetricsRepository = require("../repositories/bodyMetricsRepository");

const execute = ({ kind, id, patch }) => {
  if (kind === "body") {
    bodyMetricsRepository.update(id, patch);
    return;
  }
  fitnessRepository.update(id, patch);
};

module.exports = {
  execute
};
