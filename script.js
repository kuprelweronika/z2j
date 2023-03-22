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

let bannedComp = [];
let bannedPlayer = {
  arounds: [],
  carrier: [200, 210, 201, 211, 202, 212, 203, 213, 204, 214, 205, 215, 206, 216, 207, 217, 208, 218, 209, 219, 280, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 281, 282, 283, 284, 285, 286, 287, 288, 289],
  battleship: [281, 282, 280, 283, 284, 285, 286, 287, 288, 289, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299],
  destroyer: [200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299],
  submarine: [200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299],
  patrolBoat: [290, 291, 292, 293, 294, 295, 296, 297, 298, 299],
};
banned = [];
let dragShipType;
let correctGenerate = false;
tableCreate(1);
tableCreate(2);
createAllShips();
checkProper();
function checkProper() {
  if (shipsComputer[0].coordinate.length !== 5 || shipsComputer[1].coordinate.length !== 4 || shipsComputer[2].coordinate.length !== 3 || shipsComputer[3].coordinate.length !== 3 || shipsComputer[4].coordinate.length !== 2) {
    banned = [];
    createAllShips();
  } else {
    correctGenerate = true;
  }
}

if (correctGenerate) {
  el = document.getElementById("check");
  el.innerHTML = "Sukces";
  el.style.color = "green";
} else {
  el = document.getElementById("check");
  el.innerHTML = "Wymaga odświeżenia";
  el.style.color = "red";
}
const cells = document.getElementsByTagName("td");
for (var i = 0; i < cells.length / 2; i++) {
  cells[i].addEventListener("click", function () {
    attackPlayer(event);
  });
}

const squares = document.getElementsByTagName("td");
for (i = 0; i < squares.length; i++) {
  squares[i].addEventListener("dragenter", dragOverHandler);
  squares[i].addEventListener("dragleave", dragLeaveHandler);
}

//pobieranie ruszonego statku i dawanie mu listenera na dragdrop
window.addEventListener("DOMContentLoaded", () => {
  let element = document.querySelectorAll("div");
  element.forEach((el) => {
    el.addEventListener("dragstart", dragstart_handler);
  });
});

function tableCreate(user) {
  tblUser = document.createElement("table");
  var row = tblUser.insertRow(0);
  row.insertCell(0).outerHTML = "<th></th><th>A</th> <th>B</th> <th>C</th> <th>D</th> <th>E</th> <th>F</th>  <th>G</th>  <th>H</th> <th>I</th> <th>J</th>";
  for (let i = 0; i < 10; i++) {
    const tr = tblUser.insertRow();
    first = tr.insertCell();
    first.outerHTML = i + 1;
    for (let j = 0; j < 10; j++) {
      const td = tr.insertCell();
      td.id = user + j.toString() + i.toString();
      td.setAttribute("ondrop", "drop_handler(event)");
      td.setAttribute("ondragover", "dragover_handler(event)");
      if (user === 1) {
        td.setAttribute("attack", "attackPlayer(event)");
      }
      td.style.border = "1px solid black";
      td.style.width = "40px";
      td.style.height = "40px";
      if (user === 2) {
        td.classList.add("dropzone");
      }
    }
  }
  el = document.getElementById("board_container");
  header = document.createElement("h4");
  footer = document.createElement("p");
  let documentFragment = document.createDocumentFragment();
  container_board = document.createElement("div");
  footer.innerHTML = "Hits:";
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
    header.innerHTML = "Computer Board";
    carrier.innerHTML = "Carrier: " + shipsComputer[0].hit;
    battleship.innerHTML = "BattleShip: " + shipsComputer[1].hit;
    destroyer.innerHTML = "Destroyer: " + shipsComputer[2].hit;
    submarine.innerHTML = "Submarine: " + shipsComputer[3].hit;
    patrolboat.innerHTML = "PatrolBoat: " + shipsComputer[4].hit;
  } else {
    header.innerHTML = "Player Board";
    carrier.innerHTML = "Carrier: " + shipsPlayer[0].hit;
    battleship.innerHTML = "BattleShip: " + shipsPlayer[1].hit;
    destroyer.innerHTML = "Destroyer: " + shipsPlayer[2].hit;
    submarine.innerHTML = "Submarine: " + shipsPlayer[3].hit;
    patrolboat.innerHTML = "PatrolBoat: " + shipsPlayer[4].hit;
  }

  container_board.appendChild(header);
  container_board.appendChild(tblUser);
  container_board.appendChild(footer);
  container_board.appendChild(carrier);
  container_board.appendChild(battleship);
  container_board.appendChild(destroyer);
  container_board.appendChild(submarine);
  container_board.appendChild(patrolboat);

  documentFragment.appendChild(container_board);
  el.appendChild(documentFragment);
}

function generateFirstCordinateAndDirection(ship) {
  direction = Math.ceil(Math.random() * 2);
  switch (ship.length) {
    case 5: {
      numberR = Math.ceil(5 * Math.random()).toString();
      numberC = Math.ceil(5 * Math.random()).toString();
      break;
    }
    case 4: {
      numberR = Math.ceil(6 * Math.random()).toString();
      numberC = Math.ceil(6 * Math.random()).toString();
      break;
    }
    case 3: {
      numberR = Math.ceil(7 * Math.random()).toString();
      numberC = Math.ceil(7 * Math.random()).toString();
      break;
    }
    case 2: {
      numberR = Math.ceil(8 * Math.random()).toString();
      numberC = Math.ceil(8 * Math.random()).toString();
      break;
    }
  }

  coordinate = 1 + numberR + numberC;
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
function mapToGameBoard(testArray, direction) {
  testArray.map((array) => {
    elBefore = parseInt(array) - 1;
    elNext = array + 1;
    elRight = parseInt(array) + 10;
    elLeft = parseInt(array) - 10;
    bannedComp.push(elBefore, elNext, elRight, elLeft);
    let row = Math.floor(array / 10) - 10;
    let col = array % 10;
    bannedComp.push(array);
    gameBoardComputer[row][col] = 1;
    el = document.getElementById(array);
    el.innerHTML = "X";
  });
}

function createAllShips() {
  shipsComputer.map((ship) => {
    //rysuje pierwszego
    if (bannedComp.length === 0) {
      [direction, coordinate] = generateFirstCordinateAndDirection(ship);
      testArray = createShip(ship, coordinate, direction);
      ship.coordinate = testArray;
      mapToGameBoard(testArray, direction);
    } else {
      let testNo = 0;
      let maxTries = 100;
      do {
        testNo++;
        [direction, coordinate] = generateFirstCordinateAndDirection(ship);
        testArray = createShip(ship, coordinate, direction);
        //dopoki checkTestArray zwroci FALSE (czyli ze nie zawiera)
      } while (!check(testArray, bannedComp) && testNo < maxTries);

      // i jak zwroci te False to wtedy wpisz do coordinate
      if (check(testArray, bannedComp)) {
        ship.coordinate = testArray;
        mapToGameBoard(testArray, direction);
      }
    }
  });
  banned = [];
}
function check(testArray, banned) {
  test = [];
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

  if (banned.length === 0) {
    if (
      shipsPlayer.some((ship) => {
        return ship.coordinate.includes(coordinate);
      })
    ) {
      shipsPlayer.map((ship) => {
        if (ship.coordinate.includes(coordinate)) {
          ship.hit++;
          banned.push(coordinate);
          el.innerHTML = "S";
          isSunk();
          win();
        }
      });
    } else {
      banned.push(coordinate);
      el.innerHTML = "X";
    }
  } else if (banned.includes(coordinate)) {
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
          banned.push(coordinate);

          isSunk();
          win();
        }
      });
    } else {
      banned.push(coordinate);
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

function checkBanned(bannedType, targetId) {
  targetId = parseInt(targetId);
  return !bannedPlayer[bannedType].includes(targetId);
}

function bannedAround(target) {
  target = parseInt(target);
  let target1 = target + 1;
  let target2 = target - 1;
  let target3 = target + 10;
  let target4 = target - 10;
  bannedPlayer.arounds.push(target, target1, target2, target3, target4);
}

function dragOverHandler(e) {
  e.dataTransfer.dropEffect = "move";

  data = bannedPlayer;
  if (e.target.classList.contains("dropzone")) {
    if (checkBanned(dragShipType, e.target.id) && checkBanned("arounds", e.target.id)) {
      switch (dragShipType) {
        case "carrier": {
          e.target.classList.add("dragover");
          e.target.previousSibling.classList.add("dragover");
          e.target.previousSibling.previousSibling.classList.add("dragover");
          e.target.nextSibling.classList.add("dragover");
          e.target.nextSibling.nextSibling.classList.add("dragover");
          break;
        }
        case "battleship": {
          e.target.classList.add("dragover");
          e.target.previousSibling.classList.add("dragover");
          e.target.nextSibling.classList.add("dragover");
          e.target.nextSibling.nextSibling.classList.add("dragover");
          break;
        }
        case "destroyer": {
          e.target.classList.add("dragover");
          e.target.previousSibling.classList.add("dragover");
          e.target.nextSibling.classList.add("dragover");
          break;
        }
        case "submarine": {
          e.target.classList.add("dragover");
          e.target.previousSibling.classList.add("dragover");
          e.target.nextSibling.classList.add("dragover");
          break;
        }
        case "patrolBoat": {
          e.target.classList.add("dragover");
          e.target.nextSibling.classList.add("dragover");
          break;
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

  if (checkBanned(dragShipType, e.target.id) && checkBanned("arounds", e.target.id)) {
    switch (dragShipType) {
      case "carrier": {
        e.target.classList.remove("dragover");
        e.target.previousSibling.classList.remove("dragover");
        e.target.previousSibling.previousSibling.classList.remove("dragover");
        e.target.nextSibling.classList.remove("dragover");
        e.target.nextSibling.nextSibling.classList.remove("dragover");
      }
      case "battleship": {
        e.target.classList.remove("dragover");
        e.target.previousSibling.classList.remove("dragover");
        e.target.nextSibling.classList.remove("dragover");
        e.target.nextSibling.nextSibling.classList.remove("dragover");
      }
      case "destroyer": {
        e.target.classList.remove("dragover");
        e.target.previousSibling.classList.remove("dragover");
        e.target.nextSibling.classList.add("dragover");
      }
      case "submarine": {
        e.target.classList.remove("dragover");
        e.target.previousSibling.classList.remove("dragover");
        e.target.nextSibling.classList.remove("dragover");
      }
      case "patrolBoat": {
        e.target.classList.remove("dragover");
        e.target.nextSibling.classList.remove("dragover");
      }
    }
  }
}

function dragover_handler(e) {
  e.dataTransfer.dropEffect = "move";

  e.preventDefault();
}

function addColor() {
  const d = document.getElementsByClassName("dropzone dragover");
  for (let i = 0; i < d.length; i++) {
    d[i].classList.add("color");
  }
}

function dragstart_handler(e) {
  // Add the target element's id to the data transfer object
  e.dataTransfer.effectAllowed = "move";

  e.dataTransfer.dropEffect = "move";

  e.dataTransfer.setData("text/plain", e.target.id);
  dragShipType = e.target.id;
}
function drop_handler(e) {
  e.preventDefault();
  e.dataTransfer.effectAllowed = "move";

  e.dataTransfer.dropEffect = "move";

  dragShipType = e.dataTransfer.getData("text/plain");
  var row = parseInt(e.target.id.substring(2, 3));
  var col = parseInt(e.target.id.substring(1, 2));
  if (checkBanned(dragShipType, e.target.id) && checkBanned("arounds", e.target.id)) {
    switch (dragShipType) {
      case "carrier": {
        //wstawienie jedynek do gameBoardu
        gameBoardPlayer[row][col + 1] = 1;
        gameBoardPlayer[row][col - 1] = 1;
        gameBoardPlayer[row][col + 2] = 1;
        gameBoardPlayer[row][col - 2] = 1;
        gameBoardPlayer[row][col] = 1;
        coordinate = parseInt(e.target.id);
        shipsPlayer[0].coordinate.push(coordinate - 20);
        shipsPlayer[0].coordinate.push(coordinate - 10);
        shipsPlayer[0].coordinate.push(coordinate);
        shipsPlayer[0].coordinate.push(coordinate + 10);
        shipsPlayer[0].coordinate.push(coordinate + 20);

        bannedAround(parseInt(e.target.id));
        bannedAround(parseInt(e.target.id) + 10);
        bannedAround(parseInt(e.target.id) - 10);
        bannedAround(parseInt(e.target.id) + 20);
        bannedAround(parseInt(e.target.id) - 20);
        bannedAround(parseInt(e.target.id) - 30);

        addColor();
        e.target.appendChild(document.getElementById(dragShipType).cloneNode(true));
        e.target.previousSibling.appendChild(document.getElementById(dragShipType).cloneNode(true));
        e.target.nextSibling.appendChild(document.getElementById(dragShipType).cloneNode(true));
        e.target.previousSibling.previousSibling.appendChild(document.getElementById(dragShipType).cloneNode(true));
        e.target.nextSibling.nextSibling.appendChild(document.getElementById(dragShipType).cloneNode(true));
        e.target.firstChild.id = "carrier_2";
        e.target.previousSibling.firstChild.id = "carrier_2";
        e.target.previousSibling.previousSibling.firstChild.id = "carrier_2";
        e.target.nextSibling.firstChild.id = "carrier_2";
        e.target.nextSibling.nextSibling.firstChild.id = "carrier_2";

        ship = document.getElementById("carrier");
        ship.setAttribute("draggable", false);
        break;
      }
      case "battleship": {
        gameBoardPlayer[row][col + 1] = 1;
        gameBoardPlayer[row][col - 1] = 1;
        gameBoardPlayer[row][col + 2] = 1;
        gameBoardPlayer[row][col] = 1;
        coordinate = parseInt(e.target.id);
        shipsPlayer[1].coordinate.push(coordinate - 10);
        shipsPlayer[1].coordinate.push(coordinate);
        shipsPlayer[1].coordinate.push(coordinate + 10);
        shipsPlayer[1].coordinate.push(coordinate + 20);

        bannedAround(parseInt(e.target.id));
        bannedAround(parseInt(e.target.id) + 10);
        bannedAround(parseInt(e.target.id) - 10);
        bannedAround(parseInt(e.target.id) + 20);
        bannedAround(parseInt(e.target.id) - 20);

        addColor();
        e.target.appendChild(document.getElementById(dragShipType).cloneNode(true));
        e.target.previousSibling.appendChild(document.getElementById(dragShipType).cloneNode(true));
        e.target.nextSibling.appendChild(document.getElementById(dragShipType).cloneNode(true));
        e.target.nextSibling.nextSibling.appendChild(document.getElementById(dragShipType).cloneNode(true));

        e.target.firstChild.id = "battleship_2";
        e.target.previousSibling.firstChild.id = "battleship_2";
        e.target.nextSibling.firstChild.id = "battleship_2";
        e.target.nextSibling.nextSibling.firstChild.id = "battleship_2";

        ship = document.getElementById("battleship");
        ship.setAttribute("draggable", false);

        break;
      }
      case "destroyer": {
        gameBoardPlayer[row][col + 1] = 1;
        gameBoardPlayer[row][col - 1] = 1;
        gameBoardPlayer[row][col] = 1;
        coordinate = parseInt(e.target.id);
        shipsPlayer[2].coordinate.push(coordinate - 10);
        shipsPlayer[2].coordinate.push(coordinate);
        shipsPlayer[2].coordinate.push(coordinate + 10);

        bannedAround(parseInt(e.target.id));
        bannedAround(parseInt(e.target.id) + 10);
        bannedAround(parseInt(e.target.id) - 10);
        bannedAround(parseInt(e.target.id) - 20);

        addColor();
        e.target.appendChild(document.getElementById(dragShipType).cloneNode(true));
        e.target.previousSibling.appendChild(document.getElementById(dragShipType).cloneNode(true));
        e.target.nextSibling.appendChild(document.getElementById(dragShipType).cloneNode(true));
        e.target.firstChild.id = "destroyer_2";
        e.target.previousSibling.firstChild.id = "destroyer_2";
        e.target.nextSibling.firstChild.id = "destroyer_2";

        ship = document.getElementById("destroyer");
        ship.setAttribute("draggable", false);

        break;
      }
      case "submarine": {
        gameBoardPlayer[row][col + 1] = 1;
        gameBoardPlayer[row][col - 1] = 1;
        gameBoardPlayer[row][col] = 1;
        coordinate = parseInt(e.target.id);
        shipsPlayer[3].coordinate.push(coordinate - 10);
        shipsPlayer[3].coordinate.push(coordinate);
        shipsPlayer[3].coordinate.push(coordinate + 10);
        bannedAround(parseInt(e.target.id));
        bannedAround(parseInt(e.target.id) + 10);
        bannedAround(parseInt(e.target.id) - 10);

        addColor();
        e.target.appendChild(document.getElementById(dragShipType).cloneNode(true));
        e.target.previousSibling.appendChild(document.getElementById(dragShipType).cloneNode(true));
        e.target.nextSibling.appendChild(document.getElementById(dragShipType).cloneNode(true));

        e.target.firstChild.id = "subamrine_2";
        e.target.previousSibling.firstChild.id = "submarine_2";
        e.target.nextSibling.firstChild.id = "submarine_2";

        ship = document.getElementById("submarine");
        ship.setAttribute("draggable", false);

        break;
      }
      case "patrolBoat": {
        gameBoardPlayer[row][col + 1] = 1;
        gameBoardPlayer[row][col] = 1;
        coordinate = parseInt(e.target.id);
        shipsPlayer[4].coordinate.push(coordinate);
        shipsPlayer[4].coordinate.push(coordinate + 10);

        bannedAround(parseInt(e.target.id) + 10);
        bannedAround(parseInt(e.target.id));

        addColor();
        e.target.appendChild(document.getElementById(dragShipType).cloneNode(true));
        e.target.nextSibling.appendChild(document.getElementById(dragShipType).cloneNode(true));
        e.target.firstChild.id = "patrolboat";
        e.target.nextSibling.firstChild.id = "patrolboat";

        ship = document.getElementById("patrolBoat");
        ship.setAttribute("draggable", false);

        break;
      }
      case deafult: {
      }
    }
  }

  dragShipType = "";
}
