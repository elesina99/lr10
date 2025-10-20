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
    userName = prompt("Р’РІРµРґС–С‚СЊ РІР°С€Рµ С–РјвЂ™СЏ:");
    if (userName === null) {
      alert("Р’РІРµРґС–С‚СЊ С–РјвЂ™СЏ, С‰РѕР± РїРѕС‡Р°С‚Рё РіСЂСѓ!");
    } else {
      userName = userName.trim(); 
      if (userName === "") {
        alert("РќРµ РјРѕР¶Рµ Р±СѓС‚Рё РїРѕСЂРѕР¶РЅС–Рј!");
      }
    }
  } while (!userName);

  const btn = document.getElementById("generateBtn");
  const attemptText = document.getElementById("attemptText");
  const message = document.getElementById("message");

  message.textContent = `Р“СЂР°РІРµС†СЊ: ${userName}`;
  attemptText.textContent = `РЎРїСЂРѕР±Р° ${attempt} Р· ${maxAttempts}`;

  btn.addEventListener("click", generateSlots);

  function generateSlots() {
    const columns = [
      document.getElementById("col1"),
      document.getElementById("col2"),
      document.getElementById("col3")
    ];
    columns.forEach(col => col.innerHTML = "");
    let matrix = [[], [], []];

    for (let col = 0; col < 3; col++) {
      let used = new Set(); 

      for (let row = 0; row < 3; row++) {
        let index;
        do {
          index = Math.floor(Math.random() * fruitImages.length);
        } while (used.has(index));
        used.add(index);
        const img = document.createElement("img");
        img.src = fruitImages[index];
        columns[col].appendChild(img);
        matrix[row][col] = index;
      }
    }

    checkWin(matrix);
  }

  function checkWin(matrix) {
    const btn = document.getElementById("generateBtn");
    const attemptText = document.getElementById("attemptText");
    const message = document.getElementById("message");

    let win = false;
    for (let row = 0; row < 3; row++) {
      const first = matrix[row][0];
      if (matrix[row][1] === first && matrix[row][2] === first) {
        win = true;
        break;
      }
    }

    if (win) {
      message.textContent = `Р’С–С‚Р°СЋ, ${userName}! Р’Рё РІРёРіСЂР°Р»Рё!`;
      btn.disabled = true;
      btn.style.backgroundColor = "gray";
    } else if (attempt < maxAttempts - 1) { 
      attempt++;
      attemptText.textContent = `РЎРїСЂРѕР±Р° ${attempt} Р· ${maxAttempts}`;
      message.textContent = `РќР° Р¶Р°Р»СЊ, ${userName}, СЃРїСЂРѕР±СѓР№С‚Рµ С‰Рµ СЂР°Р·.`;
    } else {
      attempt = maxAttempts;
      attemptText.textContent = `РЎРїСЂРѕР±Р° ${attempt} Р· ${maxAttempts}`;
      message.textContent = `${userName}, СЃРїСЂРѕР±Рё Р·Р°РєС–РЅС‡РёР»РёСЃСЊ. Р’Рё РїСЂРѕРіСЂР°Р»Рё.`;
      btn.disabled = true;
      btn.style.backgroundColor = "gray";
    }
  }
};





