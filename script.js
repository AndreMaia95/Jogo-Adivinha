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
var attempts = 0;

//Variáveis da interface do jogador
var display = document.getElementById("display");
var guessInput = document.getElementById("guessInput");
var guessButton = document.getElementById("guessButton");
var attemptCount = document.getElementById("attemptCount");
var reset2Button = document.getElementById("reset2Button");
var modal = document.getElementById("modal");

//Evento do botão do menu
const menuButton = document.getElementById("menuButton");
const menuContent = document.getElementById("menuContent");

menuButton.addEventListener("click", toggleMenu);
document.addEventListener("click", closeMenu);

guessInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    handleGuess();
  }
});

guessButton.addEventListener("click", handleGuess);

reset2Button.addEventListener("click", resetGame);

initializeGame();

function initializeGame() {
  modal.style.display = "none";
  word = getRandomWord(words);
  display.textContent = getHiddenWord(word);
  guessInput.disabled = false;
  guessButton.disabled = false;
  guessInput.value = "";
  attempts = 0;
  attemptCount.textContent = attempts;
  reset2Button.style.display = "none";
}

function handleGuess() {
  var guess = guessInput.value.trim();

  attempts++;

  if (guess.toLowerCase() === word.toLowerCase()) {
    displayCorrectGuess();
  } else {
    var matchedLetters = getMatchedLetters(word, guess);
    display.textContent = matchedLetters;
    attemptCount.textContent = attempts;
    guessInput.value = "";
    guessInput.focus();
  }
}

function displayCorrectGuess() {
  display.textContent = word; // Exibe a palavra correta
  display.classList.add("green"); // Exibe a palavra correta com a cor verde
  reset2Button.style.display = "block"; // Exibe o botão de reset
  guessInput.disabled = true; // O input fica disabled quando o utilizador acerta a palavra
  guessButton.disabled = true; // O botão fica disabled quando o utilizador acerta a palavra
  modal.style.display = "flex";
  document.getElementById("attemptCount").textContent = attempts;
}

function resetGame() {
  modal.style.display = "none";
  initializeGame();
}

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

function toggleMenu() {
  menuContent.style.display =
    menuContent.style.display === "none" ? "flex" : "none";
  menuButton.classList.toggle("active");
  menuButton.style.backgroundColor = menuButton.classList.contains("active")
    ? "#615458"
    : "#6e5c62";
}

function closeMenu() {
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
}
