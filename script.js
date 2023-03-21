const shipsPlayer = [
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

let dragShipType;

function tableCreate(user) {
  const body = document.body,
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
      td.setAttribute("attack", "attackPlayer(event)");

      td.style.border = "1px solid black";
      td.style.width = "20px";
      td.style.height = "20px";
      td.style.border = "solid";
      td.classList.add("dropzone");
    }
    el = document.getElementById("board_container");
    el.appendChild(tblUser);
  }
}
tableCreate(1);
tableCreate(2);

function generateFirstCordinateAndDirection() {
  numberR = Math.ceil(5 * Math.random()).toString();
  numberC = Math.ceil(5 * Math.random()).toString();
  coordinate = 1 + numberR + numberC;
  direction = Math.ceil(Math.random() * 2);
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
banned = [];
function mapToGameBoard(testArray, direction) {
  testArray.map((array) => {
    elBefore = parseInt(array) - 1;
    elNext = array + 1;
    elRight = parseInt(array) + 10;
    elLeft = parseInt(array) - 10;
    banned.push(elBefore, elNext, elRight, elLeft);
    let row = Math.floor(array / 10) - 10;
    let col = array % 10;
    banned.push(array);
    gameBoardComputer[row][col] = 1;
    el = document.getElementById(array);
    // el.innerHTML = "X";
  });
}

function createAllShips() {
  shipsComputer.map((ship) => {
    //rysuje pierwszego
    if (banned.length === 0) {
      [direction, coordinate] = generateFirstCordinateAndDirection();
      testArray = createShip(ship, coordinate, direction);
      ship.coordinate = testArray;
      mapToGameBoard(testArray, direction);
    } else {
      do {
        //losuj liczbe startową i twórz statki tak długo
        [direction, coordinate] = generateFirstCordinateAndDirection();
        testArray = createShip(ship, coordinate, direction);
        //dopoki checkTestArray zwroci FALSE (czyli ze nie zawiera)
      } while (!check(testArray));
      // i jak zwroci te False to wtedy wpisz do coordinate
      if (check(testArray)) {
        ship.coordinate = testArray;
        mapToGameBoard(testArray, direction);
      }
    }
  });
}
createAllShips();
function check(testArray) {
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
} //zmienia wartość isSunk danego statku
const cells = document.querySelectorAll("td");
for (var i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", function () {
    attackPlayer(event);
  });
}

function attackComputer() {
  let coordinate = 200 + Math.floor(100 * Math.random());
  el = document.getElementById(coordinate);
  if (
    shipsPlayer.some((ship) => {
      return ship.coordinate.includes(coordinate);
    })
  ) {
    shipsPlayer.map((ship) => {
      if (ship.coordinate.includes(coordinate)) {
        ship.hit++;
        win();
        el.innerHTML = "S";
      }
    });
  } else {
    console.log("else");
    coordinate = 200 + Math.floor(100 * Math.random());
    el.innerHTML = "X";
  }
}

function attackPlayer(e) {
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
  if (shipsComputer.every((ship) => ship.isSunk)) {
    alert("you win");
  }
  console.log(shipsComputer);
  console.log(shipsPlayer);
}

function dragOverHandler(e) {
  if (e.target.classList.contains("dropzone")) {
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

function dragLeaveHandler(event) {
  switch (dragShipType) {
    case "carrier": {
      event.target.classList.remove("dragover");
      event.target.previousSibling.classList.remove("dragover");
      event.target.previousSibling.previousSibling.classList.remove("dragover");
      event.target.nextSibling.classList.remove("dragover");
      event.target.nextSibling.nextSibling.classList.remove("dragover");
    }
    case "battleship": {
      event.target.classList.remove("dragover");
      event.target.previousSibling.classList.remove("dragover");
      event.target.nextSibling.classList.remove("dragover");
      event.target.nextSibling.nextSibling.classList.remove("dragover");
    }
    case "destroyer": {
      event.target.classList.remove("dragover");
      event.target.previousSibling.classList.remove("dragover");
      event.target.nextSibling.classList.add("dragover");
    }
    case "submarine": {
      event.target.classList.remove("dragover");
      event.target.previousSibling.classList.remove("dragover");
      event.target.nextSibling.classList.remove("dragover");
    }
    case "patrolBoat": {
      event.target.classList.remove("dragover");
      event.target.nextSibling.classList.remove("dragover");
    }
  }
}

let squares = document.getElementsByTagName("td");
for (i = 0; i < squares.length; i++) {
  squares[i].addEventListener("dragenter", dragOverHandler);
  squares[i].addEventListener("dragleave", dragLeaveHandler);
}

function dragover_handler(ev) {
  ev.preventDefault();
  ev.dataTransfer.dropEffect = "move";
}

function addColor() {
  const d = document.getElementsByClassName("dropzone dragover");
  for (let i = 0; i < d.length; i++) {
    d[i].classList.add("color");
  }
}

function dragstart_handler(ev) {
  // Add the target element's id to the data transfer object
  ev.dataTransfer.setData("text/plain", ev.target.id);
  ev.dataTransfer.dropEffect = "move";
  dragShipType = ev.target.id;
}
function drop_handler(ev) {
  ev.preventDefault();
  dragShipType = ev.dataTransfer.getData("text/plain");
  var row = parseInt(ev.target.id.substring(2, 3));
  var col = parseInt(ev.target.id.substring(1, 2));

  switch (dragShipType) {
    case "carrier": {
      //wstawienie jedynek do gameBoardu
      gameBoardPlayer[row][col + 1] = 1;
      gameBoardPlayer[row][col - 1] = 1;
      gameBoardPlayer[row][col + 2] = 1;
      gameBoardPlayer[row][col - 2] = 1;
      gameBoardPlayer[row][col] = 1;
      coordinate = parseInt(ev.target.id);
      shipsPlayer[0].coordinate.push(coordinate - 20);
      shipsPlayer[0].coordinate.push(coordinate - 10);
      shipsPlayer[0].coordinate.push(coordinate);
      shipsPlayer[0].coordinate.push(coordinate + 10);
      shipsPlayer[0].coordinate.push(coordinate + 20);

      addColor();
      ev.target.appendChild(document.getElementById(dragShipType).cloneNode(true));
      ev.target.previousSibling.previousSibling.appendChild(document.getElementById(dragShipType).cloneNode(true));
      ev.target.nextSibling.nextSibling.appendChild(document.getElementById(dragShipType).cloneNode(true));
      break;
    }
    case "battleship": {
      gameBoardPlayer[row][col + 1] = 1;
      gameBoardPlayer[row][col - 1] = 1;
      gameBoardPlayer[row][col + 2] = 1;
      gameBoardPlayer[row][col] = 1;
      coordinate = parseInt(ev.target.id);
      shipsPlayer[1].coordinate.push(coordinate - 10);
      shipsPlayer[1].coordinate.push(coordinate);
      shipsPlayer[1].coordinate.push(coordinate + 10);
      shipsPlayer[1].coordinate.push(coordinate + 20);
      addColor();
      ev.target.appendChild(document.getElementById(dragShipType).cloneNode(true));
      ev.target.previousSibling.appendChild(document.getElementById(dragShipType).cloneNode(true));
      ev.target.nextSibling.appendChild(document.getElementById(dragShipType).cloneNode(true));
      ev.target.nextSibling.nextSibling.appendChild(document.getElementById(dragShipType).cloneNode(true));

      break;
    }
    case "destroyer": {
      gameBoardPlayer[row][col + 1] = 1;
      gameBoardPlayer[row][col - 1] = 1;
      gameBoardPlayer[row][col] = 1;
      coordinate = parseInt(ev.target.id);
      shipsPlayer[2].coordinate.push(coordinate - 10);
      shipsPlayer[2].coordinate.push(coordinate);
      shipsPlayer[2].coordinate.push(coordinate + 10);

      addColor();
      ev.target.appendChild(document.getElementById(dragShipType).cloneNode(true));
      ev.target.previousSibling.appendChild(document.getElementById(dragShipType).cloneNode(true));
      ev.target.nextSibling.appendChild(document.getElementById(dragShipType).cloneNode(true));
      break;
    }
    case "submarine": {
      gameBoardPlayer[row][col + 1] = 1;
      gameBoardPlayer[row][col - 1] = 1;
      gameBoardPlayer[row][col] = 1;
      coordinate = parseInt(ev.target.id);
      shipsPlayer[3].coordinate.push(coordinate - 10);
      shipsPlayer[3].coordinate.push(coordinate);
      shipsPlayer[3].coordinate.push(coordinate + 10);

      addColor();
      ev.target.appendChild(document.getElementById(dragShipType).cloneNode(true));
      ev.target.previousSibling.appendChild(document.getElementById(dragShipType).cloneNode(true));
      ev.target.nextSibling.appendChild(document.getElementById(dragShipType).cloneNode(true));
      break;
    }
    case "patrolBoat": {
      gameBoardPlayer[row][col + 1] = 1;
      gameBoardPlayer[row][col] = 1;
      coordinate = parseInt(ev.target.id);
      shipsPlayer[4].coordinate.push(coordinate);
      shipsPlayer[4].coordinate.push(coordinate + 10);

      addColor();
      ev.target.appendChild(document.getElementById(dragShipType).cloneNode(true));
      ev.target.nextSibling.appendChild(document.getElementById(dragShipType).cloneNode(true));
      break;
    }
    case deafult: {
    }
  }
  dragShipType = "";
  console.log(shipsPlayer);
}

//pobieranie ruszonego statku i dawanie mu listenera na dragdrop
window.addEventListener("DOMContentLoaded", () => {
  let element = document.querySelectorAll("div");
  element.forEach((el) => {
    el.addEventListener("dragstart", dragstart_handler);
  });
});
console.log(shipsComputer);
