//Não tem a função de marcar bingo
var cells = document.getElementsByTagName("td");
console.log(cells.length);
var cellArray = Array.from(cells);

winRow = false;
winColumn = false;
winMD = false;
winSD = false;

function shuffleCells() {
  cellArray.forEach(function (cell) {
    var randomIndex = Math.floor(Math.random() * cellArray.length);
    var randomCell = cellArray[randomIndex];
    var temp = cell.innerHTML;
    cell.innerHTML = randomCell.innerHTML;
    randomCell.innerHTML = temp;
  });
}

window.addEventListener("load", function () {
  shuffleCells();

  var cells = document.getElementsByTagName("td");
  for (var i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", function () {
      clickCell(this);
    });
  }
});

function clickCell(cell) {
  if (!cell.classList.contains("marked")) {
    cell.classList.add("marked", "fadeIn");
  } else {
    cell.classList.add("fadeOut");
    setTimeout(() => {
      cell.classList.remove("marked", "fadeOut");
    }, 300);
  }

  setTimeout(function () {
    cell.classList.toggle("animate");
    checkVictory();
  }, 100);
}

function checkVictory() {
  var table = document.getElementById("myTable");
  var rows = table.getElementsByTagName("tr");

  if (!winRow) {
    for (var i = 0; i < rows.length; i++) {
      var rowCells = rows[i].getElementsByTagName("td");
      var isRowComplete = true;

      for (var j = 0; j < rowCells.length; j++) {
        if (!rowCells[j].classList.contains("marked")) {
          isRowComplete = false;
          break;
        }
      }

      if (isRowComplete) {
        Win("linha " + (i + 1));
        winRow = true;
        return;
      }
    }
  }

  if (!winColumn) {
    for (var i = 0; i < rows.length; i++) {
      var isColComplete = true;

      for (var j = 0; j < rows.length; j++) {
        var colCell = rows[j].getElementsByTagName("td")[i];
        if (!colCell.classList.contains("marked")) {
          isColComplete = false;
          break;
        }
      }

      if (isColComplete) {
        Win("coluna " + (i + 1));
        winColumn = true;
        return;
      }
    }
  }

  if (!winMD) {
    var isMainDiagonalComplete = true;
    for (var i = 0; i < rows.length; i++) {
      var cell = rows[i].getElementsByTagName("td")[i];
      if (!cell || !cell.classList.contains("marked")) {
        isMainDiagonalComplete = false;
        break;
      }
    }

    if (isMainDiagonalComplete) {
      Win("diagonal principal");
      winMD = true;
      return;
    }
  }

  if (!winSD) {
    var isSecondaryDiagonalComplete = true;
    for (var i = 0; i < rows.length; i++) {
      var cell = rows[i].getElementsByTagName("td")[rows.length - 1 - i];
      if (!cell || !cell.classList.contains("marked")) {
        isSecondaryDiagonalComplete = false;
        break;
      }
    }
    if (isSecondaryDiagonalComplete) {
      Win("diagonal secundária");
      winSD = true;
      return;
    }
  }

  if (winRow && winColumn && winMD && winSD) {
    for (var i = 0; i < cells.length; i++) {
      if (!cells[i].classList.contains("marked")) {
        return;
      }
    }
    Win("cartela cheia");
  }
}

function Win(message) {
  window.alert(`Ganhou por ${message}, Parabens!!!!`);
}
