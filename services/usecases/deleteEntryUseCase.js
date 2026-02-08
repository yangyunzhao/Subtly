const fitnessRepository = require("../repositories/fitnessRepository");
const bodyMetricsRepository = require("../repositories/bodyMetricsRepository");

const execute = async ({ kind, id }) => {
  if (kind === "body") {
    await bodyMetricsRepository.delete(id);
    return;
  }
  await fitnessRepository.delete(id);
};

module.exports = {
  execute
};
