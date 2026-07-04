// ============================================================
//  LUMIÈRE QUOTIDIENNE — Fonctions communes à toutes les pages
// ============================================================

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
  navigator.clipboard.writeText(texte)
    .then(() => { btn.textContent = '✅ Copié !'; setTimeout(() => btn.textContent = '📋 Copier', 2000); })
    .catch(() => showToast('Copie non disponible.'));
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
});
