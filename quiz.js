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
let steps = {
  X: [],
  O: [],
};

function clicked() {
  id = window.event.target.id;
  btnUser = window.document.getElementById(id);
  if (btnUser.value.length > 0) {
    alert("Pole zajęte!!! Wybierz inne!");
  } else {
    btnUser.value = "X";
    btnUser.innerHTML = "X";
    steps.X.push(parseInt(id));
    computerPlay();
  }
}

function computerPlay() {
  let click = Math.floor(Math.random() * 100) + 1;

  while (click < 101) {
    btnComp = window.document.getElementById(click);

    if (btnComp?.value.length > 0) {
      click = Math.floor(Math.random() * 100) + 1;
    } else {
      btnComp.value = "O";
      btnComp.innerHTML = "O";
      steps.O.push(parseInt(id));
      break;
    }
  }
  checkWin();
}

function reset() {
  for (let i = 1; i < 101; i++) {
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

winConditions = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
  [31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
  [41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
  [51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
  [61, 62, 63, 64, 65, 66, 67, 68, 69, 70],
  [71, 72, 73, 74, 75, 76, 77, 78, 79, 80],
  [81, 82, 83, 84, 85, 86, 87, 88, 89, 90],
  [91, 92, 93, 94, 95, 96, 97, 98, 99, 100],
];

function checkWin() {
  if (
    (win = winConditions.some((winCondition) => {
      return winCondition.every((condition) => steps.X.includes(condition));
    }))
  ) {
    console.log(steps.X);

    alert("you win");
    let resetBtn = document.createElement("button");
    resetBtn.innerHTML = "RESET";
    resetBtn.id = "reset";
    resetBtn.onclick = resetByButton;
    document.body.appendChild(resetBtn);
  } else if (
    (win = winConditions.some((winCondition) => {
      return winCondition.every((condition) => steps.O.includes(condition));
    }))
  ) {
    console.log(steps.O);
    alert("comp win");
    let resetBtn = document.createElement("button");
    resetBtn.innerHTML = "RESET";
    resetBtn.id = "reset";
    resetBtn.onclick = resetByButton;
    document.body.appendChild(resetBtn);
  } else {
  }
}
