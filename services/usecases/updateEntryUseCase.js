const fitnessRepository = require("../repositories/fitnessRepository");
const bodyMetricsRepository = require("../repositories/bodyMetricsRepository");

const execute = async ({ kind, id, patch }) => {
  if (kind === "body") {
    await bodyMetricsRepository.update(id, patch);
    return;
  }
  await fitnessRepository.update(id, patch);
};

module.exports = {
  execute
};
