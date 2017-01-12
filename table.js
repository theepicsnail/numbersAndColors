
/**
 * table - table element
 * data - values 2d recvtangular array of ints
 */
function buildTable(table, data) {
  addControlRow(table, data[0].length, "t");
  data.forEach((row, rn) => {
    let tr = document.createElement("tr")
    table.appendChild(tr);
    addControlCell(tr, "l" + rn);
    row.forEach((value, cn) => {
      let td = document.createElement("td")
      td.classList.add("value");
      td.classList.add("r" + rn + "c" + cn);
      td.innerText = value;
      tr.appendChild(td);
    });
    addControlCell(tr, "r" + rn);
  });
  addControlRow(table, data[0].length, "b");
}

function addControlRow(table, count, cls) {
  let tr = document.createElement("tr");
  addControlCell(tr, "corner");
  for (var i = 0; i < count; i++) {
    addControlCell(tr, cls + i);
  }
  addControlCell(tr, "corner");
  table.appendChild(tr);
}

function addControlCell(tr, name) {
  let td = document.createElement("td");
  td.classList.add(name);
  td.classList.add("ctrl");
  tr.appendChild(td);
}
