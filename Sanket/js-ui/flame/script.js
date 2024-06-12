document.addEventListener("DOMContentLoaded", function () {
  var glancecheck = document.querySelector(".aas");
  
  
    
  // ---------------------- PEOPLE ROW ----------------------------//

  /*
   *   This content is licensed according to the W3C Software License at
   *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
   */
  (function () {
    var tablist = document.querySelectorAll('.o-people [role="tablist"]')[0];
    var tabs;
    var panels;

    generateArrays();

    function generateArrays() {
      tabs = document.querySelectorAll('.o-people [role="tab"]');
      panels = document.querySelectorAll('.o-people [role="tabpanel"]');
    }

    // For easy reference
    var keys = {
      end: 35,
      home: 36,
      left: 37,
      up: 38,
      right: 39,
      down: 40,
      delete: 46,
      enter: 13,
      space: 32,
    };

    // Add or subtract depending on key pressed
    var direction = {
      37: -1,
      38: -1,
      39: 1,
      40: 1,
    };

    // Bind listeners
    for (i = 0; i < tabs.length; ++i) {
      addListeners(i);
    }

    function addListeners(index) {
      tabs[index].addEventListener("click", clickEventListener);
      tabs[index].addEventListener("keydown", keydownEventListener);
      tabs[index].addEventListener("keyup", keyupEventListener);

      // Build an array with all tabs (<button>s) in it
      tabs[index].index = index;
    }

    // When a tab is clicked, activateTab is fired to activate it
    function clickEventListener(event) {
      var tab = event.target;
      activateTab(tab, true);
    }

    // Handle keydown on tabs
    function keydownEventListener(event) {
      var key = event.keyCode;

      switch (key) {
        case keys.end:
          event.preventDefault();
          // Activate last tab
          focusLastTab();
          break;
        case keys.home:
          event.preventDefault();
          // Activate first tab
          focusFirstTab();
          break;

        // Up and down are in keydown
        // because we need to prevent page scroll >:)
        case keys.up:
        case keys.down:
          determineOrientation(event);
          break;
      }
    }

    // Handle keyup on tabs
    function keyupEventListener(event) {
      var key = event.keyCode;

      switch (key) {
        case keys.left:
        case keys.right:
          determineOrientation(event);
          break;
        case keys.delete:
          determineDeletable(event);
          break;
        case keys.enter:
        case keys.space:
          activateTab(event.target, true);
          break;
      }
    }

    // When a tablist's aria-orientation is set to vertical,
    // only up and down arrow should function.
    // In all other cases only left and right arrow function.
    function determineOrientation(event) {
      var key = event.keyCode;
      var vertical = tablist.getAttribute("aria-orientation") == "vertical";
      var proceed = false;

      if (vertical) {
        if (key === keys.up || key === keys.down) {
          event.preventDefault();
          proceed = true;
        }
      } else {
        if (key === keys.left || key === keys.right) {
          proceed = true;
        }
      }

      if (proceed) {
        switchTabOnArrowPress(event);
      }
    }

    // Either focus the next, previous, first, or last tab
    // depending on key pressed
    function switchTabOnArrowPress(event) {
      var pressed = event.keyCode;

      if (direction[pressed]) {
        var target = event.target;
        if (target.index !== undefined) {
          if (tabs[target.index + direction[pressed]]) {
            tabs[target.index + direction[pressed]].focus();
          } else if (pressed === keys.left || pressed === keys.up) {
            focusLastTab();
          } else if (pressed === keys.right || pressed == keys.down) {
            focusFirstTab();
          }
        }
      }
    }

    // Activates any given tab panel
    function activateTab(tab, setFocus) {
      // if clicking on the active tab, just clean up and return
      if (tab.getAttribute("aria-selected") == "true") {
        var controls = tab.getAttribute("aria-controls");
        // make sure this panel is not hidden
        document.getElementById(controls).removeAttribute("hidden");
        return;
      }

      // sets focus to the tabpanel
      setFocus = setFocus || true;
      //console.log(setFocus);

      // get current active info
      var currButton = document.querySelector(
        '.m-people-thumbs__button[aria-selected="true"]'
      );
      var currentPersonId = currButton.getAttribute("aria-controls");
      var currentPerson = document.getElementById(currentPersonId);

      // cleanup: hide everything that isn't current active
      for (p = 0; p < panels.length; p++) {
        if (panels[p].getAttribute("id") != currentPersonId) {
          panels[p].setAttribute("hidden", "");
        }
        // remove all personout's
        panels[p].classList.remove("personout");
      }

      // Deactivate all other tabs
      //deactivateTabs();

      // Reset buttons, then activate this one
      for (t = 0; t < tabs.length; t++) {
        tabs[t].setAttribute("tabindex", "-1");
        tabs[t].setAttribute("aria-selected", "false");
      }
      tab.removeAttribute("tabindex");
      // Set the tab as selected
      tab.setAttribute("aria-selected", "true");

      // animate out the current live person
      currentPerson.classList.add("personout");
      currentPerson.addEventListener("transitionend", function (e) {
        // remove this event listener
        currentPerson.removeEventListener("transitionend", arguments.callee);
        if (currentPerson.classList.contains("personout")) {
          currentPerson.classList.remove("personout");
          currentPerson.setAttribute("hidden", "");
        }
      });

      // Get the value of aria-controls (which is an ID)
      var controls = tab.getAttribute("aria-controls");

      // animate in the selected person
      document.getElementById(controls).removeAttribute("hidden");

      // Set focus when required
      if (setFocus) {
        document.getElementById(controls).focus({ preventScroll: true });
        //console.log('attempted to set focus');
      }
    }

    //Deactivate all tabs and tab panels
    function deactivateTabs() {
      for (t = 0; t < tabs.length; t++) {
        tabs[t].setAttribute("tabindex", "-1");
        tabs[t].setAttribute("aria-selected", "false");
      }

      for (p = 0; p < panels.length; p++) {
        panels[p].setAttribute("hidden", "hidden");
      }
    }

    // Make a guess
    function focusFirstTab() {
      tabs[0].focus();
    }

    // Make a guess
    function focusLastTab() {
      tabs[tabs.length - 1].focus();
    }

    


  })();

  //Do not remove these closings...
});
