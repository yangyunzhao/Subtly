const express = require("express");
const cors = require("cors");
const fitnessRoutes = require("./routes/fitness");
const bodyMetricsRoutes = require("./routes/bodyMetrics");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ data: "ok", error: null });
});

app.use("/api/fitness", fitnessRoutes);
app.use("/api/body-metrics", bodyMetricsRoutes);

app.use((req, res) => {
  res.status(404).json({ data: null, error: "Not found" });
});

app.listen(port, () => {
  console.log(`API server listening on :${port}`);
});
