const { createBodyMetricsEntry } = require("../../domain/models");
const bodyMetricsRepository = require("../repositories/bodyMetricsRepository");

const execute = async (payload) => {
  const entry = createBodyMetricsEntry(payload);
  return bodyMetricsRepository.create(entry);
};

module.exports = {
  execute
};
