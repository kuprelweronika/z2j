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
    alert("Choose another button");
  } else {
    btnUser.value = "X";
    btnUser.innerHTML = "X";
    steps.X.push(parseInt(id));
    computerPlay();
  }
}

function computerPlay() {
  let click = Math.floor(Math.random() * (howBig * howBig)) + 1;

  for (let i = 1; i < howBig + 1; i++) {
    btnComp = window.document.getElementById(click);

    if (btnComp?.value.length > 0) {
      click = Math.floor(Math.random() * (howBig * howBig)) + 1;
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
  for (let i = 1; i < howBig * howBig + 1; i++) {
    let reset = window.document.getElementById(i);
    reset.value = "";
    reset.innerHTML = "";
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

function checkWin() {
  if (
    (win = winConditions.some((winCondition) => {
      return winCondition.every((condition) => steps.X.includes(condition));
    }))
  ) {
    alert("You win");
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
    alert("Computer win");
    let resetBtn = document.createElement("button");
    resetBtn.innerHTML = "RESET";
    resetBtn.id = "reset";
    resetBtn.onclick = resetByButton;
    document.body.appendChild(resetBtn);
  } else {
  }
}
