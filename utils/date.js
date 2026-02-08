const pad = (value) => String(value).padStart(2, "0");

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  return `${year}-${month}-${day}`;
};

const getToday = () => formatDate(new Date());

const toDate = (dateString) => {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const isWithinDays = (dateString, days) => {
  const target = toDate(dateString).getTime();
  const now = new Date();
  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const start = end - (days - 1) * 24 * 60 * 60 * 1000;
  return target >= start && target <= end;
};

const isSameMonth = (dateString) => {
  const target = toDate(dateString);
  const now = new Date();
  return target.getFullYear() === now.getFullYear() && target.getMonth() === now.getMonth();
};

module.exports = {
  formatDate,
  getToday,
  toDate,
  isWithinDays,
  isSameMonth
};
