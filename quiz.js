function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return (num1 = num1 - num2);
}

function multiply(num1, num2) {
  return (num1 = num1 * num2);
}

function divide(num1, num2) {
  if (num2 === 0) {
    alert("Nie dziel przez zero cholero");
  } else {
    return (num1 = num1 / num2);
  }
}
function mod(num1, num2) {
  return (num1 = num1 % num2);
}

let num1 = parseFloat(prompt("Podaj pierwszą liczbę"));
let sym = prompt("Podaj operator + - ( / lub %");
do {
  switch (sym) {
    case "+":
      num2 = parseFloat(prompt("Podaj drugą liczbę"));
      alert((num1 = add(num1, num2)));
      sym = prompt("Podaj operator + - ( / lub %");
      break;
    case "-":
      num2 = parseFloat(prompt("Podaj drugą liczbę"));
      alert((num1 = subtract(num1, num2)));
      sym = prompt("Podaj operator + - ( / lub %");
      break;
    case "*":
      num2 = parseFloat(prompt("Podaj drugą liczbę"));
      alert(multiply(num1, num2));
      sym = prompt("Podaj operator + - ( / lub %");

      break;
    case "/":
      num2 = parseFloat(prompt("Podaj drugą liczbę"));

      alert(divide(num1, num2));
      sym = prompt("Podaj operator + - ( / lub %");

      break;
    case "%":
      num2 = parseFloat(prompt("Podaj drugą liczbę"));

      alert(mod(num1, num2));
      sym = prompt("Podaj operator + - ( / lub %");
      break;
  }
} while (sym !== "");
