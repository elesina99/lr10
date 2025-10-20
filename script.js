const fruitImages = [ 
  "apple.png", 
  "pear.png", 
  "lemon.png", 
  "cherry.png",
  "peach.png"
];

let attempt = 0; 
const maxAttempts = 3;

let userName = "";

window.onload = () => {
  do {
    userName = prompt("Введіть ваше ім’я:");
    if (userName === null) {
      alert("Введіть ім’я, щоб почати гру!");
    } else {
      userName = userName.trim(); 
      if (userName === "") {
        alert("Не може бути порожнім!");
      }
    }
  } while (!userName);

  const btn = document.getElementById("generateBtn");
  const attemptText = document.getElementById("attemptText");
  const message = document.getElementById("message");

  message.textContent = `Гравець: ${userName}`;
  attemptText.textContent = `Спроба ${attempt} з ${maxAttempts}`;

  btn.addEventListener("click", generateSlots);

  function generateSlots() {
    const columns = [
      document.getElementById("col1"),
      document.getElementById("col2"),
      document.getElementById("col3")
    ];

    columns.forEach(col => col.innerHTML = "");

    let matrix = [];

    for (let i = 0; i < 3; i++) {
      let used = new Set();
      let colItems = [];

      for (let j = 0; j < 3; j++) {
        let index;
        do {
          index = Math.floor(Math.random() * fruitImages.length);
        } while (used.has(index));
        used.add(index);
        colItems.push(index);

        const img = document.createElement("img");
        img.src = fruitImages[index];
        columns[i].appendChild(img);
      }

      matrix.push(colItems);
    }

    checkWin(matrix);
  }

  function checkWin(matrix) {
    const btn = document.getElementById("generateBtn");
    const attemptText = document.getElementById("attemptText");
    const message = document.getElementById("message");

    let win = false;

    for (let row = 0; row < 3; row++) {
      const first = matrix[0][row];
      if (matrix[1][row] === first && matrix[2][row] === first) {
        win = true;
        break;
      }
    }

    if (win) {
      message.textContent = `Вітаю, ${userName}! Ви виграли!`;
	  btn.disabled = true;
      btn.style.backgroundColor = "gray";
    } else if (attempt < maxAttempts - 1) { 
      attempt++;
      attemptText.textContent = `Спроба ${attempt} з ${maxAttempts}`;
      message.textContent = `На жаль, але ні, ${userName}.`;
    } else {
      attempt = maxAttempts;
      attemptText.textContent = `Спроба ${attempt} з ${maxAttempts}`;
      message.textContent = ` ${userName}, спроби закінчились. Ви програли.`;
      btn.disabled = true;
      btn.style.backgroundColor = "gray";
    }
  }
};





