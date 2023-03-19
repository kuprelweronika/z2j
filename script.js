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

function createShip(ship, direction, number, letter) {
  for (i = 0; i < ship.length; i++) {
    if (direction === 1) {
      number = number + 1;
      array = [coordinate];
      coordinate = letter + number;

      position = document.getElementById(coordinate);
      position.innerHTML = "X";
      ship.coordinate.push(coordinate);
    } else {
      //ustawianie poziomo
      letter = letter.substring(0, letter.length - 1) + String.fromCharCode(letter.charCodeAt(letter.length - 1) + 1);
      coordinate = letter + number;
      array = [coordinate];
      position = document.getElementById(coordinate);

      position.innerHTML = "X";

      ship.coordinate.push(coordinate);
    }
  }
  return coordinate;
}

function generateFirstCordinateAndDirection() {
  letter = String.fromCharCode(65 + Math.floor(Math.random() * 5));
  number = Math.ceil(5 * Math.random());
  coordinate = letter + number;
  direction = Math.ceil(Math.random() * 2);

  return [letter, number, direction, coordinate];
}
function checkCoordinate(coordinate) {
  if (ships.some((ship) => ship.coordinate.includes(coordinate))) {
    return true;
  } else {
    return false;
  }
}

function createAllShips() {
  ships.map((ship) => {
    [letter, number, direction, coordinate] = generateFirstCordinateAndDirection();

    while (checkCoordinate(coordinate)) {
      [letter, number, direction, coordinate] = generateFirstCordinateAndDirection();
    }
    createShip(ship, direction, number, letter);
  });
}
createAllShips();

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
  let clickCoordinate = e.target.id;
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
}

function win() {
  if (ships.every((ship) => ship.isSunk)) {
    alert("you win");
  }
}
