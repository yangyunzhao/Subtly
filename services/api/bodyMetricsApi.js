const { request } = require("./http");

const create = (payload) => {
  return request({ url: "/api/body-metrics", method: "POST", data: payload });
};

const list = ({ range = "7d" } = {}) => {
  return request({ url: `/api/body-metrics?range=${range}` });
};

const getById = (id) => {
  return request({ url: `/api/body-metrics/${id}` });
};

const update = (id, patch) => {
  return request({ url: `/api/body-metrics/${id}`, method: "PATCH", data: patch });
};

const remove = (id) => {
  return request({ url: `/api/body-metrics/${id}`, method: "DELETE" });
};

module.exports = {
  create,
  list,
  getById,
  update,
  delete: remove
};
