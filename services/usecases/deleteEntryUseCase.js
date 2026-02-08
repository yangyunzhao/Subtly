const fitnessApi = require("../api/fitnessApi");
const bodyMetricsApi = require("../api/bodyMetricsApi");

const execute = async ({ kind, id }) => {
  if (kind === "body") {
    return bodyMetricsApi.delete(id);
  }
  return fitnessApi.delete(id);
};

module.exports = {
  execute
};
