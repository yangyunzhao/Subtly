const FITNESS_KEY = "fitnessEntries";
const BODY_KEY = "bodyMetricsEntries";

const getEntries = (key) => {
  return wx.getStorageSync(key) || [];
};

const setEntries = (key, entries) => {
  wx.setStorageSync(key, entries);
};

const upsertEntry = (key, entry) => {
  const entries = getEntries(key);
  const index = entries.findIndex((item) => item.id === entry.id);
  if (index >= 0) {
    entries[index] = entry;
  } else {
    entries.unshift(entry);
  }
  setEntries(key, entries);
  return entries;
};

const deleteEntry = (key, id) => {
  const entries = getEntries(key).filter((item) => item.id !== id);
  setEntries(key, entries);
  return entries;
};

const getEntryById = (key, id) => {
  return getEntries(key).find((item) => item.id === id);
};

const findByDate = (key, date) => {
  return getEntries(key).filter((item) => item.date === date);
};

module.exports = {
  FITNESS_KEY,
  BODY_KEY,
  getEntries,
  setEntries,
  upsertEntry,
  deleteEntry,
  getEntryById,
  findByDate
};
