
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


    const sun = new Image();
    const moon = new Image();
    const france = new Image();
    const uk = new Image();

    sun.src = 'img/soleil1.png';
    moon.src = 'img/pleine-lune.png';
    france.src = 'img/france.png';
    uk.src = 'img/anglais.png';

    class ToggleButton {
      constructor(canvas, icons, callback) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.icons = icons; // [icon gauche, icon droite]
        this.isOn = false;
        this.position = 30;
        this.callback = callback;
        this.init();
      }

      draw() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const gradient = ctx.createLinearGradient(0, 0, this.canvas.width, 0);
        if (this.isOn) {
          gradient.addColorStop(0, '#040f38');
          gradient.addColorStop(1, '#0e2c97ff');
        } else {
          gradient.addColorStop(0, '#e4ab8e');
          gradient.addColorStop(1, '#e2c5b7ff');
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(30, 0);
        ctx.arcTo(this.canvas.width, 0, this.canvas.width, this.canvas.height, 30);
        ctx.arcTo(this.canvas.width, this.canvas.height, 0, this.canvas.height, 30);
        ctx.arcTo(0, this.canvas.height, 0, 0, 30);
        ctx.arcTo(0, 0, this.canvas.width, 0, 30);
        ctx.closePath();
        ctx.fill();

        // Icônes gauche/droite
        ctx.drawImage(this.icons[0], 15, 15, 25, 25);
        ctx.drawImage(this.icons[1], 80, 15, 25, 25);

        // Cercle de bascule
        ctx.beginPath();
        ctx.arc(this.position, this.canvas.height / 2, 24, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animate(target) {
        const step = target > this.position ? 4 : -4;
        const animate = () => {
          this.position += step;
          this.draw();
          if ((step > 0 && this.position < target) || (step < 0 && this.position > target)) {
            requestAnimationFrame(animate);
          } else {
            this.position = target;
            this.draw();
            if (this.callback) this.callback(this.isOn);
          }
        };
        animate();
      }

      toggle() {
        this.isOn = !this.isOn;
        const target = this.isOn ? 90 : 30;
        this.animate(target);
      }

      init() {
        this.canvas.addEventListener('click', () => this.toggle());
        this.icons[0].onload = () => this.draw();
      }
    }
// Bouton Thème (Soleil / Lune)
    new ToggleButton(document.getElementById('color'), [sun, moon], (isOn) => {
      document.body.className = isOn ? 'light' : 'dark';
    });

    // Bouton Langue (Français / Anglais)
    new ToggleButton(document.getElementById('language'), [france, uk], (isOn) => {
      console.log(isOn ? 'Langue : Anglais' : 'Langue : Français');
    })



/*
    // --- Gestion du changement de langue ---
const translations = {
  fr: {
    accueil: "Accueil",
    a_propos: "À propos",
    domaines: "Nos domaines",
    realisations: "Réalisations",
    avis: "Avis clients",
    contacts: "Contacts",
    welcome_universe: "Bienvenue dans un nouvel univers,",
    welcome_kroma: "Bienvenue chez <span id='animatedText'>Kroma</span>",
  },
  en: {
    accueil: "Home",
    a_propos: "About us",
    domaines: "Our fields",
    realisations: "Projects",
    avis: "Client reviews",
    contacts: "Contacts",
    welcome_universe: "Welcome to a new universe,",
    welcome_kroma: "Welcome to <span id='animatedText'>Kroma</span>",
  }
};

let currentLang = "fr"; // langue par défaut

// Fonction de traduction
function setLanguage(lang) {
  const elements = document.querySelectorAll("[data-lang]");
  elements.forEach(el => {
    const key = el.getAttribute("data-lang");
    if (translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });
  currentLang = lang;
}

// --- Gestion du canevas pour le bouton langue ---
const canvasLang = document.getElementById("language");
const ctxLang = canvasLang.getContext("2d");
canvasLang.width = 120;
canvasLang.height = 60;

function drawLanguageButton() {
  ctxLang.clearRect(0, 0, canvasLang.width, canvasLang.height);

  ctxLang.beginPath();
  ctxLang.roundRect(0, 0, 120, 60, 30);
  ctxLang.fillStyle = "#fff";
  ctxLang.fill();

  ctxLang.font = "bold 22px Oswald";
  ctxLang.textAlign = "center";
  ctxLang.textBaseline = "middle";
  ctxLang.fillStyle = "#000";
  ctxLang.fillText(currentLang.toUpperCase(), 60, 30);
}

drawLanguageButton();

// --- Animation du cercle lors du clic ---
function animateLangCircle() {
  let radius = 0;
  let alpha = 0.6;

  function draw() {
    ctxLang.save();
    ctxLang.clearRect(0, 0, canvasLang.width, canvasLang.height);
    drawLanguageButton();

    ctxLang.beginPath();
    ctxLang.arc(60, 30, radius, 0, Math.PI * 2);
    ctxLang.strokeStyle = `rgba(0, 0, 0, ${alpha})`;
    ctxLang.lineWidth = 3;
    ctxLang.stroke();

    ctxLang.restore();

    radius += 2;
    alpha -= 0.02;
    if (alpha > 0) requestAnimationFrame(draw);
    else drawLanguageButton();
  }
  draw();
}

// --- Événement clic sur le canevas ---
canvasLang.addEventListener("click", () => {
  animateLangCircle();

  // Alterner entre FR et EN
  const newLang = currentLang === "fr" ? "en" : "fr";
  setLanguage(newLang);
  drawLanguageButton();
});
*/