// Array de palavras para o jogo
var words = [
  "Afeganistão",
  "Albania",
  "Alemanha",
  "Andorra",
  "Angola",
  "Argentina",
  "Arménia",
  "Austrália",
  "Áustria",
  "Azerbaijão",
  "Bahamas",
  "Bangladesh",
  "Barbados",
  "Barém",
  "Bélgica",
  "Belize",
  "Benim",
  "Bielorrússia",
  "Bolívia",
  "Brasil",
  "Brunei",
  "Bulgária",
  "Burúndi",
  "Butão",
  "Camaroes",
  "Camboja",
  "Canadá",
  "Catar",
  "Cazaquistão",
  "Chade",
  "Chile",
  "China",
  "Chipre",
  "Colômbia",
  "Cosovo",
  "Croácia",
  "Cuba",
  "Dinamarca",
  "Egito",
  "Equador",
  "Eritreia",
  "Eslováquia",
  "Eslovénia",
  "Espanha",
  "Estónia",
  "Etiópia",
  "Filipinas",
  "Finlândia",
  "França",
  "Gabão",
  "Gâmbia",
  "Gana",
  "Geórgia",
  "Grécia",
  "Guatemala",
  "Guiana",
  "Guiné",
  "Honduras",
  "Hungria",
  "Iémen",
  "Índia",
  "Indonésia",
  "Irão",
  "Iraque",
  "Irlanda",
  "Islândia",
  "Iraque",
  "Israel",
  "Itália",
  "Jamaica",
  "Japão",
  "Jordânia",
  "Lesoto",
  "Letónia",
  "Líbano",
  "Libéria",
  "Líbia",
  "Liechtenstein",
  "Lituânia",
  "Luxemburgo",
  "Macedónia",
  "Madagáscar",
  "Malásia",
  "Maldivas",
  "Mali",
  "Malta",
  "Marrocos",
  "Maurícia",
  "México",
  "Moçambique",
  "Moldávia",
  "Mónaco",
  "Mongólia",
  "Montenegro",
  "Namíbia",
  "Nepal",
  "Nicarágua",
  "Níger",
  "Nigéria",
  "Noruega",
  "Palau",
  "Panamá",
  "Paquistão",
  "Paraguai",
  "Peru",
  "Polónia",
  "Portugal",
  "Quénia",
  "Quirguistão",
  "Roménia",
  "Rússia",
  "Ruanda",
  "Salvador",
  "Samoa",
  "Salomão",
  "Senegal",
  "Sérvia",
  "Suiça",
  "Suécia",
  "Síria",
  "Tailândia",
  "Taiwan",
  "Tajiquistão",
  "Tanzânia",
  "Turquia",
  "Turquemenistão",
  "Ucrânia",
  "Uganda",
  "Uruguai",
  "Usbequistão",
  "Venezuela",
  "Vietname",
  "Zâmbia",
  "Zimbabué",
];

var word = getRandomWord(words); // Palavra aleatória
var display = document.getElementById("display");
var guessInput = document.getElementById("guessInput");
var guessButton = document.getElementById("guessButton");
var attemptCount = document.getElementById("attemptCount");
var message = document.getElementById("message");
var reset2Button = document.getElementById("reset2Button");
var attempts = 0;
var modal = document.getElementById("modal");

const menuButton = document.getElementById("menuButton");
const menuContent = document.getElementById("menuContent");

menuButton.addEventListener("click", () => {
  menuContent.style.display =
    menuContent.style.display === "none" ? "flex" : "none";
  menuButton.classList.toggle("active");
  menuButton.style.backgroundColor = menuButton.classList.contains("active")
    ? "#615458"
    : "#6e5c62";
});

document.addEventListener("click", (event) => {
  if (
    !menuButton.contains(event.target) &&
    !menuContent.contains(event.target)
  ) {
    menuContent.style.display = "none";
    menuButton.classList.remove("active");
    menuButton.style.backgroundColor = "#6e5c62";
  }
});
display.textContent = getHiddenWord(word);

guessInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    var guess = guessInput.value.trim();

    if (guess === "") {
      message.textContent = "Please enter a word!";
      return;
    }

    attempts++;

    if (guess.toLowerCase() === word.toLowerCase()) {
      display.textContent = word; // Exibe a palavra correta
      display.classList.add("green"); // Exibe a palavra correta com a cor verde
      reset2Button.style.display = "block"; // Exibe o botão de reset
      guessInput.disabled = true; // O input fica disabled quando o utilizador acerta a palavra
      guessButton.disabled = true; // O botão fica disabled quando o utilizador acerta a palavra
      modal.style.display = "flex";
      document.getElementById("attemptCount").textContent = attempts;
    } else {
      var matchedLetters = getMatchedLetters(word, guess);
      display.textContent = matchedLetters;
      attemptCount.textContent = attempts;

      guessInput.value = "";
      guessInput.focus();
    }
  }
});

guessButton.addEventListener("click", function () {
  var guess = guessInput.value.trim();

  if (guess === "") {
    message.textContent = "Please enter a word!";
    return;
  }

  attempts++;

  if (guess.toLowerCase() === word.toLowerCase()) {
    display.textContent = word; // Exibe a palavra correta
    display.classList.add("green"); // Exibe a palavra correta com a cor verde
    reset2Button.style.display = "block"; // Exibe o botão de reset
    guessInput.disabled = true; // O input fica disabled quando o utilizador acerta a palavra
    guessButton.disabled = true; // O botão fica disabled quando o utilizador acerta a palavra
    // código para abrir o modal
    modal.style.display = "flex";
    document.getElementById("attemptCount").textContent = attempts;
  } else {
    var matchedLetters = getMatchedLetters(word, guess);
    display.textContent = matchedLetters;
    attemptCount.textContent = attempts;

    guessInput.value = "";
    guessInput.focus();
  }
});

reset2Button.addEventListener("click", function () {
  modal.style.display = "none";
  word = getRandomWord(words);
  display.textContent = getHiddenWord(word);
  guessInput.disabled = false;
  guessButton.disabled = false;
  guessInput.value = "";
  attempts = 0;
  attemptCount.textContent = attempts;
  message.textContent = "";
  reset2Button.style.display = "none";
});

function getRandomWord(words) {
  var index = Math.floor(Math.random() * words.length);
  return words[index];
}

function getHiddenWord(word) {
  var hidden = "";
  for (var i = 0; i < word.length; i++) {
    var span = document.createElement("span");
    span.classList.add("box");
    display.appendChild(span);
    hidden += "_";
  }
  return hidden;
}

function getMatchedLetters(word, guess) {
  var matched = "";
  for (var i = 0; i < word.length; i++) {
    if (guess.toLowerCase().includes(word[i].toLowerCase())) {
      matched += word[i];
    } else {
      matched += display.textContent[i];
    }
  }
  return matched;
}
