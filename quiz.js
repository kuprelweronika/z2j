let pierwsza = prompt("Podaj pierwszą liczbę");

let znak = prompt("Podaj operator + - ( / lub %");

let druga = prompt("Podaj drugą liczbę");

if (znak === "+") {
  let wynik = alert(parseInt(pierwsza) + parseInt(druga));
}
if (znak === "-") {
  let wynik = alert(parseInt(pierwsza) - parseInt(druga));
}

if (znak === "*") {
  let wynik = alert(parseInt(pierwsza) * parseInt(druga));
}
if (znak === "/") {
  if (druga === "0") {
    alert("Nie dziel przez zero cholero!");
    alert(parseInt(pierwsza) / parseInt(druga));
  }
}
if (znak === "%") {
  let wynik = alert(parseInt(pierwsza) % parseInt(druga));
}
