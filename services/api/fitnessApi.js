const { request } = require("./http");

const create = (payload) => {
  return request({ url: "/api/fitness", method: "POST", data: payload });
};

const list = ({ range = "7d" } = {}) => {
  return request({ url: `/api/fitness?range=${range}` });
};

const getById = (id) => {
  return request({ url: `/api/fitness/${id}` });
};

const update = (id, patch) => {
  return request({ url: `/api/fitness/${id}`, method: "PATCH", data: patch });
};

const remove = (id) => {
  return request({ url: `/api/fitness/${id}`, method: "DELETE" });
};

module.exports = {
  create,
  list,
  getById,
  update,
  delete: remove
};
