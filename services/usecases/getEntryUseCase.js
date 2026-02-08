const fitnessApi = require("../api/fitnessApi");
const bodyMetricsApi = require("../api/bodyMetricsApi");

const execute = async ({ kind, id }) => {
  if (kind === "body") {
    return bodyMetricsApi.getById(id);
  }
  return fitnessApi.getById(id);
};

module.exports = {
  execute
};
