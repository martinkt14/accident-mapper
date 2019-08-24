const path = require("path");
const fs = require("fs");
const express = require("express");
const app = express();
const multer = require("multer");
const xlsx = require("xlsx");

//Define variables
const PORT = process.env.PORT || 3000;

//Set multer settings
const upload = multer({
    storage: multer.memoryStorage()
});

//Define path for public files
const publicDirectoryPath = path.join(__dirname, "/src");

//Excel to JSON file handler function
function handleFile(e) {
    var file = e.target;
}

//Route for accident file upload
app.post("/accidents", upload.single("filedrop"), (req, res) => {
    // res.send(req.file);
    var workbookData = xlsx.read(req.file.buffer, { type: "buffer" });
    var jsonData = xlsx.utils.sheet_to_json(workbookData.Sheets["Sheet1"], {
        defval: ""
    });
    res.send(jsonData);
    // res.send(workbookData["Sheets"]);
});

//Setup static directory to serve files
app.use(express.static(publicDirectoryPath));

app.listen(PORT, () => {
    console.log("Server is up on port " + PORT);
});
