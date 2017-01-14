let hash = (location.hash.substring(1) || "3x4").split("x");
let rows = parseInt(hash[0]), cols = parseInt(hash[1]);

let g = new Game(document.getElementById("gameArea"), rows, cols);
document.onkeydown = (evt) => {
  switch (evt.code) {
  case "KeyA":
    g.slideLeft();
    break;
  case "KeyS":
    g.slideDown();
    break;
  case "KeyD":
    g.slideRight();
    break;
  case "KeyW":
    g.slideUp();
    break;
  case "ArrowUp":
    g.rotateUp();
    break;
  case "ArrowDown":
    g.rotateDown();
    break;
  case "ArrowLeft":
    g.rotateLeft();
    break;
  case "ArrowRight":
    g.rotateRight();
    break;
  }
  console.log("--");
  g.redraw();
  if (g.checkWin()) {
    document.querySelector("#output").innerText = "Winning state! Click shuffle and try another";
  } else {
    document.querySelector("#output").innerText = "";
  }
};
document.onkeydown({})
