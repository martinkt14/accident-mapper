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
  accidents.forEach(accident => {
    let popup = new mapboxgl.Popup().setHTML(
      `<h1>Record Number: ${accident["Record Number"]}</h1>
            <h2>Accident Type: ${accident["Accident Type"]}</h2>
            <p>${accident["Summary"]}</p>`
    );

    let marker = new mapboxgl.Marker()
      .setLngLat([accident["Longitude"], accident["Latitude"]])
      .setPopup(popup)
      .addTo(map);
  });
};

//Filter Accident Types

//Filter Accidents by Distance
//Add Project Location Marker
map.on("click", function(e) {
  if (
    document
      .querySelector("#target-point-button")
      .classList.contains("btn-danger")
  ) {
    const markerOptions = {
      color: "red"
    };
    let marker = new mapboxgl.Marker(markerOptions)
      .setLngLat(e.lngLat)
      .addTo(map);
    document
      .querySelector("#target-point-button")
      .classList.remove("btn-danger");
    proxPickPoint.textContent = proxPickPoint.classList.contains("btn-danger")
      ? "Cancel"
      : "Pick Point";
  }
});

//Filter Accidents by Roadway
