const express = require("express");

const { env } = require("./config");

const app = express();

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

app.listen(env.port, () => {
  console.log(`Server running on port ${env.port}`);
});
