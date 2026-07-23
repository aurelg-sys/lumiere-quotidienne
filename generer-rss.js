// ============================================================
//  LUMIÈRE QUOTIDIENNE — Générateur de flux RSS quotidien
//  Lu par une GitHub Action chaque matin, ce script :
//  - lit contenu.js (le même contenu que celui affiché sur le site)
//  - construit un item RSS pour le jour présent
//  - garde un historique glissant des 7 derniers jours
//  Brevo (RSS Campaign) lit ensuite ce fichier rss.xml et envoie
//  automatiquement l'email quand un nouvel item apparaît.
// ============================================================

const fs = require('fs');
const path = require('path');

const CONTENU_PATH = path.join(__dirname, 'contenu.js');
const RSS_PATH = path.join(__dirname, 'rss.xml');
const SITE_URL = 'https://aurelg-sys.github.io/lumiere-quotidienne';

// --- Charger contenu.js (déclare `var CONTENU_SEMAINE` et `var AUJOURD_HUI`) ---
const contenuCode = fs.readFileSync(CONTENU_PATH, 'utf8');
const sandbox = {};
new Function('exports', contenuCode + '\nexports.CONTENU_SEMAINE = CONTENU_SEMAINE; exports.AUJOURD_HUI = AUJOURD_HUI;')(sandbox);
const { CONTENU_SEMAINE, AUJOURD_HUI } = sandbox;

function pad(n) { return String(n).padStart(2, '0'); }
function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// --- Date du jour à l'heure du Bénin (WAT = UTC+1, pas de changement d'heure saisonnier) ---
const now = new Date(Date.now() + 60 * 60 * 1000);
const dayIndex = now.getUTCDay();
const dateStr = `${now.getUTCFullYear()}-${pad(now.getUTCMonth() + 1)}-${pad(now.getUTCDate())}`;
const JOURS = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

// --- Contenu du jour + surcharge manuelle éventuelle (AUJOURD_HUI) ---
let data = { ...CONTENU_SEMAINE[dayIndex] };
if (AUJOURD_HUI.verset) data.verset = AUJOURD_HUI.verset;
if (AUJOURD_HUI.reference) data.reference = AUJOURD_HUI.reference;
if (AUJOURD_HUI.versetBonus) data.versetBonus = AUJOURD_HUI.versetBonus;
if (AUJOURD_HUI.referenceBonus) data.referenceBonus = AUJOURD_HUI.referenceBonus;
if (AUJOURD_HUI.reflexion && AUJOURD_HUI.reflexion.length > 0) data.reflexion = AUJOURD_HUI.reflexion;
if (AUJOURD_HUI.priere) data.priere = AUJOURD_HUI.priere;

const reflexionHtml = data.reflexion.map(p => `<p>${esc(p)}</p>`).join('\n');

const descriptionHtml = `
<p style="font-family:Georgia,serif;font-style:italic;font-size:17px;color:#211F1A;">${esc(data.verset)}</p>
<p style="font-size:13px;color:#8C6226;font-weight:bold;">— ${esc(data.reference)}</p>
${reflexionHtml}
<p style="margin-top:16px;"><strong>Prière du jour :</strong><br/>${esc(data.priere)}</p>
<p style="font-size:12px;color:#8C8577;margin-top:16px;">✦ Verset bonus : ${esc(data.versetBonus)} — ${esc(data.referenceBonus)}</p>
`.trim();

const guid = `lumiere-quotidienne-${dateStr}`;
const pubDate = now.toUTCString();

const newItem = `  <item>
    <title>${esc(JOURS[dayIndex])} ${dateStr} — ${esc(data.reference)}</title>
    <link>${SITE_URL}/index.html</link>
    <guid isPermaLink="false">${guid}</guid>
    <pubDate>${pubDate}</pubDate>
    <description><![CDATA[${descriptionHtml}]]></description>
  </item>`;

// --- Historique glissant : on garde les items précédents (max 7), sauf si même guid ---
let previousItems = [];
if (fs.existsSync(RSS_PATH)) {
  const existing = fs.readFileSync(RSS_PATH, 'utf8');
  const matches = existing.match(/<item>[\s\S]*?<\/item>/g) || [];
  previousItems = matches.filter(it => !it.includes(`<guid isPermaLink="false">${guid}</guid>`));
}
const allItems = [newItem, ...previousItems].slice(0, 7);

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>Lumière Quotidienne</title>
  <link>${SITE_URL}/</link>
  <description>Un verset, une réflexion, une prière chaque jour — centré sur Jésus-Christ.</description>
  <language>fr</language>
  <lastBuildDate>${pubDate}</lastBuildDate>
${allItems.join('\n')}
</channel>
</rss>
`;

fs.writeFileSync(RSS_PATH, rss);
console.log(`✅ rss.xml généré pour ${JOURS[dayIndex]} ${dateStr} — ${data.reference}`);
