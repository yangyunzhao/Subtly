const {
  BODY_KEY,
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

const create = async (entry) => {
  const entries = getEntries(BODY_KEY);
  entries.unshift(entry);
  setEntries(BODY_KEY, entries);
  return entry;
};

const listByDateRange = async (start, end) => {
  const entries = getEntries(BODY_KEY);
  const filtered = entries.filter((entry) => isInRange(entry.date, start, end));
  return sortByDateDesc(filtered);
};

const listAll = async () => {
  return sortByDateDesc(getEntries(BODY_KEY));
};

const getById = async (id) => {
  return getEntries(BODY_KEY).find((entry) => entry.id === id) || null;
};

const update = async (id, patch) => {
  const entries = getEntries(BODY_KEY);
  const next = entries.map((entry) => (entry.id === id ? { ...entry, ...patch } : entry));
  setEntries(BODY_KEY, next);
};

const remove = async (id) => {
  const entries = getEntries(BODY_KEY).filter((entry) => entry.id !== id);
  setEntries(BODY_KEY, entries);
};

module.exports = {
  create,
  listByDateRange,
  listAll,
  getById,
  update,
  delete: remove
};
