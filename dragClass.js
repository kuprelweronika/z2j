function dragOverHandler(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";

  if (e.target.classList.contains("dropzone")) {
    if (checkIfIsInBanned(dragShipType, e.target.id) && checkIfIsInBanned("arounds", e.target.id)) {
      switch (dragShipType) {
        case "carrier": {
          if (directionUserShips === "horizontal") {
            e.target.classList.add("dragover");
            e.target.previousSibling.classList.add("dragover");
            e.target.previousSibling.previousSibling.classList.add("dragover");
            e.target.nextSibling.classList.add("dragover");
            e.target.nextSibling.nextSibling.classList.add("dragover");
            break;
          } else {
            coordinates = parseInt(e.target.id);
            target = document.getElementById(coordinates);
            target.classList.add("dragover");
            target1 = document.getElementById(coordinates + 1);
            target1.classList.add("dragover");
            target2 = document.getElementById(coordinates + 2);
            target2.classList.add("dragover");
            target3 = document.getElementById(coordinates - 2);
            target3.classList.add("dragover");
            target4 = document.getElementById(coordinates - 1);
            target4.classList.add("dragover");
            break;
          }
        }
        case "battleship": {
          if (directionUserShips === "horizontal") {
            e.target.classList.add("dragover");
            e.target.previousSibling.classList.add("dragover");
            e.target.nextSibling.classList.add("dragover");
            e.target.nextSibling.nextSibling.classList.add("dragover");
            break;
          } else {
            coordinates = parseInt(e.target.id);
            target = document.getElementById(coordinates);
            target.classList.add("dragover");
            target1 = document.getElementById(coordinates + 1);
            target1.classList.add("dragover");
            target2 = document.getElementById(coordinates + 2);
            target2.classList.add("dragover");
            target4 = document.getElementById(coordinates - 1);
            target4.classList.add("dragover");
            break;
          }
        }
        case "destroyer": {
          if (directionUserShips === "horizontal") {
            e.target.classList.add("dragover");
            e.target.previousSibling.classList.add("dragover");
            e.target.nextSibling.classList.add("dragover");
            break;
          } else {
            coordinates = parseInt(e.target.id);
            target = document.getElementById(coordinates);
            target.classList.add("dragover");
            target1 = document.getElementById(coordinates + 1);
            target1.classList.add("dragover");
            target4 = document.getElementById(coordinates - 1);
            target4.classList.add("dragover");
            break;
          }
        }
        case "submarine": {
          if (directionUserShips === "horizontal") {
            e.target.classList.add("dragover");
            e.target.previousSibling.classList.add("dragover");
            e.target.nextSibling.classList.add("dragover");
            break;
          } else {
            coordinates = parseInt(e.target.id);
            target = document.getElementById(coordinates);
            target.classList.add("dragover");
            target1 = document.getElementById(coordinates + 1);
            target1.classList.add("dragover");
            target4 = document.getElementById(coordinates - 1);
            target4.classList.add("dragover");
            break;
          }
        }
        case "patrolBoat": {
          if (directionUserShips === "horizontal") {
            e.target.classList.add("dragover");
            e.target.nextSibling.classList.add("dragover");
            break;
          } else {
            coordinates = parseInt(e.target.id);
            target = document.getElementById(coordinates);
            target.classList.add("dragover");
            target1 = document.getElementById(coordinates + 1);
            target1.classList.add("dragover");
            break;
          }
        }
        default: {
          break;
        }
      }
    }
  }
}

function dragLeaveHandler(e) {
  e.dataTransfer.dropEffect = "move";

  if (checkIfIsInBanned(dragShipType, e.target.id) && checkIfIsInBanned("arounds", e.target.id)) {
    switch (dragShipType) {
      case "carrier": {
        if (directionUserShips === "horizontal") {
          e.target.classList.remove("dragover");
          e.target.previousSibling.classList.remove("dragover");
          e.target.previousSibling.previousSibling.classList.remove("dragover");
          e.target.nextSibling.classList.remove("dragover");
          e.target.nextSibling.nextSibling.classList.remove("dragover");
          break;
        } else {
          coordinates = parseInt(e.target.id);
          target = document.getElementById(coordinates);
          target.classList.remove("dragover");
          target1 = document.getElementById(coordinates + 1);
          target1.classList.remove("dragover");
          target2 = document.getElementById(coordinates + 2);
          target2.classList.remove("dragover");
          target3 = document.getElementById(coordinates - 2);
          target3.classList.remove("dragover");
          target4 = document.getElementById(coordinates - 1);
          target4.classList.remove("dragover");
          break;
        }
      }
      case "battleship": {
        if (directionUserShips === "horizontal") {
          e.target.classList.remove("dragover");
          e.target.previousSibling.classList.remove("dragover");
          e.target.nextSibling.classList.remove("dragover");
          e.target.nextSibling.nextSibling.classList.remove("dragover");
          break;
        } else {
          coordinates = parseInt(e.target.id);
          target = document.getElementById(coordinates);
          target.classList.remove("dragover");
          target1 = document.getElementById(coordinates + 1);
          target1.classList.remove("dragover");
          target2 = document.getElementById(coordinates + 2);
          target2.classList.remove("dragover");
          target4 = document.getElementById(coordinates - 1);
          target4.classList.remove("dragover");
          break;
        }
      }
      case "destroyer": {
        if (directionUserShips === "horizontal") {
          e.target.classList.remove("dragover");
          e.target.previousSibling.classList.remove("dragover");
          e.target.nextSibling.classList.remove("dragover");
          break;
        } else {
          coordinates = parseInt(e.target.id);
          target = document.getElementById(coordinates);
          target.classList.remove("dragover");
          target1 = document.getElementById(coordinates + 1);
          target1.classList.remove("dragover");
          target4 = document.getElementById(coordinates - 1);
          target4.classList.remove("dragover");
          break;
        }
      }
      case "submarine": {
        if (directionUserShips === "horizontal") {
          e.target.classList.remove("dragover");
          e.target.previousSibling.classList.remove("dragover");
          e.target.nextSibling.classList.remove("dragover");
          break;
        } else {
          coordinates = parseInt(e.target.id);
          target = document.getElementById(coordinates);
          target.classList.remove("dragover");
          target1 = document.getElementById(coordinates + 1);
          target1.classList.remove("dragover");
          target4 = document.getElementById(coordinates - 1);
          target4.classList.remove("dragover");
          break;
        }
      }
      case "patrolBoat": {
        if (directionUserShips === "horizontal") {
          e.target.classList.remove("dragover");
          e.target.nextSibling.classList.remove("dragover");
          break;
        } else {
          coordinates = parseInt(e.target.id);
          target = document.getElementById(coordinates);
          target.classList.remove("dragover");
          target1 = document.getElementById(coordinates + 1);
          target1.classList.remove("dragover");
          break;
        }
      }
    }
  }
}
