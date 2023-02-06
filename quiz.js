function howBigShouldBe() {
  howBig = parseInt(prompt("How big Tic Tac Toe?"));
  if (howBig === 1) {
    alert("Its too small. Change bigger");
    howBigShouldBe();
  } else if (howBig === 2) {
    alert("Its too small. Change bigger");
    howBigShouldBe();
  } else if (howBig > 10) {
    alert("Its too big. Max number is 10");
  }
  return howBig;
}
howBigShouldBe();
//set table
let el = document.getElementById("cont");
switch (howBig) {
  case 3:
    el.style.gridTemplateColumns = "1fr 1fr 1fr";
    break;
  case 4:
    el.style.gridTemplateColumns = "1fr 1fr 1fr 1fr";
    break;
  case 5:
    el.style.gridTemplateColumns = "1fr 1fr 1fr 1fr 1fr ";
    break;
  case 6:
    el.style.gridTemplateColumns = "1fr 1fr 1fr 1fr 1fr 1fr";
    break;
  case 7:
    el.style.gridTemplateColumns = "1fr 1fr 1fr 1fr 1fr 1fr 1fr";
    break;
  case 8:
    el.style.gridTemplateColumns = "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr";
    break;
  case 9:
    el.style.gridTemplateColumns = "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr";
    break;
  case 10:
    el.style.gridTemplateColumns = "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ";
    break;
}

// let el = document.getElementsByClassName("container");

for (let i = 1; i < howBig * howBig + 1; i++) {
  let btn = document.createElement("button");
  btn.id = i;
  btn.innerHTML = "";

  btn.addEventListener("click", function () {
    clicked();
  });
  if (i > 0 && i <= howBig) {
    btn.className = "btn row-1";
  } else if (i > howBig && i <= 2 * howBig) {
    btn.className = "btn row-2";
  } else if (i > 2 * howBig && i <= 3 * howBig) {
    btn.className = "btn row-3";
  } else if (i > 3 * howBig && i <= 4 * howBig) {
    btn.className = "btn row-4";
  } else if (i > 4 * howBig && i <= 5 * howBig) {
    btn.className = "btn row-5";
  } else if (i > 5 * howBig && i <= 6 * howBig) {
    btn.className = "btn row-6";
  } else if (i > 6 * howBig && i <= 7 * howBig) {
    btn.className = "btn row-7";
  } else if (i > 7 * howBig && i <= 8 * howBig) {
    btn.className = "btn row-8";
  } else if (i > 8 * howBig && i <= 9 * howBig) {
    btn.className = "btn row-9";
  } else if (i > 9 * howBig && i <= 10 * howBig) {
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
  let click = Math.floor(Math.random() * (howBig * howBig)) + 1;
  let counter = 1;

  for (let i = 1; i < howBig + 1; i++) {
    btnComp = window.document.getElementById(click);

    if (btnComp?.value.length > 0) {
      click = Math.floor(Math.random() * (howBig * howBig)) + 1;
    } else {
      console.log(counter);
      btnComp.value = "O";
      btnComp.innerHTML = "O";
      steps.O.push(parseInt(id));
      break;
    }
  }
  checkWin();
}

function reset() {
  for (let i = 1; i < howBig * howBig + 1; i++) {
    let reset = window.document.getElementById(i);
    reset.value = "";
    reset.innerHTML = "";
    counter = 1;
    steps.X = [];
    steps.O = [];
  }
}

function resetByButton() {
  reset();
  document.getElementById("reset").remove();
}

//generate array for winConditions
let i = 1;
let winConditions;
let hor = Array(howBig)
  .fill()
  .map(() =>
    Array(howBig)
      .fill()
      .map(() => i++)
  );
let ver = hor[0].map((_, colIndex) => hor.map((row) => row[colIndex]));

winConditions = hor.concat(ver);
// winConditions = [
//   //hor
//   [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
//   [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
//   [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
//   [31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
//   [41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
//   [51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
//   [61, 62, 63, 64, 65, 66, 67, 68, 69, 70],
//   [71, 72, 73, 74, 75, 76, 77, 78, 79, 80],
//   [81, 82, 83, 84, 85, 86, 87, 88, 89, 90],
//   [91, 92, 93, 94, 95, 96, 97, 98, 99, 100],
//   //vert
//   [1, 11, 21, 31, 41, 51, 61, 71, 81, 91],
//   [2, 12, 22, 32, 42, 52, 62, 72, 82, 92],
//   [3, 13, 23, 33, 43, 53, 63, 73, 83, 93],
//   [4, 14, 24, 34, 44, 54, 64, 74, 84, 94],
//   [5, 15, 25, 35, 45, 55, 65, 75, 85, 95],
//   [6, 16, 26, 36, 46, 56, 66, 76, 86, 96],
//   [7, 17, 27, 37, 47, 57, 67, 77, 87, 97],
//   [8, 18, 28, 38, 48, 58, 68, 78, 88, 98],
//   [9, 19, 29, 39, 49, 59, 69, 79, 89, 99],
//   [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
//   //diag
//   [1, 12, 23, 34, 45, 56, 67, 78, 89, 100],
//   [10, 19, 28, 37, 46, 55, 64, 73, 82, 91],
// ];

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
