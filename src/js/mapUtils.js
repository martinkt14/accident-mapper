const excelToJson = require("convert-excel-to-json");

const processFile = file => {
    const jsonData = excelToJson(file);
    console.log(jsonData);
};

module.exports = processFile;
