const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getRange = (range) => {
  if (range === "all") return { start: null, end: null };
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (range === "7d") {
    const startDate = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000);
    return { start: formatDate(startDate), end: formatDate(today) };
  }
  if (range === "month") {
    const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    return { start: formatDate(startDate), end: formatDate(today) };
  }
  return { start: null, end: null };
};

module.exports = {
  formatDate,
  getRange
};
