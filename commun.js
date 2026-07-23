// ============================================================
//  LUMIÈRE QUOTIDIENNE — Fonctions communes à toutes les pages
// ============================================================

// ── I18N — Système multilingue ──
var LANGUES_DISPONIBLES = ['fr','en','es','pt','de','it'];
var texteOriginalFR = {}; // stocke le texte français d'origine pour pouvoir y revenir

function langueActuelle() {
  var l = localStorage.getItem('lqLangue');
  return LANGUES_DISPONIBLES.includes(l) ? l : 'fr';
}

function appliquerTraductions(lang) {
  var elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(function(el) {
    var key = el.getAttribute('data-i18n');
    if (!(key in texteOriginalFR)) texteOriginalFR[key] = el.textContent;
    if (lang === 'fr') {
      el.textContent = texteOriginalFR[key];
    } else if (typeof UI_STRINGS !== 'undefined' && UI_STRINGS[lang] && UI_STRINGS[lang][key]) {
      el.textContent = UI_STRINGS[lang][key];
    }
  });
  // Placeholders des champs de formulaire
  document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
    var key = el.getAttribute('data-i18n-placeholder');
    var origKey = '_ph_' + key;
    if (!(origKey in texteOriginalFR)) texteOriginalFR[origKey] = el.getAttribute('placeholder');
    if (lang === 'fr') {
      el.setAttribute('placeholder', texteOriginalFR[origKey]);
    } else if (typeof UI_STRINGS !== 'undefined' && UI_STRINGS[lang] && UI_STRINGS[lang][key]) {
      el.setAttribute('placeholder', UI_STRINGS[lang][key]);
    }
  });
  document.documentElement.setAttribute('lang', lang);
  document.querySelectorAll('.lang-switch').forEach(function(sel) { sel.value = lang; });
}

function changerLangue(lang) {
  if (!LANGUES_DISPONIBLES.includes(lang)) return;
  localStorage.setItem('lqLangue', lang);
  appliquerTraductions(lang);
  // Si la page affiche le contenu du jour (index.html), on le rafraîchit dans la nouvelle langue
  if (typeof rafraichirContenuJourLangue === 'function') rafraichirContenuJourLangue(lang);
}

function initI18n() {
  appliquerTraductions(langueActuelle());
}

// Toast
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

// Copier texte
function copierTexte(btn, texte) {
  var lang = langueActuelle();
  var labelCopie = (typeof UI_STRINGS !== 'undefined' && UI_STRINGS[lang] && UI_STRINGS[lang].copier_copie) || '✅ Copié !';
  var labelDefaut = (typeof UI_STRINGS !== 'undefined' && UI_STRINGS[lang] && UI_STRINGS[lang].copier_defaut) || '📋 Copier';
  navigator.clipboard.writeText(texte)
    .then(() => { btn.textContent = labelCopie; setTimeout(() => btn.textContent = labelDefaut, 2000); })
    .catch(() => {
      var msg = (typeof UI_STRINGS !== 'undefined' && UI_STRINGS[lang] && UI_STRINGS[lang].toast_copie_indisponible) || 'Copie non disponible.';
      showToast(msg);
    });
}

// Hamburger menu
function initHamburger() {
  const btn = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => menu.classList.toggle('open'));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
}

// Marquer le lien actif dans la navbar
function initNavActive() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}

// Newsletter Formspree
async function soumettreNewsletter(e) {
  e.preventDefault();
  const btn = document.getElementById('nlBtn');
  const succes = document.getElementById('nlSucces');
  const erreur = document.getElementById('nlErreur');
  if (succes) succes.style.display = 'none';
  if (erreur) erreur.style.display = 'none';
  if (btn) { btn.textContent = 'Inscription…'; btn.disabled = true; }
  try {
    const res = await fetch('https://formspree.io/f/mqevyqdy', {
      method: 'POST',
      body: new FormData(document.getElementById('nlForm')),
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      if (succes) succes.style.display = 'block';
      document.getElementById('nlForm').reset();
    } else {
      if (erreur) erreur.style.display = 'block';
    }
  } catch(err) {
    if (erreur) erreur.style.display = 'block';
  }
  if (btn) { btn.textContent = "S'inscrire 🙏"; btn.disabled = false; }
  return false;
}

// Init au chargement
document.addEventListener('DOMContentLoaded', () => {
  initHamburger();
  initNavActive();
  initI18n();
});
