const textElement = document.getElementById("animatedText");
const wordsFr = ["vous", "KROMA"]; // mots à animer
const wordsEn = ["your home", "KROMA"]; // mots à animer
if (document.querySelector("#language").getAttribute("class") === "fr") {
  var words = wordsFr;
} else {
  var words = wordsEn;
}
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
//FIN ANIMATION DE PAGE D'ACCEUIL

//ANIMATION CHANGEMENT DE LANGUE
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
    ctx.shadowColor = 'rgba(0, 0, 0, 0.83)';
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

  document.querySelector("#language").className = isOn ? 'en' : 'fr'
        
  //Sélection des éléments

  const home = document.querySelector('#headAcceuil')
  const prop = document.querySelector("#headPropos")
  const domaine = document.querySelector("#headDomaine")
  const rea = document.querySelector("#headRea")
  const avis = document.querySelector("#headAvis")
  const contact = document.querySelector("#headContact")
  const ul = document.querySelector("ul")
  const welcomeUnivers = document.querySelector("#welcomeUnivers")
  const welcomeKroma = document.querySelector("#welcomeKroma")
  const aboutTitle = document.querySelector("h1")
  const aboutText = document.querySelector("#histoire")

  /*
  const titleMission = document.querySelector(".card mission h1")
  onst titleVision = document.querySelector(".card vision h1")
  const titleValeurs = document.querySelector(".card valeurs h1")
  const el2 = document.querySelectorAll("h3")
  */
        
  const el = document.querySelector('#language')
  const attr = el.getAttribute("class")
  ul.style.animation = 'fadeLeftOut 0.5s ease forwards'
  welcomeUnivers.style.animation = 'fadeLeftOut 0.5s ease forwards'
  welcomeKroma.style.animation = 'fadeLeftOut 0.5s ease forwards'
  aboutTitle.style.animation = 'fadeLeftOut 0.5s ease forwards'
  aboutText.style.animation = 'fadeLeftOut 0.5s ease forwards'

  //el2.style.animation = 'fadeLeftOut 0.5s ease forwards'

  setTimeout(() => {
    home.textContent = translations[attr].accueil
    prop.textContent = translations[attr].a_propos
    domaine.textContent = translations[attr].domaines
    rea.textContent = translations[attr].realisations
    avis.textContent = translations[attr].avis
    contact.textContent = translations[attr].contacts
    welcomeUnivers.textContent = translations[attr].welcome_universe
    welcomeKroma.innerHTML = translations[attr].welcome_kroma

    /*aboutTitle.innerHTML = translations[attr].aboutTitle
    aboutText.innerHTML = translations[attr].aboutText*/

    ul.style.animation = 'fadeLeftIn 0.5s ease forwards'
    welcomeUnivers.style.animation = "fadeLeftIn 0.5s ease forwards"
    welcomeKroma.style.animation = "fadeLeftIn 0.5s ease forwards"
    aboutTitle.style.animation = "fadeLeftIn 0.5s ease forwards"
    aboutText.style.animation = "fadeLeftIn 0.5s ease forwards"
  }, 500);

})

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
    welcome_kroma: "Bienvenue chez <span id='animatedText'></span>",
    aboutTitle : "Derrière le nom '<span id='animatedText'>KROMA</span>'",
    aboutText : "Fondé avec une passion pour le design, l’innovation et de désir de créer quelque chose de grand, Kroma accompagne les entreprises et créateurs dans la construction de leur identité visuelle pour les permettre d’être plus grand aux yeux du monde. <br>Elle est une agence où créativité et efficacité se rencontrent. Ici, chaque projet est une aventure, chaque visuel raconte une histoire, et chaque site web est conçu pour captiver et convertir. Kroma c’est un partenaire qui accompagne ses clients pour que leur image reflète vraiment leur vision et attire l’attention qu’elle mérite. <br> Avec un mélange d’audace, de clarté et de passion, nous transformons les idées en réalisations mémorables...",
    titleVision : "Notre vision",
    titleMission: "Notre mission",
    titleValuers: "Nos valeurs"

  },

  en: {

    accueil: "Home",
    a_propos: "About us",
    domaines: "Our fields",
    realisations: "Projects",
    avis: "Client reviews",
    contacts: "Contacts",
    welcome_universe: "Welcome to a new universe,",
    welcome_kroma: "Welcome to <span id='animatedText'></span>",
    aboutTitle : "Behind the name '<span id='animatedText'>KROMA</span>'",
    aboutText : "Founded with a passion for design, innovation, and a desire to create something great, Kroma supports businesses and creators in building their visual identity to help them stand out in the eyes of the world. <br>It is an agency where creativity and efficiency meet. Here, every project is an adventure, every visual tells a story, and every website is designed to captivate and convert. Kroma is a partner that helps its clients ensure their image truly reflects their vision and attracts the attention it deserves. <br> With a blend of boldness, clarity, and passion, we transform ideas into memorable achievements...",
    titleVision: "Our vision",
    titleMission : "Our mission",
    titleValeurs: "Our values"

  }

};

const imgReal = document.querySelector("#logoDesign")
const projectLogo = document.querySelector("#logoDesign #projects")

imgReal.addEventListener('click',()=>{
  projectLogo.style.display = "block"
  projectLogo.style.animation = "fadeLetIn 0.5s ease-in-out"
})

window.onload = function() {
  document.getElementById("loader").style.display = "none";
};

function openMenu() {
  document.getElementById("sidebar").style.left = "0";
  document.getElementById("overlay").style.display = "block";
}

function closeMenu() {
  document.getElementById("sidebar").style.left = "-250px";
  document.getElementById("overlay").style.display = "none";
}

function toggleSubmenu(event, submenuId) {
  event.preventDefault();
  var submenu = document.getElementById(submenuId);
  submenu.style.display = submenu.style.display === "block" ? "none" : "block";
}
