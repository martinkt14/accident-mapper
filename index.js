const path = require("path");
const fs = require("fs");
const express = require("express");
const app = express();
const multer = require("multer");
const xlsx = require("xlsx");
const geojson = require("geojson");

//Define variables
const PORT = process.env.PORT || 3000;

//Set multer settings
const upload = multer({
  storage: multer.memoryStorage()
});

//Define path for public files
const publicDirectoryPath = path.join(__dirname, "/src");

//Route for accident file upload
app.post("/accidents", upload.single("filedrop"), (req, res) => {
  // res.send(req.file);
  let workbookData = xlsx.read(req.file.buffer, { type: "buffer" });
  let jsonData = xlsx.utils.sheet_to_json(workbookData.Sheets["Sheet1"], {
    defval: ""
  });

  let accidents = geojson.parse(jsonData, {
    Point: ["Latitude", "Longitude"]
  });
  console.log(accidents);

  res.setHeader("Content-Type", "application/json");
  res.json(accidents);
});

//Setup static directory to serve files
app.use(express.static(publicDirectoryPath));

app.listen(PORT, () => {
  console.log("Server is up on port " + PORT);
});
