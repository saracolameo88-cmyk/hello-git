const consigli = [
  "Fai un commit ogni volta che qualcosa funziona.",
  "Scrivi messaggi di commit che capiresti anche tra sei mesi.",
  "Prima di chiedere aiuto, lancia git status.",
  "Non salvare mai password e chiavi nel repository.",
  "Il caffè non risolve i bug, ma aiuta a cercarli.",
  "Se il codice funziona al primo colpo, diffida e testa di nuovo.",
  "Un refactoring al giorno toglie il debito tecnico di torno.",
  "La documentazione migliore è quella scritta prima di dimenticare perché l'hai fatto."
];

const bottone = document.getElementById("quote-btn");
const testo = document.getElementById("quote");

let ultimoIndice = -1;

if (bottone && testo) {
  bottone.addEventListener("click", function () {
    let indice;
    // Evita di mostrare due volte di fila lo stesso consiglio
    do {
      indice = Math.floor(Math.random() * consigli.length);
    } while (consigli.length > 1 && indice === ultimoIndice);
    
    ultimoIndice = indice;

    // Transizione fluida di fade
    testo.classList.add("fade-out");
    testo.classList.remove("fade-in");

    setTimeout(() => {
      testo.textContent = consigli[indice];
      testo.classList.remove("fade-out");
      testo.classList.add("fade-in");
    }, 150);
  });
}
