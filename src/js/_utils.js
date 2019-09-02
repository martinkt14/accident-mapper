let createSelectOption = (roadwayID, selectMenu) => {
  let el = document.createElement("option");
  el.setAttribute("data-roadway-id", roadwayID);
  el.text = roadwayID;
  selectMenu.add(el);
};

////// Function to load raodway ids/names into roadway/street filter
let loadRoadwayIDs = geojsonData => {
  let roadwayListHolder = document.querySelector("#streetname-filter > select");
  let processedRoadways = [];

  //Enable roadway selector
  roadwayListHolder.disabled = false;
  //Remove placeholder text
  roadwayListHolder.innerHTML = "";

  //Add select menu options
  geojsonData.features.forEach(feature => {
    //Set variable for roadway id
    let roadwayID = feature.properties["Roadway ID"];
    //If roadwayID doesn't exist in list of processed IDs, create select option element
    if (processedRoadways.indexOf(roadwayID) == -1) {
      processedRoadways.push(roadwayID);
    }
  });

  //Add select menu options for roadway filter
  processedRoadways.sort().forEach(roadway => {
    createSelectOption(roadway, roadwayListHolder);
  });
};

let resetRoadwayList = () => {
  let roadwayListHolder = document.querySelector("#streetname-filter > select");
  //Reset/Blank Menu
  roadwayListHolder.innerHTML = "";
  //Add placeholder element
  let el = document.createElement("option");
  el.text = "Please load accident data";
  roadwayListHolder.add(el);
  //Disable roadway selector
  roadwayListHolder.disabled = true;
};

let getFilterStatus = filter => {
  switch (filter) {
    case "type":
      let selectedAccidentTypeList = [];
      let selectedAccidentTypes = document.querySelectorAll(
        "input[type=checkbox]:checked"
      );

      selectedAccidentTypes.forEach(type => {
        if (
          selectedAccidentTypeList.indexOf(
            type.getAttribute("data-accident-type").toLowerCase()
          ) == -1
        ) {
          selectedAccidentTypeList.push(
            type.getAttribute("data-accident-type").toLowerCase()
          );
        }
      });

      return selectedAccidentTypeList;
    case "roadway":
      let selectedRoadwaysList = [];
      let selectedRoadways = document.querySelectorAll("select :checked");

      selectedRoadways.forEach(roadway => {
        if (
          selectedRoadwaysList.indexOf(
            roadway.getAttribute("data-roadway-id")
          ) == -1
        ) {
          selectedRoadwaysList.push(roadway.getAttribute("data-roadway-id"));
        }
      });

      return selectedRoadwaysList;
  }
};

let displayFilteredMarkers = () => {
  let filteredTypes = getFilterStatus("type");
  let filteredRoadways = getFilterStatus("roadway");
  const markers = document.querySelectorAll(".marker");

  markers.forEach(marker => {
    let roadway = marker.getAttribute("data-roadway-id");
    let type = marker.getAttribute("data-accident-type");

    if (
      filteredTypes.indexOf(type) != -1 &&
      filteredRoadways.indexOf(roadway) != -1
    ) {
      marker.style.display = "block";
    } else {
      marker.style.display = "none";
    }
  });
};

export { loadRoadwayIDs, resetRoadwayList, displayFilteredMarkers };
