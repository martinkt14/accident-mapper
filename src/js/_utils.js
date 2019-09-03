let createSelectOption = (roadwayID, selectMenu) => {
  let el = document.createElement("option");
  el.setAttribute("data-roadway-id", roadwayID);
  el.text = roadwayID;
  selectMenu.add(el);
};

//Broken...filter doesn't work...
let createAccidentTypeCheckbox = (type, checkboxContainer) => {
  //Create Container
  let container = document.createElement("div");
  container.classList.add("checkbox-container");
  //Create checkbox
  let el = document.createElement("input");
  el.type = "checkbox";
  el.classList.add("checkbox");
  el.setAttribute("data-checkbox-label", type);
  el.setAttribute("data-accident-type", type.toLowerCase());
  el.checked = true;
  container.appendChild(el);
  //Create Label
  let label = document.createElement("label");
  label.textContent = type;
  container.appendChild(label);

  checkboxContainer.appendChild(container);
};

////// Function to load accident types into type filter (dynamically generated based on imported data)
let loadAccidentTypes = geojsonData => {
  //Define function variables
  let typeFilterContainer = document.querySelector(
    "#accident-type-filter > div"
  );
  let accidentTypeList = [];
  //Main Function
  geojsonData.features.forEach(feature => {
    let accidentType = feature.properties["Accident Type"];
    if (accidentTypeList.indexOf(accidentType) == -1) {
      accidentTypeList.push(accidentType);
    }
  });

  accidentTypeList.sort().forEach(type => {
    createAccidentTypeCheckbox(type, typeFilterContainer);
  });
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

  //Add all roads select option
  let el = document.createElement("option");
  el.setAttribute("data-roadway-id", "all");
  el.text = "Show all/don't filter by roadway";
  el.style.textDecoration = "underline";
  el.style.textShadow = "0px 0px 0px black"; //Faux bold
  el.selected = true;
  roadwayListHolder.add(el);

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
      (filteredRoadways.indexOf(roadway) != -1 ||
        filteredRoadways.indexOf("all") != -1)
    ) {
      marker.style.display = "block";
    } else {
      marker.style.display = "none";
    }
  });
};

export {
  loadAccidentTypes,
  loadRoadwayIDs,
  resetRoadwayList,
  displayFilteredMarkers
};
