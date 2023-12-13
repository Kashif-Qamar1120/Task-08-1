const express = require("express");
const fs = require("fs").promises;
const app = express();
app.use(express.json());
// JSON file name
const jsonFileName = "task-01.json"; 

// Creating initial JSON file and have content in the file (for demonstration)
const initialJSONContent = { 
  Name: "Kashif Qamar",
  Age:23,
  Adddress:"Peshawar",
  Reg_No:"21PWBCS0852"
};
fs.writeFile(
  jsonFileName,
  JSON.stringify(initialJSONContent, null, 2),
  (err) => {
    if (err) throw err;
    console.log("JSON file created successful with initial text.!");
  }
);

// GET /readFile Endpoint
app.get("/readFile", async (req, res) => {
  try {
    const jsonData = await fs.readFile(jsonFileName, "utf8");
    res.send(JSON.parse(jsonData));
  } catch (error) {
    res.status(404).send("File not found.");
  }
});

// POST /writeFile Endpoint
app.post("/writeFile", async (req, res) => {
  const { data } = req.body;
  try {
    if (!data) throw new Error("No data have provided...!");
    await fs.writeFile(jsonFileName, JSON.stringify(data, null, 2));
    res.send("Congratulations..! File written successfully.");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// PUT /updateFile Endpoint
app.put("/updateFile", async (req, res) => {
  const { newData } = req.body;
  try {
    if (!newData) throw new Error("No data have provided...!");

    // Read the existing JSON content
    const jsonData = await fs.readFile(jsonFileName, "utf8");
    const existingData = JSON.parse(jsonData);

    // Append newData to existingData
    existingData.message += `\n ${newData}`;

    // Write updated JSON content back to the file
    await fs.writeFile(jsonFileName, JSON.stringify(existingData, null, 2));
    res.send("Congratulations..! File updated successfully.");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("You Have Entered Something went wrong...!");
});

// Start the server
const PORT = 11000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
