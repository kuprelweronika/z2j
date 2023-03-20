const ships = [
  { id: "1", length: 5, isSunk: false, hit: 0, coordinate: [] },
  { id: "2", length: 4, isSunk: false, hit: 0, coordinate: [] },
  { id: "3", length: 3, isSunk: false, hit: 0, coordinate: [] },
  { id: "4", length: 3, isSunk: false, hit: 0, coordinate: [] },
  { id: "5", length: 2, isSunk: false, hit: 0, coordinate: [] },
];

let gameBoard = [
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

function tableCreate() {
  const body = document.body,
    tbl = document.createElement("table");
  var row = tbl.insertRow(0);
  row.insertCell(0).outerHTML = "<th></th><th>A</th> <th>B</th> <th>C</th> <th>D</th> <th>E</th> <th>F</th>  <th>G</th>  <th>H</th> <th>I</th> <th>J</th>";
  for (let i = 0; i < 10; i++) {
    const tr = tbl.insertRow();
    first = tr.insertCell();
    first.outerHTML = i + 1;
    for (let j = 0; j < 10; j++) {
      const td = tr.insertCell();
      td.id = j.toString() + i.toString();
      td.setAttribute("ondrop", "drop_handler(event)");
      td.setAttribute("ondragover", "dragover_handler(event)");
      td.style.border = "1px solid black";
      td.style.width = "20px";
      td.style.height = "20px";
      td.style.border = "solid";
    }
  }
  body.appendChild(tbl);
}
tableCreate();

function generateFirstCordinateAndDirection() {
  numberR = Math.ceil(5 * Math.random()).toString();
  numberC = Math.ceil(5 * Math.random()).toString();
  coordinate = numberR + numberC;
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
    let row = Math.floor(array / 10);
    let col = array % 10;
    banned.push(array);
    gameBoard[row][col] = 1;
    el = document.getElementById(array);
    el.innerHTML = "X";
  });
}

function createAllShips() {
  ships.map((ship) => {
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
  ships.map((ship) => {
    if (ship.hit === ship.length) {
      ship.isSunk = true;
    }
  });
} //zmienia wartość isSunk danego statku
const cells = document.querySelectorAll("td");
for (var i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", function () {
    attack(event);
  });
}

function attack(e) {
  var row = e.target.id.substring(1, 2);
  var col = e.target.id.substring(2, 3);
  gameBoard[row][col] = 1;

  if (ships.some((ship) => ship.coordinate.includes(clickCoordinate))) {
    ships.map((ship) => {
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
  console.log(gameBoard);
}

function win() {
  if (ships.every((ship) => ship.isSunk)) {
    alert("you win");
  }
}

function dragstart_handler(ev) {
  // Add the target element's id to the data transfer object
  ev.dataTransfer.setData("text/plain", ev.target.id);
  ev.dataTransfer.dropEffect = "move";
}
function dragover_handler(ev) {
  ev.preventDefault();
  ev.dataTransfer.dropEffect = "move";
  ev.currentTarget.style.background = "red";
}
function drop_handler(ev) {
  ev.preventDefault();
  // Get the id of the target and add the moved element to the target's DOM
  const data = ev.dataTransfer.getData("text/plain");

  ev.target.appendChild(document.getElementById(data));
}

//pobieranie ruszonego statku i dawanie mu listenera na dragdrop
window.addEventListener("DOMContentLoaded", () => {
  let element = document.querySelectorAll("div");
  element.forEach((el) => {
    el.addEventListener("dragstart", dragstart_handler);
  });
});
