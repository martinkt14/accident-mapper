//JavaScript file for handling map interaction
console.log("MapJS file loaded...");
//Variable definition
let projectLocation;

//Load Initial Map with Default Settings
mapboxgl.accessToken =
  "pk.eyJ1IjoibWFydGlua3QiLCJhIjoiY2p4Z3A2aDFxMDRzcjN4bXRqZmJ1ZWtnNCJ9.ADTijuOvLGo-XidvFsx7AA";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/light-v10",
  center: [-86.4, 39.8],
  zoom: 6.5
});

//Add Map Options
var scale = new mapboxgl.ScaleControl({
  maxWidth: 200,
  unit: "imperial"
});
map.addControl(scale);

//Plot Accident Data
const mapData = accidents => {
  accidents.features.forEach(feature => {
    let accidentType = feature.properties["Accident Type"].toLowerCase();
    let roadwayID = feature.properties["Roadway ID"];
    //Create Marker Element
    let el = document.createElement("div");
    el.className = "marker";
    el.setAttribute("data-accident-type", accidentType);
    el.setAttribute("data-roadway-id", roadwayID);
    el.style.backgroundImage = `url(../img/icons/${accidentType}-icon.png)`;
    el.style.width = "64px";
    el.style.height = "64px";
    //Add data to popup
    let popup = new mapboxgl.Popup({ offset: 40 }).setHTML(
      `<h1>Record Number: ${feature.properties["Record Number"]}</h1>
            <h2>Accident Type: ${feature.properties["Accident Type"]}</h2>
            <p>${feature.properties["Summary"]}</p>`
    );
    //Set Marker
    new mapboxgl.Marker(el)
      .setLngLat([
        feature.geometry.coordinates[0],
        feature.geometry.coordinates[1]
      ])
      .setPopup(popup)
      .addTo(map);
  });
};

//Add Project Location Marker
// map.on("click", function(e) {
//   if (
//     document
//       .querySelector("#target-point-button")
//       .classList.contains("btn-danger")
//   ) {
//     const markerOptions = {
//       color: "red"
//     };
//     let marker = new mapboxgl.Marker(markerOptions)
//       .setLngLat(e.lngLat)
//       .addTo(map);
//     document
//       .querySelector("#target-point-button")
//       .classList.remove("btn-danger");
//     proxPickPoint.textContent = proxPickPoint.classList.contains("btn-danger")
//       ? "Cancel"
//       : "Pick Point";
//   }
// });
