const path = require("path");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "/src");

//Setup static directory to serve files
app.use(express.static(publicDirectoryPath));

app.listen(PORT, () => {
    // console.log(path.join(__dirname, "/public"));
    console.log("Server is up on port " + PORT);
});
