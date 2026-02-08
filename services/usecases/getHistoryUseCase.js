const fitnessApi = require("../api/fitnessApi");
const bodyMetricsApi = require("../api/bodyMetricsApi");

const execute = async ({ range = "7d" } = {}) => {
  const [fitnessEntries, bodyEntries] = await Promise.all([
    fitnessApi.list({ range }),
    bodyMetricsApi.list({ range })
  ]);
  return {
    fitnessEntries,
    bodyEntries
  };
};

module.exports = {
  execute
};
