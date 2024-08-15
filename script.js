const gridSize = 10;
const words = ["APPLE", "BANANA", "CHERRY", "GRAPE", "ORANGE"];
const grid = document.querySelector(".grid");
const answer = document.querySelector(".answer b");
const gridItems = [];

// 그리드 셀 생성
function createGrid() {
  for (let i = 0; i < gridSize * gridSize; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.textContent = ""; // 빈칸
    gridItems.push(cell);
    grid.appendChild(cell);
  }
  // 정답단어표시
  answer.innerText = words.join(", ");
}

// ★★★★★단어를 그리드에 배치★★★★★
function placeWords() {
  words.forEach((word) => {
    let placed = false;
    while (!placed) {
      const direction = Math.floor(Math.random() * 2);
      // 0: 수평, 1: 수직
      let startRow, startCol;

      if (direction === 0) {
        // 수평 배치
        startRow = Math.floor(Math.random() * gridSize);
        startCol = Math.floor(Math.random() * (gridSize - word.length));
      } else {
        // 수직 배치
        startRow = Math.floor(Math.random() * (gridSize - word.length));
        startCol = Math.floor(Math.random() * gridSize);
      }

      // 단어가 배치 가능한지 확인합니다.
      let canPlace = true;
      for (let i = 0; i < word.length; i++) {
        const index =
          (startRow + (direction === 1 ? i : 0)) * gridSize +
          (startCol + (direction === 0 ? i : 0));
        if (
          gridItems[index].dataset.word ||
          gridItems[index].textContent !== ""
        ) {
          canPlace = false;
          break;
        }
      }

      // 단어를 배치합니다.
      if (canPlace) {
        for (let i = 0; i < word.length; i++) {
          const index =
            (startRow + (direction === 1 ? i : 0)) * gridSize +
            (startCol + (direction === 0 ? i : 0));
          gridItems[index].textContent = word[i];
          gridItems[index].dataset.word = word;
        }
        placed = true;
      }
    }
  });
}

// 빈셀에 무작위 알파벳 채우기
function randomWords() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    if (cell.textContent === "") {
      const randomWord = String.fromCharCode(
        65 + Math.floor(Math.random() * 26)
      );
      cell.textContent = randomWord;
    }
  });
}

// 셀 클릭 시 색상변경
function cellClick() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      cell.classList.add("cell-click");
      if (cell.dataset.word) {
        cell.classList.add("cell-found");
      }
    });
  });
}

// 정답단어를 찾으면 이벤트발생
function correctClick() {}

createGrid();
placeWords();
randomWords();
cellClick();
// correctClick();
