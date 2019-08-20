//JavaScript file for handling map interaction
console.log("MapJS file loaded...");
//Variable definition
const styleSelectors = document.querySelectorAll(".map-style-selector");
const accidentFileDrop = document.querySelector("#accident-file-drop");

//Load Initial Map with Default Settings
mapboxgl.accessToken =
    "pk.eyJ1IjoibWFydGlua3QiLCJhIjoiY2p4Z3A2aDFxMDRzcjN4bXRqZmJ1ZWtnNCJ9.ADTijuOvLGo-XidvFsx7AA";
var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/light-v10",
    center: [-86.4, 39.8],
    zoom: 6.5
});

//Change map style
styleSelectors.forEach(selector => {
    selector.addEventListener("click", function() {
        const style = this.getAttribute("data-map-style");
        map.setStyle(style);
    });
});

//Load Accident Data
accidentFileDrop.addEventListener("dragover", function(event) {
    event.preventDefault();
});

accidentFileDrop.addEventListener("drop", function(event) {
    event.preventDefault();
    var file = event.dataTransfer.files;
    //Make sure file was uploaded
    if (file.length == 0) {
        return console.log("No file uploaded");
    }
    //Make sure only signle file was uploaded
    if (file.length >= 2) {
        return console.log("Only single file permitted");
    }
    const uploadedFile = file[0];
    const extension = uploadedFile.name.split(".").pop();
    //Check File Extension
    if (extension == "xls" || extension == "xlsx") {
        return console.log("Upload File");
    } else {
        return console.log("Unsupported Filetype");
    }
    console.log(file.name);
});

//Filter Accident Types

//Filter Accidents by Distance

//Filter Accidents by Roadway
