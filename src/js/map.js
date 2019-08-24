//JavaScript file for handling map interaction
console.log("MapJS file loaded...");
//Variable definition

//Load Initial Map with Default Settings
mapboxgl.accessToken =
    "pk.eyJ1IjoibWFydGlua3QiLCJhIjoiY2p4Z3A2aDFxMDRzcjN4bXRqZmJ1ZWtnNCJ9.ADTijuOvLGo-XidvFsx7AA";
var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/light-v10",
    center: [-86.4, 39.8],
    zoom: 6.5
});

//Plot Accident Data

const mapData = accidents => {
    accidents.forEach(accident => {
        let popup = new mapboxgl.Popup().setHTML(
            `<h1>Record Number: ${accident["Record Number"]}</h1>
            <h2>Accident Type: Testing</h2>
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

//Filter Accidents by Roadway
