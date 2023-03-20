function dragstart_handler(ev) {
  // Add the target element's id to the data transfer object
  ev.dataTransfer.setData("text/plain", ev.target.id);
  ev.dataTransfer.dropEffect = "move";
}
function dragover_handler(ev) {
  ev.preventDefault();
  ev.dataTransfer.dropEffect = "move";
  ev.currentTarget.style.background = "red";
}
function drop_handler(ev) {
  ev.preventDefault();
  // Get the id of the target and add the moved element to the target's DOM
  const data = ev.dataTransfer.getData("text/plain");
  ev.target.appendChild(document.getElementById(data));
}

window.addEventListener("DOMContentLoaded", () => {
  // Get the element by id
  const element = document.getElementById("carrier");
  // Add the ondragstart event listener
  element.addEventListener("dragstart", dragstart_handler);
});
