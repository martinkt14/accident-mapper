const navButtons = document.querySelectorAll(".nav-btn");
const subMenus = document.querySelectorAll(".submenu");
const closeButtons = document.querySelectorAll(".fa-times");
const mapStyleSelectors = document.querySelectorAll(".map-style-selector");
const accidentFileDrop = document.querySelector("#accident-file-drop");
const dropLabel = document.querySelector("label[for=filedrop]");
const fileSubmitButton = document.querySelector("#map-data");

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
    .addEventListener("change", function(event) {
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
        let accidentData = await res.json().then(data => {
            return data;
        });
        mapData(accidentData);
        dropLabel.textContent = "Data Successfully Uploaded!";
    });
});

console.log("Menu JS loaded...");
