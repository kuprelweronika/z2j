if (
  confirm(
    "Czy chcesz zostać junior frontend deweloperem?" +
      String.fromCodePoint(0x1f41e)
  )
) {
  alert("Ucz się regularnie");
  let godziny = prompt(
    "Ile czasu regularnie poświęcasz na naukę?" + String.fromCodePoint(0x1211e)
  );
  if (godziny > 7) {
    alert("Wow, lecisz jak burza!" + String.fromCodePoint(0x1b41e));
  } else if (godziny == 0) {
    alert("Oby to był tylko stan przejściowy!" + String.fromCodePoint(0x1f46b));
  } else {
    alert("Powoli do przodu");
  }
} else {
  alert("To co tutaj robisz?");
}
