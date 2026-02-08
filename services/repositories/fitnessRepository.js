const {
  FITNESS_KEY,
  getEntries,
  setEntries
} = require("../../utils/storage");
const { toDate } = require("../../utils/date");

const sortByDateDesc = (entries) => {
  return entries.sort((a, b) => (a.date > b.date ? -1 : 1));
};

const isInRange = (date, start, end) => {
  if (!start || !end) return true;
  const target = toDate(date).getTime();
  return target >= toDate(start).getTime() && target <= toDate(end).getTime();
};

const create = (entry) => {
  const entries = getEntries(FITNESS_KEY);
  entries.unshift(entry);
  setEntries(FITNESS_KEY, entries);
  return entry;
};

const listByDateRange = (start, end) => {
  const entries = getEntries(FITNESS_KEY);
  const filtered = entries.filter((entry) => isInRange(entry.date, start, end));
  return sortByDateDesc(filtered);
};

const listAll = () => {
  return sortByDateDesc(getEntries(FITNESS_KEY));
};

const getById = (id) => {
  return getEntries(FITNESS_KEY).find((entry) => entry.id === id) || null;
};

const update = (id, patch) => {
  const entries = getEntries(FITNESS_KEY);
  const next = entries.map((entry) => (entry.id === id ? { ...entry, ...patch } : entry));
  setEntries(FITNESS_KEY, next);
};

const remove = (id) => {
  const entries = getEntries(FITNESS_KEY).filter((entry) => entry.id !== id);
  setEntries(FITNESS_KEY, entries);
};

module.exports = {
  create,
  listByDateRange,
  listAll,
  getById,
  update,
  delete: remove
};
