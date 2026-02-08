const fitnessApi = require("../api/fitnessApi");
const bodyMetricsApi = require("../api/bodyMetricsApi");

const execute = async ({ kind, id, patch }) => {
  if (kind === "body") {
    return bodyMetricsApi.update(id, patch);
  }
  return fitnessApi.update(id, patch);
};

module.exports = {
  execute
};
