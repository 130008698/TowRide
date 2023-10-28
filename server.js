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
app.get("/fetch-data", (req, res) => {
  client.query("SELECT * FROM menu", (err, dbResult) => {
    if (err) {
      res.status(500).send("Error fetching data");
      return;
    }
    res.json(dbResult.rows);
  });
});

//Equal to get_table in Backend.java
app.get("/get_table", async (req, res) => {
  const name = req.query.name;

  // Check if the name query parameter was provided
  if (!name) {
    return res.status(400).json({ error: "Name parameter is required." });
  }

  try {
    const result = await client.query(query);

    let output = "";
    const columnCount = result.fields.length;
    for (let i = 0; i < columnCount; i++) {
      output += result.fields[i].name + "\t";
    }
    output += "\n";

    for (let row of result.rows) {
      for (let i = 0; i < columnCount; i++) {
        output += row[result.fields[i].name] + "\t";
      }
      output += "\n";
    }

    res.send(output);
  } catch (error) {
    console.error("Error in get table:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

//Equal to check_menu in Backend.java
app.get("/check_menu", async (req, res) => {
  const name = req.query.name;

  // Check if the name query parameter was provided
  if (!name) {
    return res.status(400).json({ error: "Name parameter is required." });
  }

  try {
    const result = await client.query("SELECT * FROM menu WHERE name = $1", [
      name,
    ]);
    // Check if there are any rows returned by the query
    if (result.rows.length > 0) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    console.error("Error in check menu:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Handle 404 - Keep this as the last route
app.use((req, res, next) => {
  res.status(404).send("Sorry, page not found!");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server started on http://0.0.0.0:${PORT}`);
});
