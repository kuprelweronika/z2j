const ships = [
  { id: "1", length: 5, isSunk: false, hit: 0, coordinate: [] },
  { id: "2", length: 4, isSunk: false, hit: 0, coordinate: [] },
  { id: "3", length: 3, isSunk: false, hit: 0, coordinate: [] },
  { id: "4", length: 3, isSunk: false, hit: 0, coordinate: [] },
  { id: "5", length: 2, isSunk: false, hit: 0, coordinate: [] },
];
//ustawiam statki komputerowi
//nachodzą na siebie
//nie ma odstępów między nimi
//mogą się przecinać

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

function rysowanie() {}

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
function mapToGameBoard(testArray) {
  testArray.map((array) => {
    elBefore = testArray[0];
    elNext = testArray[testArray.length - 1];
    banned.push(elBefore, elNext);
    let row = Math.floor(array / 10);
    let col = array % 10;
    gameBoard[row][col] = 1;
    el = document.getElementById(array);
    el.innerHTML = "X";
  });
}

function createAllShips() {
  ships.map((ship) => {
    [direction, coordinate] = generateFirstCordinateAndDirection();
    testArray = createShip(ship, coordinate, direction);
    ship.coordinate = testArray;
    mapToGameBoard(testArray);
  });
}

console.log(gameBoard);
createAllShips();
console.log(ships);

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
