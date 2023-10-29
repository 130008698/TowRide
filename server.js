const express = require("express");
const { Client } = require("pg");
const app = express();
app.use(express.json());
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

//Equal to get_table in Backend.java
app.get("/get_table", async (req, res) => {
  const name = req.query.name;

  // Check if the name query parameter was provided
  if (!name) {
    return res.status(400).json({ error: "Name parameter is required." });
  }

  let query = `SELECT * FROM "${name}" ORDER BY 1`;
  client.query(query, (err, result) => {
    if (err) {
      res.status(500).send("Error fetching data");
      return;
    }
    res.json(result.rows);
  });
});

//Equal to check_menu in Backend.java
app.get("/check_menu", async (req, res) => {
  const name = req.query.name;

  // Check if the name query parameter was provided
  if (!name) {
    return res.status(400).json({ error: "Name parameter is required." });
  }

  let query = `SELECT * FROM menu WHERE name = '${name}'`;
  client.query(query, (err, result) => {
    if (err) {
      res.status(500).send("Error fetching data");
      return;
    }
    if (result.rows.length > 0) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  });
});

// Handle 404 - Keep this as the last route
app.use((req, res, next) => {
  res.status(404).send("Sorry, page not found!");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server started on http://0.0.0.0:${PORT}`);
});
