const navButtons = document.querySelectorAll(".nav-btn");
const subMenus = document.querySelectorAll(".submenu");
const closeButtons = document.querySelectorAll(".fa-times");

//Open Menu(s)
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

//Close Menu(s)
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

console.log("Menu JS loaded...");
