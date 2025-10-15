
const textElement = document.getElementById("animatedText");
const words = ["vous", "Kroma"]; // mots à animer
let currentWord = 0;

function animateWord() {
  const word = words[currentWord];
  let index = 0;

  // Apparition lettre par lettre
  function typeLetter() {
    if (index < word.length) {
      textElement.textContent += word[index];
      index++;
      setTimeout(typeLetter, 150);
    } else {
      setTimeout(deleteLetter, 1000); // attendre avant de supprimer
    }
  }

  // Disparition lettre par lettre
  function deleteLetter() {
    if (index > 0) {
      textElement.textContent = word.slice(0, index - 1);
      index--;
      setTimeout(deleteLetter, 100);
    } else {
      // Passer au mot suivant
      currentWord = (currentWord + 1) % words.length;
      setTimeout(animateWord, 500);
    }
  }

  typeLetter();
}

// Lancer l'animation
animateWord();

//Pour changer le thème
const colorToggle = document.getElementById("color");
const soleil = document.getElementById("soleil");
const lune = document.getElementById("lune");
const francais = document.getElementById("francais");
const anglais = document.getElementById("anglais");
const body = document.querySelector("body");
colorToggle.addEventListener("click", () => {
    if(body.classList.contains('dark')){
        body.classList.add('light');
        body.classList.remove('dark');
        soleil.style.display = "none"
        lune.style.display = "block"
    }else{
        body.classList.add('dark');
        body.classList.remove('light');
        soleil.style.display = "block"
        lune.style.display = "none"
    }
})