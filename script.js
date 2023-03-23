let shipsPlayer = [
  { id: "1", length: 5, isSunk: false, hit: 0, coordinate: [] },
  { id: "2", length: 4, isSunk: false, hit: 0, coordinate: [] },
  { id: "3", length: 3, isSunk: false, hit: 0, coordinate: [] },
  { id: "4", length: 3, isSunk: false, hit: 0, coordinate: [] },
  { id: "5", length: 2, isSunk: false, hit: 0, coordinate: [] },
];

const shipsComputer = [
  { id: "1", length: 5, isSunk: false, hit: 0, coordinate: [] },
  { id: "2", length: 4, isSunk: false, hit: 0, coordinate: [] },
  { id: "3", length: 3, isSunk: false, hit: 0, coordinate: [] },
  { id: "4", length: 3, isSunk: false, hit: 0, coordinate: [] },
  { id: "5", length: 2, isSunk: false, hit: 0, coordinate: [] },
];
let gameBoardPlayer = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

let gameBoardComputer = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];
let firstColPlayerBoard = [200, 201, 202, 203, 204, 205, 206, 207, 208, 209];
let secondColPlayerBoard = [210, 211, 212, 213, 214, 215, 216, 217, 218, 219];
let lastColPlayerBoard = [290, 291, 292, 293, 294, 295, 296, 297, 298, 299];
let ninthColPlayerBoard = [280, 281, 282, 283, 284, 285, 286, 287, 288, 289];
let firstRowPlayerBoard = [200, 210, 220, 230, 240, 250, 260, 270, 280, 290];
let secondRowPlayerBoard = [201, 211, 221, 231, 241, 251, 261, 271, 281, 291];
let ninthRowPlayerBoard = [208, 218, 228, 238, 248, 258, 268, 278, 288, 289];
let lastRowPlayerBoard = [209, 219, 229, 239, 249, 259, 269, 279, 289, 299];

let cellsBannedForComp = [];
let cellsBannedForPlayerHor = {
  arounds: [],
  carrier: [...firstColPlayerBoard, ...secondColPlayerBoard, ...lastColPlayerBoard, ...ninthColPlayerBoard],
  battleship: [...firstColPlayerBoard, ...ninthColPlayerBoard, ...lastColPlayerBoard],
  destroyer: [...firstColPlayerBoard, ...lastColPlayerBoard],
  submarine: [...firstColPlayerBoard, ...lastColPlayerBoard],
  patrolBoat: [...lastColPlayerBoard],
};

let cellsBannedForPlayerVer = {
  arounds: [],
  carrier: [...firstRowPlayerBoard, ...secondRowPlayerBoard, ...ninthRowPlayerBoard, ...lastRowPlayerBoard],
  battleship: [...firstRowPlayerBoard, ...ninthRowPlayerBoard, ...lastRowPlayerBoard],
  destroyer: [...firstRowPlayerBoard, ...lastRowPlayerBoard],
  sumbarine: [...firstRowPlayerBoard, ...lastRowPlayerBoard],
  patrolBoat: [...lastRowPlayerBoard],
};
let cellsBannedForCreatingShips = [];
let dragShipType;
let directionUserShips = "horizontal";
tableCreate(1);
tableCreate(2);
createAllShips();

function rotate() {
  if (directionUserShips === "horizontal") {
    directionUserShips = "vertical";
  } else {
    directionUserShips = "horizontal";
  }
}
const cellsUser = document.getElementsByTagName("td");
for (let i = 0; i < cellsUser.length / 2; i++) {
  cellsUser[i].addEventListener("click", function () {
    attackPlayer(event);
  });
}

const cellsComputer = document.getElementsByTagName("td");
for (let i = 0; i < cellsComputer.length; i++) {
  cellsComputer[i].addEventListener("dragenter", dragOverHandler);
  cellsComputer[i].addEventListener("dragleave", dragLeaveHandler);
}

window.addEventListener("DOMContentLoaded", () => {
  let element = document.querySelectorAll("div");
  element.forEach((el) => {
    el.addEventListener("dragstart", dragstart_handler);
  });
});

function tableCreate(user) {
  let tbl = document.createElement("table");
  let firstRow = tbl.insertRow(0);
  firstRow.insertCell(0).outerHTML = "<th></th><th>A</th> <th>B</th> <th>C</th> <th>D</th> <th>E</th> <th>F</th>  <th>G</th>  <th>H</th> <th>I</th> <th>J</th>";
  for (let i = 0; i < 10; i++) {
    const tr = tbl.insertRow();
    let firstCol = tr.insertCell();
    firstCol.outerHTML = i + 1;
    for (let j = 0; j < 10; j++) {
      const td = tr.insertCell();
      td.id = user + j.toString() + i.toString();
      td.style.border = "1px solid black";
      td.style.width = "40px";
      td.style.height = "40px";
      if (user === 1) {
        td.setAttribute("attack", "attackPlayer(event)");
      } else if (user === 2) {
        td.classList.add("dropzone");
        td.setAttribute("ondrop", "drop_handler(event)");
        td.setAttribute("ondragover", "dragOverHandler(event)");
      }
    }
  }
  let el = document.getElementById("board_container");
  let headerForBoard = document.createElement("h4");
  let listWithHits = document.createElement("p");
  let documentFragment = document.createDocumentFragment();
  container_board = document.createElement("div");
  listWithHits.innerHTML = "Hits:";
  carrier = document.createElement("p");
  carrier.id = "carrier_num" + user;

  battleship = document.createElement("p");
  battleship.id = "battleship_num" + user;

  destroyer = document.createElement("p");
  destroyer.id = "destroyer_num" + user;

  submarine = document.createElement("p");
  submarine.id = "submarine_num" + user;

  patrolboat = document.createElement("p");
  patrolboat.id = "patrolboat_num" + user;

  if (user === 1) {
    headerForBoard.innerHTML = "Computer Board";
    carrier.innerHTML = "Carrier: " + shipsComputer[0].hit;
    battleship.innerHTML = "BattleShip: " + shipsComputer[1].hit;
    destroyer.innerHTML = "Destroyer: " + shipsComputer[2].hit;
    submarine.innerHTML = "Submarine: " + shipsComputer[3].hit;
    patrolboat.innerHTML = "PatrolBoat: " + shipsComputer[4].hit;
  } else {
    headerForBoard.innerHTML = "Player Board";
    carrier.innerHTML = "Carrier: " + shipsPlayer[0].hit;
    battleship.innerHTML = "BattleShip: " + shipsPlayer[1].hit;
    destroyer.innerHTML = "Destroyer: " + shipsPlayer[2].hit;
    submarine.innerHTML = "Submarine: " + shipsPlayer[3].hit;
    patrolboat.innerHTML = "PatrolBoat: " + shipsPlayer[4].hit;
  }

  container_board.appendChild(headerForBoard);
  container_board.appendChild(tbl);
  container_board.appendChild(listWithHits);
  container_board.appendChild(carrier);
  container_board.appendChild(battleship);
  container_board.appendChild(destroyer);
  container_board.appendChild(submarine);
  container_board.appendChild(patrolboat);

  documentFragment.appendChild(container_board);
  el.appendChild(documentFragment);
}

function generateFirstCordinateAndDirection(ship) {
  let direction = Math.ceil(Math.random() * 2);
  switch (ship.length) {
    case 5: {
      numberRow = Math.ceil(5 * Math.random()).toString();
      numberCol = Math.ceil(5 * Math.random()).toString();
      break;
    }
    case 4: {
      numberRow = Math.ceil(6 * Math.random()).toString();
      numberCol = Math.ceil(6 * Math.random()).toString();
      break;
    }
    case 3: {
      numberRow = Math.ceil(7 * Math.random()).toString();
      numberCol = Math.ceil(7 * Math.random()).toString();
      break;
    }
    case 2: {
      numberRow = Math.ceil(8 * Math.random()).toString();
      numberCol = Math.ceil(8 * Math.random()).toString();
      break;
    }
  }

  let coordinate = 1 + numberRow + numberCol;
  return [direction, coordinate];
}

function createShip(ship, startCoordinate, direction) {
  testArray = [parseInt(startCoordinate)];
  coordinate = parseInt(startCoordinate);
  for (i = 0; i < ship.length - 1; i++) {
    if (direction === 1) {
      coordinate++;
      testArray.push(coordinate);
    } else {
      coordinate = coordinate + 10;
      testArray.push(coordinate);
    }
  }
  return testArray;
}
function mapToGameBoard(testArray) {
  testArray.map((coordinate) => {
    let coordinateBefore = parseInt(coordinate) - 1;
    let coordinateNext = coordinate + 1;
    let coordinateRight = parseInt(coordinate) + 10;
    let coordinateLeft = parseInt(coordinate) - 10;
    cellsBannedForComp.push(coordinateBefore, coordinateNext, coordinateRight, coordinateLeft);
    let row = Math.floor(coordinate / 10) - 10;
    let col = coordinate % 10;
    cellsBannedForComp.push(coordinate);
    gameBoardComputer[row][col] = 1;
    el = document.getElementById(coordinate);
    // el.innerHTML = "X";
  });
}

function createAllShips() {
  shipsComputer.map((ship) => {
    if (cellsBannedForComp.length === 0) {
      [direction, coordinate] = generateFirstCordinateAndDirection(ship);
      testArray = createShip(ship, coordinate, direction);
      ship.coordinate = testArray;
      mapToGameBoard(testArray);
    } else {
      do {
        [direction, coordinate] = generateFirstCordinateAndDirection(ship);
        testArray = createShip(ship, coordinate, direction);
      } while (!check(testArray, cellsBannedForComp));
      ship.coordinate = testArray;
      mapToGameBoard(testArray);
    }
  });
}
function check(testArray, banned) {
  let test = [];
  for (i = 0; i < testArray.length; i++) {
    test.push(banned.includes(testArray[i]));
  }
  if (test.includes(true)) {
    return false;
  } else {
    return true;
  }
}

function isSunk() {
  shipsComputer.map((ship) => {
    if (ship.hit === ship.length) {
      ship.isSunk = true;
    }
  });
  shipsPlayer.map((ship) => {
    if (ship.hit === ship.length) {
      ship.isSunk = true;
    }
  });
}
function attackComputer() {
  let coordinate = parseInt(200 + Math.floor(100 * Math.random()));
  el = document.getElementById(coordinate);

  if (cellsBannedForCreatingShips.length === 0) {
    if (
      shipsPlayer.some((ship) => {
        return ship.coordinate.includes(coordinate);
      })
    ) {
      shipsPlayer.map((ship) => {
        if (ship.coordinate.includes(coordinate)) {
          ship.hit++;
          cellsBannedForCreatingShips.push(coordinate);
          el.innerHTML = "S";
          isSunk();
          win();
        }
      });
    } else {
      cellsBannedForCreatingShips.push(coordinate);
      el.innerHTML = "X";
    }
  } else if (cellsBannedForCreatingShips.includes(coordinate)) {
    coordinate = parseInt(200 + Math.floor(100 * Math.random()));
    attackComputer();
  } else {
    if (
      shipsPlayer.some((ship) => {
        return ship.coordinate.includes(coordinate);
      })
    ) {
      shipsPlayer.map((ship) => {
        if (ship.coordinate.includes(coordinate)) {
          ship.hit++;
          el.innerHTML = "S";
          cellsBannedForCreatingShips.push(coordinate);

          isSunk();
          win();
        }
      });
    } else {
      cellsBannedForCreatingShips.push(coordinate);
      el.innerHTML = "X";
    }
  }
}

function attackPlayer(e) {
  carrier_num1 = document.getElementById("carrier_num1");
  carrier_num1.innerHTML = "Carrier: " + shipsComputer[0].hit;

  battleship_num1 = document.getElementById("battleship_num1");
  battleship_num1.innerHTML = "Battleship: " + shipsComputer[1].hit;

  destroyer_num1 = document.getElementById("destroyer_num1");
  destroyer_num1.innerHTML = "Destroyer: " + shipsComputer[2].hit;

  submarine_num1 = document.getElementById("submarine_num1");
  submarine_num1.innerHTML = "Submarine: " + shipsComputer[3].hit;

  patrolboat_num1 = document.getElementById("patrolboat_num1");
  patrolboat_num1.innerHTML = "PatrolBoat: " + shipsComputer[4].hit;

  carrier_num2 = document.getElementById("carrier_num2");
  carrier_num2.innerHTML = "Carrier: " + shipsPlayer[0].hit;

  battleship_num2 = document.getElementById("battleship_num2");
  battleship_num2.innerHTML = "Battleship: " + shipsPlayer[1].hit;

  destroyer_num2 = document.getElementById("destroyer_num2");
  destroyer_num2.innerHTML = "Destroyer: " + shipsPlayer[2].hit;

  submarine_num2 = document.getElementById("submarine_num2");
  submarine_num2.innerHTML = "Submarine: " + shipsPlayer[3].hit;

  patrolboat_num2 = document.getElementById("patrolboat_num2");
  patrolboat_num2.innerHTML = "PatrolBoat: " + shipsPlayer[4].hit;

  var row = e.target.id.substring(1, 2);
  var col = e.target.id.substring(2, 3);
  let clickCoordinate = parseInt(e.target.id);

  if (
    shipsComputer.some((ship) => {
      return ship.coordinate.includes(clickCoordinate);
    })
  ) {
    shipsComputer.map((ship) => {
      if (ship.coordinate.includes(clickCoordinate)) {
        ship.hit++;
        isSunk();
        win();
      }
    });
    position = document.getElementById(clickCoordinate);
    position.innerHTML = "S";
    isSunk();
    win();
  } else {
    position = document.getElementById(clickCoordinate);
    position.innerHTML = "X";
  }
  attackComputer();
}

function win() {
  if (
    shipsComputer.every((ship) => {
      return ship.isSunk;
    })
  ) {
    alert("you win");
  } else if (
    shipsPlayer.every((ship) => {
      return ship.isSunk;
    })
  ) {
    alert("comp win");
  }
}

function checkIfIsInBanned(bannedType, targetId) {
  targetId = parseInt(targetId);

  if (directionUserShips === "horizontal") {
    return !cellsBannedForPlayerHor[bannedType].includes(targetId);
  } else if (directionUserShips === "vertical") {
    return !cellsBannedForPlayerVer[bannedType].includes(targetId);
  }
}

function bannedAround(target) {
  target = parseInt(target);
  let target1 = target + 1;
  let target2 = target - 1;
  let target3 = target + 10;
  let target4 = target - 10;
  cellsBannedForPlayerHor.arounds.push(target, target1, target2, target3, target4);
  cellsBannedForPlayerVer.arounds.push(target, target1, target2, target3, target4);
}

function dragstart_handler(e) {
  e.dataTransfer.dropEffect = "move";
  e.dataTransfer.setData("text/plain", e.target.id);
  dragShipType = e.target.id;
}
