const express = require("express");
const { Client } = require("pg");
const app = express();
const PORT = 3000;

const client = new Client({
  connectionString:
    "postgresql://csce315_904_04user:csce315_904_04@csce-315-db.engr.tamu.edu/csce315_904_04db",
});

client.connect((err) => {
  if (err) {
    console.error("Failed to connect to the database!", err.stack);
  } else {
    console.log("Successfully connected to the database.");
  }
});

// Serve static files from the root directory
app.use(express.static(__dirname));

// Fetch data endpoint
app.get("/fetch-data", (req, res) => {
  client.query("SELECT * FROM menu", (err, dbResult) => {
    if (err) {
      res.status(500).send("Error fetching data");
      return;
    }
    res.json(dbResult.rows);
  });
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
