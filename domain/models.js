const createFitnessEntry = ({
  id,
  date,
  type,
  duration = 0,
  count = 0,
  calories = 0,
  notes = ""
}) => ({
  id,
  date,
  type,
  duration,
  count,
  calories,
  notes
});

const createBodyMetricsEntry = ({
  id,
  date,
  weight = 0,
  waistline = 0
}) => ({
  id,
  date,
  weight,
  waistline
});

module.exports = {
  createFitnessEntry,
  createBodyMetricsEntry
};
