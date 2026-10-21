// ==========================================================================
// Pixel Café - Interactive Scripts
// ==========================================================================

// --- Home: Generatore di consigli per developer ---
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

// --- Menu: Gestione Menu Interattivo & Simulazione Ordine ---
const menuCheckboxes = document.querySelectorAll(".menu-checkbox");
const submitOrderBtn = document.getElementById("submit-order-btn");
const selectedCountBadge = document.getElementById("selected-count-badge");
const orderTotalPrice = document.getElementById("order-total-price");

const orderModal = document.getElementById("order-modal");
const modalCloseX = document.getElementById("modal-close-x");
const modalCloseBtn = document.getElementById("modal-close-btn");
const modalOrderSummary = document.getElementById("modal-order-summary");

let previouslyFocusedElement = null;

if (menuCheckboxes.length > 0 && submitOrderBtn) {
  function formatEuro(amount) {
    return "€ " + amount.toFixed(2).replace(".", ",");
  }

  function updateOrderSummary() {
    let selectedCount = 0;
    let totalPrice = 0;

    menuCheckboxes.forEach((checkbox) => {
      const row = checkbox.closest(".menu-row");
      if (checkbox.checked) {
        selectedCount++;
        totalPrice += parseFloat(checkbox.dataset.price || 0);
        if (row) row.classList.add("selected");
      } else {
        if (row) row.classList.remove("selected");
      }
    });

    // Aggiorna contatore prodotti selezionati
    if (selectedCountBadge) {
      if (selectedCount === 0) {
        selectedCountBadge.textContent = "0 prodotti selezionati";
      } else if (selectedCount === 1) {
        selectedCountBadge.textContent = "1 prodotto selezionato";
      } else {
        selectedCountBadge.textContent = `${selectedCount} prodotti selezionati`;
      }
    }

    // Aggiorna totale in euro
    if (orderTotalPrice) {
      orderTotalPrice.textContent = `Totale: ${formatEuro(totalPrice)}`;
    }

    // Abilita o disabilita pulsante invio ordine
    submitOrderBtn.disabled = selectedCount === 0;
  }

  // Ascolta i cambiamenti di selezione su ogni checkbox
  menuCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", updateOrderSummary);
  });

  // Funzioni apertura e chiusura modale
  function openOrderModal() {
    if (!orderModal) return;

    // Popola riepilogo dettagliato nella modale
    if (modalOrderSummary) {
      let itemsHtml = '<ul class="modal-order-list">';
      let total = 0;

      menuCheckboxes.forEach((checkbox) => {
        if (checkbox.checked) {
          const name = checkbox.dataset.name;
          const price = parseFloat(checkbox.dataset.price || 0);
          total += price;
          itemsHtml += `<li class="modal-order-item"><span>${name}</span><span>${formatEuro(price)}</span></li>`;
        }
      });

      itemsHtml += "</ul>";
      itemsHtml += `<div class="modal-order-total"><span>Totale Simulato:</span><span>${formatEuro(total)}</span></div>`;
      modalOrderSummary.innerHTML = itemsHtml;
    }

    previouslyFocusedElement = document.activeElement;
    orderModal.removeAttribute("hidden");

    // Attiva transizione visiva CSS
    requestAnimationFrame(() => {
      orderModal.classList.add("is-open");
    });

    document.body.style.overflow = "hidden";

    // Sposta il focus sul pulsante di chiusura per accessibilità
    if (modalCloseBtn) {
      modalCloseBtn.focus();
    }
  }

  function closeOrderModal() {
    if (!orderModal) return;

    orderModal.classList.remove("is-open");
    document.body.style.overflow = "";

    setTimeout(() => {
      orderModal.setAttribute("hidden", "");
      if (previouslyFocusedElement) {
        previouslyFocusedElement.focus();
      }
    }, 250);
  }

  // Invio ordine (simulazione)
  submitOrderBtn.addEventListener("click", function () {
    if (!submitOrderBtn.disabled) {
      openOrderModal();
    }
  });

  // Chiusura da pulsanti
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeOrderModal);
  }

  if (modalCloseX) {
    modalCloseX.addEventListener("click", closeOrderModal);
  }

  // Chiusura al clic su backdrop
  if (orderModal) {
    orderModal.addEventListener("click", function (event) {
      if (event.target === orderModal) {
        closeOrderModal();
      }
    });
  }

  // Chiusura con tasto Escape
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && orderModal && !orderModal.hasAttribute("hidden")) {
      closeOrderModal();
    }
  });

  // Inizializza stato al caricamento della pagina
  updateOrderSummary();
}
