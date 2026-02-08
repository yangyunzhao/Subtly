const fs = require("fs");
const path = require("path");
const Database = require("better-sqlite3");

const dataDir = path.resolve(__dirname, "../../data");
const dbPath = path.join(dataDir, "app.db");
const migrationsDir = path.resolve(__dirname, "migrations");

const ensureDataDir = () => {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

const getMigrationFiles = () => {
  if (!fs.existsSync(migrationsDir)) return [];
  return fs
    .readdirSync(migrationsDir)
    .filter((file) => file.endsWith(".sql"))
    .sort();
};

const runMigrations = (db) => {
  db.exec("CREATE TABLE IF NOT EXISTS migrations (name TEXT PRIMARY KEY)");
  const applied = new Set(
    db.prepare("SELECT name FROM migrations").all().map((row) => row.name)
  );

  const migrationFiles = getMigrationFiles();
  migrationFiles.forEach((file) => {
    if (applied.has(file)) return;
    const sql = fs.readFileSync(path.join(migrationsDir, file), "utf8");
    db.exec(sql);
    db.prepare("INSERT INTO migrations (name) VALUES (?)").run(file);
  });
};

ensureDataDir();
const db = new Database(dbPath);
runMigrations(db);

module.exports = {
  db
};
