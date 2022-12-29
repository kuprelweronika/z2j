const firstNum = prompt("Podaj pierwszą liczbę");

const sym = prompt("Podaj operator + - ( / lub %");

const secondNum = prompt("Podaj drugą liczbę");

const num1 = parseFloat(firstNum);
const num2 = parseFloat(secondNum);

if (sym === "+") {
  alert(num1 + num2);
}
if (sym === "-") {
  alert(num1 - num2);
}

if (sym === "*") {
  alert(num1 * num2);
}
if (sym === "/") {
  if (num2 === "0") {
    alert("Nie dziel przez zero cholero!");
  } else {
    alert(parseInt(num1) / parseInt(num2));
  }
}
if (sym === "%") {
  alert(parseInt(num1) % parseInt(num2));
}
