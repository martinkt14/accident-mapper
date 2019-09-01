let sortRoadwayList = unorderedList => {
  return unorderedList.sort();
};

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
      //Create Option Element
      let el = document.createElement("option");
      el.setAttribute("data-roadway-id", roadwayID);
      el.text = roadwayID;
      roadwayListHolder.add(el);

      processedRoadways.push(roadwayID);
    }
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

export { loadRoadwayIDs, resetRoadwayList };
