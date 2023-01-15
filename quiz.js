function clicked(id) {
  var btnUser = window.document.getElementById(id);
  if (btnUser.value.length > 0) {
    alert("Pole zajęte!!! Wybierz inne!");
  } else {
    btnUser.value = "X";
    btnUser.innerHTML = "X";
    computerPlay();
  }
}
click = 1;

function computerPlay() {
  while (click < 9) {
    btnComp = window.document.getElementById(click);

    if (btnComp?.value.length > 0) {
      click++;
    } else {
      btnComp.value = "O";
      btnComp.innerHTML = "O";
      click++;
      break;
    }
  }
  checkWin();
}

function reset() {
  for (let i = 1; i < 10; i++) {
    var reset = window.document.getElementById(i);
    reset.value = "";
    reset.innerHTML = "";

    click = 1;
  }
}

function checkWin() {
  if (
    (document.getElementById(1).value === "X" &&
      document.getElementById(2).value === "X" &&
      document.getElementById(3).value === "X") ||
    (document.getElementById(1).value === "X" &&
      document.getElementById(4).value === "X" &&
      document.getElementById(7).value === "X") ||
    (document.getElementById(1).value === "X" &&
      document.getElementById(5).value === "X" &&
      document.getElementById(9).value === "X") ||
    (document.getElementById(3).value === "X" &&
      document.getElementById(5).value === "X" &&
      document.getElementById(7).value === "X") ||
    (document.getElementById(2).value === "X" &&
      document.getElementById(5).value === "X" &&
      document.getElementById(8).value === "X") ||
    (document.getElementById(4).value === "X" &&
      document.getElementById(5).value === "X" &&
      document.getElementById(6).value === "X") ||
    (document.getElementById(3).value === "X" &&
      document.getElementById(6).value === "X" &&
      document.getElementById(9).value === "X")
  ) {
    alert("you win");
    reset();
  } else if (
    (document.getElementById(1).value === "O" &&
      document.getElementById(2).value === "O" &&
      document.getElementById(3).value === "O") ||
    (document.getElementById(1).value === "O" &&
      document.getElementById(4).value === "O" &&
      document.getElementById(7).value === "O") ||
    (document.getElementById(1).value === "O" &&
      document.getElementById(5).value === "O" &&
      document.getElementById(9).value === "O") ||
    (document.getElementById(3).value === "O" &&
      document.getElementById(5).value === "O" &&
      document.getElementById(7).value === "O") ||
    (document.getElementById(2).value === "O" &&
      document.getElementById(5).value === "O" &&
      document.getElementById(8).value === "O") ||
    (document.getElementById(4).value === "O" &&
      document.getElementById(5).value === "O" &&
      document.getElementById(6).value === "O") ||
    (document.getElementById(3).value === "O" &&
      document.getElementById(6).value === "O" &&
      document.getElementById(9).value === "O")
  ) {
    alert("comp win");
    reset();
  } else {
  }
}
