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

// Serve static files from the "public" directory
app.use(express.static(__dirname + "/public"));

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

// Handle 404 - Keep this as the last route
app.use((req, res, next) => {
  res.status(404).send("Sorry, page not found!");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server started on http://0.0.0.0:${PORT}`);
});
