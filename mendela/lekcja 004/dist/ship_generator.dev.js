"use strict";

/*
  Generator's directions:
    0: up
    1: right

  Cell state:
    0: empty
    1: ship
    2: protected
 */
var randomBetween = function randomBetween(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
};

var ship_list = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
var cell_list = [];
var result, state, cell, direction, row, div;
var frame = document.getElementById('bot');

function check_for_ship(d, s) {
  if (d === 0) {
    for (i = -1; i <= 1; i++) {
      for (j = -1; j <= s; j++) {
        if (cell_list[row + j][cell + i] === 0) {
          state += 1;
        } else if (cell_list[row + j][cell + i] === 2 && (j === -1 || j === s)) {
          state += 1;
        }
      }
    }
  } else {
    for (i = -1; i <= s; i++) {
      for (j = -1; j <= 1; j++) {
        if (cell_list[row + j][cell + i] === 0) {
          state += 1;
        } else if (cell_list[row + j][cell + i] === 2 && (i === -1 || i === s)) {
          state += 1;
        }
      }
    }
  }
}

for (i = 0; i < 12; i++) {
  row = [];

  for (j = 0; j < 12; j++) {
    row.push(0);
  }

  cell_list.push(row);
}

ship_list.forEach(function (ship) {
  state = 0;

  while (state < 3 * (ship + 2)) {
    state = 0;
    row = 12;
    cell = 12;
    direction = randomBetween(0, 1);

    if (direction === 0) {
      while (cell + 1 > 11) {
        cell = randomBetween(1, 10);
      }

      while (row + ship > 11) {
        row = randomBetween(1, 10);
      }

      check_for_ship(direction, ship);
    } else {
      while (cell + ship > 11) {
        cell = randomBetween(1, 10);
      }

      while (row + 1 > 11) {
        row = randomBetween(1, 10);
      }

      check_for_ship(direction, ship);
    }
  }

  if (direction === 0) {
    for (i = -1; i <= 1; i++) {
      for (j = -1; j <= ship; j++) {
        if (j >= 0 && j < ship) {
          cell_list[row + j][cell] = 1;
        }

        cell_list[row + j][cell + i] = 2;
      }
    }
  } else {
    for (i = -1; i <= ship; i++) {
      for (j = -1; j <= 1; j++) {
        if (i >= 0 && i < ship) {
          cell_list[row][cell + i] = 1;
        }

        cell_list[row + j][cell + i] = 2;
      }
    }
  }
});

for (j = 1; j < 11; j++) {
  for (i = 1; i < 11; i++) {
    div = document.createElement("DIV");
    div.style.top = 32 * (j - 1) + "px";
    div.style.left = 32 * (i - 1) + "px";
    div.style.backgroundColor = cell_list[j][i] === 1 ? 'rgba(0, 255, 65, 0.5)' : 'transparent';
    div.style.borderColor = cell_list[j][i] === 1 ? 'transparent' : 'rgba(0, 255, 65, 0.5)';
    div.className = 'scanlines cell';
    frame.appendChild(div);
  }
}