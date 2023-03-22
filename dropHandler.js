function addColor() {
  const dropzoneCells = document.getElementsByClassName("dropzone dragover");
  for (let i = 0; i < dropzoneCells.length; i++) {
    dropzoneCells[i].classList.add("color");
  }
}

function dropHorizontal(coordinate, type, position) {
  coordinate = parseInt(coordinate);
  let row = Math.floor(coordinate / 100);
  let col = (coordinate - 200) / 10;
  gameBoardPlayer[row][col + position] = 1;
  shipsPlayer[type].coordinate.push(coordinate + position * 10);
  bannedAround(parseInt(coordinate) + position * 10);
  addColor();
}

function dropVertical(coordinate, type, position) {
  row = parseInt(coordinate.slice(2, 3)) + position;
  col = parseInt(coordinate.slice(1, 2));
  coordinate = parseInt(coordinate);
  gameBoardPlayer[row][col] = 1;
  shipsPlayer[type].coordinate.push(coordinate + position);
  bannedAround(parseInt(coordinate) + position);
  addColor();
  let el1 = document.getElementById(coordinate + position);
  el1.appendChild(document.getElementById(dragShipType));
}

function drop_handler(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
  dragShipType = e.dataTransfer.getData("text/plain");
  if (checkIfIsInBanned(dragShipType, e.target.id) && checkIfIsInBanned("arounds", e.target.id)) {
    switch (dragShipType) {
      case "carrier": {
        if (directionUserShips === "horizontal") {
          dropHorizontal(e.target.id, 0, 0);
          dropHorizontal(e.target.id, 0, 1);
          dropHorizontal(e.target.id, 0, -1);
          dropHorizontal(e.target.id, 0, 2);
          dropHorizontal(e.target.id, 0, -2);
          bannedAround(parseInt(e.target.id) - 30);
          e.target.appendChild(document.getElementById(dragShipType));
          e.target.previousSibling.appendChild(document.getElementById(dragShipType));
          e.target.nextSibling.appendChild(document.getElementById(dragShipType));
          e.target.previousSibling.previousSibling.appendChild(document.getElementById(dragShipType));
          e.target.nextSibling.nextSibling.appendChild(document.getElementById(dragShipType));

          break;
        } else {
          dropVertical(e.target.id, 0, 0);
          dropVertical(e.target.id, 0, 1);
          dropVertical(e.target.id, 0, -1);
          dropVertical(e.target.id, 0, 2);
          dropVertical(e.target.id, 0, -2);
          break;
        }
      }
      case "battleship": {
        if (directionUserShips === "horizontal") {
          dropHorizontal(e.target.id, 1, 0);
          dropHorizontal(e.target.id, 1, 1);
          dropHorizontal(e.target.id, 1, -1);
          dropHorizontal(e.target.id, 1, 2);
          bannedAround(parseInt(e.target.id) - 20);
          e.target.appendChild(document.getElementById(dragShipType));
          e.target.previousSibling.appendChild(document.getElementById(dragShipType));
          e.target.nextSibling.appendChild(document.getElementById(dragShipType));
          e.target.nextSibling.nextSibling.appendChild(document.getElementById(dragShipType));

          break;
        } else {
          dropVertical(e.target.id, 1, 0);
          dropVertical(e.target.id, 1, 1);
          dropVertical(e.target.id, 1, -1);
          dropVertical(e.target.id, 1, 2);
          break;
        }
      }
      case "destroyer": {
        if (directionUserShips === "horizontal") {
          dropHorizontal(e.target.id, 2, 0);
          dropHorizontal(e.target.id, 2, 1);
          dropHorizontal(e.target.id, 2, -1);
          bannedAround(parseInt(e.target.id) - 20);
          e.target.appendChild(document.getElementById(dragShipType));
          e.target.previousSibling.appendChild(document.getElementById(dragShipType));
          e.target.nextSibling.appendChild(document.getElementById(dragShipType));

          break;
        } else {
          dropVertical(e.target.id, 2, 0);
          dropVertical(e.target.id, 2, 1);
          dropVertical(e.target.id, 2, -1);
          break;
        }
      }
      case "submarine": {
        if (directionUserShips === "horizontal") {
          dropHorizontal(e.target.id, 3, 0);
          dropHorizontal(e.target.id, 3, 1);
          dropHorizontal(e.target.id, 3, -1);
          bannedAround(parseInt(e.target.id) - 20);

          e.target.appendChild(document.getElementById(dragShipType));
          e.target.previousSibling.appendChild(document.getElementById(dragShipType));
          e.target.nextSibling.appendChild(document.getElementById(dragShipType));

          break;
        } else {
          dropVertical(e.target.id, 3, 0);
          dropVertical(e.target.id, 3, 1);
          dropVertical(e.target.id, 3, -1);
          break;
        }
      }
      case "patrolBoat": {
        if (directionUserShips === "horizontal") {
          dropHorizontal(e.target.id, 4, 0);
          dropHorizontal(e.target.id, 4, 1);
          e.target.appendChild(document.getElementById(dragShipType));
          e.target.nextSibling.appendChild(document.getElementById(dragShipType));

          break;
        } else {
          dropVertical(e.target.id, 4, 0);
          dropVertical(e.target.id, 4, 1);
          break;
        }
      }
      case deafult: {
      }
    }
  }

  dragShipType = "";
}
