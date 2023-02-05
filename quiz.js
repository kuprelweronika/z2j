for (let i = 1; i < 101; i++) {
  let btn = document.createElement("button");
  btn.id = i;
  btn.innerHTML = "";

  btn.addEventListener("click", function () {
    clicked();
  });
  if (i > 0 && i <= 10) {
    btn.className = "btn row-1";
  } else if (i > 10 && i <= 20) {
    btn.className = "btn row-2";
  } else if (i > 20 && i <= 30) {
    btn.className = "btn row-3";
  } else if (i > 30 && i <= 40) {
    btn.className = "btn row-4";
  } else if (i > 40 && i <= 50) {
    btn.className = "btn row-5";
  } else if (i > 50 && i <= 60) {
    btn.className = "btn row-6";
  } else if (i > 60 && i <= 70) {
    btn.className = "btn row-7";
  } else if (i > 70 && i <= 80) {
    btn.className = "btn row-8";
  } else if (i > 80 && i <= 90) {
    btn.className = "btn row-9";
  } else if (i > 90 && i <= 100) {
    btn.className = "btn row-10";
  }

  document.body.appendChild(btn);
}

function clicked() {
  id = window.event.target.id;
  console.log(id);
  btnUser = window.document.getElementById(id);
  if (btnUser.value.length > 0) {
    alert("Pole zajęte!!! Wybierz inne!");
  } else {
    btnUser.value = "X";
    btnUser.innerHTML = "X";
    computerPlay();
    console.log(id);
  }
}

function computerPlay() {
  let click = 1;
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
  for (let i = 1; i < 100; i++) {
    let reset = window.document.getElementById(i);
    reset.value = "";
    reset.innerHTML = "";
    click = 1;
  }
}

function resetByButton() {
  reset();
  document.getElementById("reset").remove();
}

function checkWin() {
  if ((document.getElementById(1).value === "X" && document.getElementById(2).value === "X" && document.getElementById(3).value === "X") || (document.getElementById(1).value === "X" && document.getElementById(4).value === "X" && document.getElementById(7).value === "X") || (document.getElementById(1).value === "X" && document.getElementById(5).value === "X" && document.getElementById(9).value === "X") || (document.getElementById(3).value === "X" && document.getElementById(5).value === "X" && document.getElementById(7).value === "X") || (document.getElementById(2).value === "X" && document.getElementById(5).value === "X" && document.getElementById(8).value === "X") || (document.getElementById(4).value === "X" && document.getElementById(5).value === "X" && document.getElementById(6).value === "X") || (document.getElementById(3).value === "X" && document.getElementById(6).value === "X" && document.getElementById(9).value === "X") || (document.getElementById(7).value === "X" && document.getElementById(8).value === "X" && document.getElementById(9).value === "X")) {
    alert("you win");
    let resetBtn = document.createElement("button");
    resetBtn.innerHTML = "RESET";
    resetBtn.id = "reset";
    resetBtn.onclick = resetByButton;
    document.body.appendChild(resetBtn);
  } else if ((document.getElementById(1).value === "O" && document.getElementById(2).value === "O" && document.getElementById(3).value === "O") || (document.getElementById(1).value === "O" && document.getElementById(4).value === "O" && document.getElementById(7).value === "O") || (document.getElementById(1).value === "O" && document.getElementById(5).value === "O" && document.getElementById(9).value === "O") || (document.getElementById(3).value === "O" && document.getElementById(5).value === "O" && document.getElementById(7).value === "O") || (document.getElementById(2).value === "O" && document.getElementById(5).value === "O" && document.getElementById(8).value === "O") || (document.getElementById(4).value === "O" && document.getElementById(5).value === "O" && document.getElementById(6).value === "O") || (document.getElementById(3).value === "O" && document.getElementById(6).value === "O" && document.getElementById(9).value === "O") || (document.getElementById(7).value === "X" && document.getElementById(8).value === "X" && document.getElementById(9).value === "X")) {
    alert("comp win");
    let resetBtn = document.createElement("button");
    resetBtn.innerHTML = "RESET";
    resetBtn.id = "reset";
    resetBtn.onclick = resetByButton;
    document.body.appendChild(resetBtn);
  } else {
  }
}
