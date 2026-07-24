// ============================================================
//  LUMIÈRE QUOTIDIENNE — Fonctions communes à toutes les pages
// ============================================================

// ── I18N — Système multilingue (chargement différé) ──
// traductions.js (64 Ko) n'est téléchargé que si le visiteur change
// réellement de langue — pas au chargement de la page. La grande
// majorité des visiteurs (francophones) ne le téléchargent jamais.
var LANGUES_DISPONIBLES = ['fr','en','es','pt','de','it'];
var texteOriginalFR = {}; // stocke le texte français d'origine pour pouvoir y revenir
var traductionsChargees = false;
var traductionsEnCours = null;

function langueActuelle() {
  var l = localStorage.getItem('lqLangue');
  return LANGUES_DISPONIBLES.includes(l) ? l : 'fr';
}

function chargerTraductions(callback) {
  if (traductionsChargees || typeof UI_STRINGS !== 'undefined') {
    traductionsChargees = true;
    callback();
    return;
  }
  if (traductionsEnCours) {
    traductionsEnCours.addEventListener('load', callback);
    return;
  }
  var script = document.createElement('script');
  script.src = 'traductions.js';
  script.onload = function() { traductionsChargees = true; callback(); };
  traductionsEnCours = script;
  document.head.appendChild(script);
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
  chargerTraductions(function() {
    appliquerTraductions(lang);
    // Si la page affiche le contenu du jour (index.html), on le rafraîchit dans la nouvelle langue
    if (typeof rafraichirContenuJourLangue === 'function') rafraichirContenuJourLangue(lang);
  });
}

function initI18n() {
  var lang = langueActuelle();
  document.querySelectorAll('.lang-switch').forEach(function(sel) { sel.value = lang; });
  if (lang === 'fr') return; // rien à charger, le HTML est déjà en français
  chargerTraductions(function() {
    appliquerTraductions(lang);
    if (typeof rafraichirContenuJourLangue === 'function') rafraichirContenuJourLangue(lang);
  });
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

// Init au chargement
document.addEventListener('DOMContentLoaded', () => {
  initHamburger();
  initNavActive();
  initI18n();
});
