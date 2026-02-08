const { createBodyMetricsEntry } = require("../../domain/models");
const bodyMetricsApi = require("../api/bodyMetricsApi");

const execute = async (payload) => {
  const entry = createBodyMetricsEntry(payload);
  return bodyMetricsApi.create(entry);
};

module.exports = {
  execute
};
