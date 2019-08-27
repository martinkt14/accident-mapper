//Variables
const overlay = document.querySelector(".overlay");
//Navigation
const navButtons = document.querySelectorAll(".nav-btn");
const subMenus = document.querySelectorAll(".submenu");
const closeButtons = document.querySelectorAll(".fa-times");
//Map Style
const mapStyleSelectors = document.querySelectorAll(".map-style-selector");
//Accidents
const accidentFileDrop = document.querySelector("#accident-file-drop");
const dropLabel = document.querySelector("label[for=filedrop]");
const fileSubmitButton = document.querySelector("#map-data");
//Filters
const proxPickPoint = document.querySelector("#target-point-button");
const accidentModal = document.querySelector("#accident-upload-modal");
const accidentStatMapped = document.querySelector("#accidents-mapped");
const accidentStatErrors = document.querySelector("#accident-errors");
const analyzeAccidents = document.querySelector(
  "#accident-upload-modal > button"
);
const distanceSlider = document.querySelector("#distance-slider");

////////////////////////////////////////////////
//Open Submenu(s)
////////////////////////////////////////////////
navButtons.forEach(button => {
  button.addEventListener("click", function() {
    //Clear active button styling
    navButtons.forEach(button => {
      button.classList.remove("active");
    });
    //Close any/all submenus
    subMenus.forEach(submenu => {
      submenu.classList.remove("active");
    });
    //Add active styling to submenu button
    button.classList.add("active");
    //Open selected submenu by setting 'active' class
    const menu = this.dataset.menu;
    document.querySelector(menu).classList.add("active");
  });
});

////////////////////////////////////////////////
//Close Menu(s)
////////////////////////////////////////////////
closeButtons.forEach(button => {
  button.addEventListener("click", () => {
    subMenus.forEach(submenu => {
      submenu.classList.remove("active");
    });
    navButtons.forEach(button => {
      button.classList.remove("active");
    });
  });
});

////////////////////////////////////////////////
//Change map style
///////////////////////////////////////////////
mapStyleSelectors.forEach(selector => {
  selector.addEventListener("click", function() {
    //Set style variable from selected style button
    const style = this.getAttribute("data-map-style");
    //Set style on map
    map.setStyle(style);
    //Clear active styling from each style selector button
    mapStyleSelectors.forEach(selector => {
      selector.classList.remove("active");
    });
    //Add active styling to selected style button
    selector.classList.add("active");
  });
});

////////////////////////////////////////////////
//Handle Accident File Drop/Selection
///////////////////////////////////////////////
accidentFileDrop.addEventListener("dragover", function(event) {
  event.preventDefault();
});

accidentFileDrop.addEventListener("dragenter", function(event) {
  event.preventDefault();
  this.classList.add("active");
});

accidentFileDrop.addEventListener("dragleave", function(event) {
  event.preventDefault();
  this.classList.remove("active");
});

accidentFileDrop.addEventListener("drop", function(event) {
  event.preventDefault();
  this.classList.remove("active");

  dropLabel.textContent = event.dataTransfer.files[0].name;
  document.querySelector("#filedrop").files = event.dataTransfer.files;
  fileSubmitButton.classList.add("active");
});

document
  .querySelector("input[id=filedrop]")
  .addEventListener("input", function(event) {
    // console.log(event.target.files[0]);
    dropLabel.textContent = event.target.files[0].name;
    fileSubmitButton.classList.add("active");
  });

////////////////////////////////////////////////
//Handle Accident Map Data Button Press
///////////////////////////////////////////////
accidentFileDrop.addEventListener("submit", function(e) {
  e.preventDefault();
  dropLabel.textContent = "Loading...";
  //Set variable for form data
  let formData = new FormData();
  //Add file to formData variable
  formData.append("filedrop", document.querySelector("#filedrop").files[0]);
  //Send form data
  fetch("../accidents", {
    method: "post",
    body: formData
  }).then(async res => {
    try {
      let accidentData = await res.json().then(data => {
        return data;
      });
      mapData(accidentData);
      dropLabel.textContent = "Data Successfully Uploaded!";
      fileSubmitButton.classList.remove("active");
      overlay.classList.add("active");
      accidentModal.classList.add("active");
    } catch (error) {
      dropLabel.textContent = "Error: Unable to Load Data";
    }
  });
});

////////////////////////////////////////////////
//Handle Accident Modal Analyze Data Button
///////////////////////////////////////////////
analyzeAccidents.addEventListener("click", () => {
  accidentModal.classList.remove("active");
  overlay.classList.remove("active");
  clearMapButton.style = "display: block";
});

////////////////////////////////////////////////
//Handle Clear Map Button
///////////////////////////////////////////////
const clearMapButton = document.querySelector("#clear-map-button");
clearMapButton.addEventListener("click", () => {
  //Set variable for all markers
  let markers = document.querySelectorAll(".mapboxgl-marker");
  //Clear/Remove all markers
  markers.forEach(marker => marker.remove());
  //Hide "Clear Map"
  clearMapButton.style = "display: none";
  //Reset text on file dropzone
  dropLabel.innerHTML = `<strong>Chose a file</strong><span> or drag it here</span>`;
  //Reset File Drop Input/Form
  accidentFileDrop.reset();
});

////////////////////////////////////////////////
//Handle Filters
///////////////////////////////////////////////

//Proximity Filter
//////////////////////////////////
proxPickPoint.addEventListener("click", () => {
  proxPickPoint.classList.toggle("btn-danger");
  //Toggle Text
  proxPickPoint.textContent = proxPickPoint.classList.contains("btn-danger")
    ? "Cancel"
    : "Pick Point";
});

distanceSlider.addEventListener("input", function() {
  const label = document.querySelector("label[for=slider]");
  if (this.value == 0) {
    return (label.textContent = "");
  }
  if (this.value <= 1) {
    return (label.textContent = this.value + " mile");
  }
  return (label.textContent = this.value + " miles");
});

//Category Filter
//////////////////////////////////
const checkboxes = document.querySelectorAll("input[type=checkbox]");

checkboxes.forEach(checkbox => {
  checkbox.addEventListener("click", function(e) {
    console.log(this.getAttribute("data-checkbox-label"));
  });
});

console.log("Menu JS loaded...");
