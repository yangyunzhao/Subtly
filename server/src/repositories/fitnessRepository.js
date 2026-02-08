const { db } = require("../db/sqlite");

const create = (entry) => {
  const stmt = db.prepare(
    `INSERT INTO fitness_entries (id, date, type, duration, count, calories, notes)
     VALUES (@id, @date, @type, @duration, @count, @calories, @notes)`
  );
  stmt.run(entry);
  return entry;
};

const listAll = () => {
  return db.prepare("SELECT * FROM fitness_entries ORDER BY date DESC").all();
};

const listByDateRange = (start, end) => {
  return db
    .prepare(
      "SELECT * FROM fitness_entries WHERE date BETWEEN ? AND ? ORDER BY date DESC"
    )
    .all(start, end);
};

const getById = (id) => {
  return db.prepare("SELECT * FROM fitness_entries WHERE id = ?").get(id) || null;
};

const update = (id, patch) => {
  const fields = Object.keys(patch).filter((key) => key !== "id");
  if (!fields.length) return;
  const assignments = fields.map((field) => `${field} = @${field}`).join(", ");
  const stmt = db.prepare(`UPDATE fitness_entries SET ${assignments} WHERE id = @id`);
  stmt.run({ ...patch, id });
};

const remove = (id) => {
  db.prepare("DELETE FROM fitness_entries WHERE id = ?").run(id);
};

module.exports = {
  create,
  listAll,
  listByDateRange,
  getById,
  update,
  delete: remove
};
