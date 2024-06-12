
// Select all dropdown buttons
const dropdownButtons = document.querySelectorAll("[data-dropdown-button]");

// Loop through each dropdown button
dropdownButtons.forEach(button => {
  // Get the corresponding dropdown menu
  const menu = document.querySelector(`[data-dropdown-menu="${button.dataset.dropdownButton}"]`);

  // Add event listeners for the button
  button.addEventListener("mouseover", () => {
    menu.classList.remove("invisible", "opacity-0");
  });
  button.addEventListener("mouseout", () => {
    menu.classList.add("invisible", "opacity-0");
  });

  // Add event listeners for the menu
  menu.addEventListener("mouseover", () => {
    menu.classList.remove("invisible", "opacity-0");
  });
  menu.addEventListener("mouseout", () => {
    menu.classList.add("invisible", "opacity-0");
  });
});

document.querySelectorAll("[data-submenu-trigger]").forEach(trigger => {
    const submenu = trigger.querySelector("[data-submenu]")

    trigger.addEventListener("mouseover", () => {
        submenu.classList.remove("invisible", "opacity-0")
    })

    trigger.addEventListener("mouseout", () => {
        submenu.classList.add("invisible", "opacity-0")
    })

    submenu.addEventListener("mouseover", () => {
        submenu.classList.remove("invisible", "opacity-0")
    })

    submenu.addEventListener("mouseout", () => {
        submenu.classList.add("invisible", "opacity-0")
    })
})