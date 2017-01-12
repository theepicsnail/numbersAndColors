class Game {
  constructor(parentElement, rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this._buildBoard(rows, cols);

    this.element = document.createElement("table");
    parentElement.appendChild(this.element);
    buildTable(this.element, this.board);
  }

  // board leftMap rightMap topMap bottomMap
  _buildBoard(rows, cols) {
    this.board = [];
    this.leftMap = [];
    this.rightMap = [];
    for (let r = 0; r < rows; r++) {
      this.leftMap.push(r);
      this.rightMap.push(r);

      let row = [];
      this.board.push(row);
      for (let c = 0; c < cols; c++) {
        row.push(r * this.cols + c);
      }
    }
    this.topMap = [];
    this.bottomMap = [];

    for (let c = 0; c < cols; c++) {
      this.topMap.push(c);
      this.bottomMap.push(c);
    }
  }

  redrawControl(clsPrefix, map) {
    var c = map.length;
    for (let i in map) {
      var ctrl = this.element.querySelector("." + clsPrefix + i);
      ctrl.style.backgroundColor =
          "hsl(" + Math.floor(map[i] * 360 / c) + ",70%,50%)";
      ctrl.innerText = map[i];
    }
  }
  redraw() {
    this.redrawControl("t", this.topMap);
    this.redrawControl("b", this.bottomMap);
    this.redrawControl("l", this.leftMap);
    this.redrawControl("r", this.rightMap);
    var max = this.rows * this.cols - 1;
    this.board.forEach((row, rn) => {
      row.forEach((val, cn) => {
        var elem = this.element.querySelector(".r" + rn + "c" + cn);
        elem.style.backgroundColor =
            "hsl(0, 0%," + Math.floor(val / max * 100) + "%)";
        elem.style.color = val / max < .5 ? "#ffffff" : "#000000";

        elem.innerText = val;
      });
    });
  }

  getColumnSlice(n) {
    var out = [];
    for (let r = 0; r < this.rows; r++) {
      out.push(this.board[r][n]);
    }
    return out;
  }
  setColumnSlice(n, slice) {
    let board = this.board;
    slice.forEach((val, i) => { board[i][n] = val; });
  }

  getRowSlice(n) {
    var out = [];
    for (let c = 0; c < this.cols; c++) {
      out.push(this.board[n][c]);
    }
    return out;
  }
  setRowSlice(n, slice) {
    let board = this.board;
    slice.forEach((val, i) => { board[n][i] = val; });
  }

  rotateSlice(slice, srcMap, dstMap) {
    var tmp = {};
    slice.forEach((val, offset) => { tmp[srcMap[offset]] = val; });
    return dstMap.map((val) => { return tmp[val]; });
  }

  printBoard() {
    this.board.forEach((row) => { console.log(row); })
  }

  slideLeft() {
    let slice = this.getColumnSlice(0);
    for (let c = 1; c < this.cols; c++)
      this.setColumnSlice(c - 1, this.getColumnSlice(c));

    slice = this.rotateSlice(slice, this.leftMap, this.rightMap);
    this.setColumnSlice(this.cols - 1, slice);
  }
  slideRight() {
    let slice = this.getColumnSlice(this.cols - 1);
    for (let c = this.cols - 1; c > 0; c--) {
      this.setColumnSlice(c, this.getColumnSlice(c - 1));
    }
    slice = this.rotateSlice(slice, this.rightMap, this.leftMap);
    this.setColumnSlice(0, slice);
  }

  slideDown() {
    let slice = this.getRowSlice(this.rows - 1);
    for (let r = this.rows - 1; r > 0; r--) {
      this.setRowSlice(r, this.getRowSlice(r - 1));
    }
    slice = this.rotateSlice(slice, this.bottomMap, this.topMap);
    this.setRowSlice(0, slice);
  }
  slideUp() {
    let slice = this.getRowSlice(0);
    for (let r = 1; r < this.rows; r++) {
      this.setRowSlice(r - 1, this.getRowSlice(r));
    }
    slice = this.rotateSlice(slice, this.topMap, this.bottomMap);
    this.setRowSlice(this.rows - 1, slice);
  }
  rotateUp() { this.rightMap.push(this.rightMap.shift()); }
  rotateDown() { this.rightMap.unshift(this.rightMap.pop()); }
  rotateLeft() { this.bottomMap.push(this.bottomMap.shift()); }
  rotateRight() { this.bottomMap.unshift(this.bottomMap.pop()); }

  shuffle(n) {
    n = n || 10;
    let slide =
        [ this.slideLeft, this.slideDown, this.slideRight, this.slideUp ];
    let rotate =
        [ this.rotateUp, this.rotateDown, this.rotateLeft, this.rotateRight ];
    let g = this;
    var interval = setInterval(() => {
      slide[Math.floor(Math.random() * slide.length)].bind(g)();
      rotate[Math.floor(Math.random() * rotate.length)].bind(g)();
      g.redraw();
      n -= 1;
      if (n <= 0)
        clearInterval(interval);
    }, 100);
  }

  checkWin() {
    for (var row = 0; row < this.board.length; row++) {
      for (var col = 0; col < this.board[row].length; col++) {
        if (this.board[row][col] != row * this.cols + col)
          return false;
      }
    }
    console.log("WIN!");
    return true;
  }
}
