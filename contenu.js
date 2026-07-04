// ============================================================
//  LUMIÈRE QUOTIDIENNE — Système mixte automatique + manuel
//  
//  👉 CHAQUE MATIN : modifie uniquement la section "AUJOURD'HUI"
//  👉 Si tu ne changes rien → le verset du jour s'affiche auto
//  👉 Si tu veux un verset spécial → remplis la section ci-dessous
// ============================================================

// ─────────────────────────────────────────────────────────────
//  ✏️  SECTION À MODIFIER CHAQUE MATIN (optionnel)
//  Laisse vide ("") pour utiliser le contenu automatique du jour
// ─────────────────────────────────────────────────────────────
var AUJOURD_HUI = {
  verset:    "",   // Ex: "« Ta parole est une lampe à mes pieds... »"
  reference: "",   // Ex: "Psaume 119 : 105"
  versetBonus:    "",
  referenceBonus: "",
  reflexion: [],   // Ex: ["Paragraphe 1...", "Paragraphe 2..."]
  priere:    "",   // Ex: "Seigneur, aide-moi à..."
};

// ─────────────────────────────────────────────────────────────
//  🔄  CONTENU AUTOMATIQUE PAR JOUR (modifie si tu veux)
// ─────────────────────────────────────────────────────────────
var CONTENU_SEMAINE = {

  0: { // DIMANCHE
    verset: "« Je me réjouis de ceux qui m'ont dit : Allons à la maison de l'Éternel ! »",
    reference: "Psaume 122 : 1",
    versetBonus: "« Là où deux ou trois sont assemblés en mon nom, je suis au milieu d'eux. »",
    referenceBonus: "Matthieu 18 : 20",
    reflexion: [
      "Le dimanche est un jour particulier — un jour où le peuple de Dieu se rassemble pour adorer, pour être enseigné, pour s'encourager mutuellement. Ce n'est pas une tradition vide de sens : c'est un acte de foi collectif qui nous rappelle que nous ne marchons pas seuls.",
      "Quand tu entres dans la maison de Dieu aujourd'hui, ne le fais pas par habitude ou par obligation. Entre avec un cœur ouvert, prêt à recevoir. Dieu veut te parler aujourd'hui.",
      "Et si tu ne peux pas te rassembler avec d'autres aujourd'hui, souviens-toi : là où tu es, tu peux adorer. Dieu est présent avec toi, même seul dans ta chambre."
    ],
    priere: "Père, en ce jour consacré à Ton adoration, je viens devant Toi avec un cœur reconnaissant. Parle-moi à travers Ta Parole, touche-moi par Ton Esprit. Que ce dimanche soit un véritable jour de ressourcement spirituel. Au nom de Jésus, Amen."
  },

  1: { // LUNDI
    verset: "« Je connais les projets que j'ai formés sur vous… projets de paix et non de malheur, pour vous donner un avenir et de l'espérance. »",
    reference: "Jérémie 29 : 11",
    versetBonus: "« L'Éternel est mon berger, je ne manquerai de rien. »",
    referenceBonus: "Psaume 23 : 1",
    reflexion: [
      "Le lundi peut parfois sembler lourd — une nouvelle semaine qui commence, des défis qui attendent, des incertitudes qui pèsent. Mais avant de regarder ton agenda, regarde cette parole : Dieu connaît les projets qu'Il a formés sur toi. Des projets précis, pensés avec soin, remplis de paix.",
      "Il ne te demande pas de tout comprendre aujourd'hui. Il te demande juste de commencer cette semaine avec Lui. Un pas à la fois, une journée à la fois.",
      "Commence cette semaine non pas dans l'inquiétude, mais dans la confiance. Dieu est déjà dans ton lundi."
    ],
    priere: "Seigneur, je Te confie cette nouvelle semaine. Là où je ne vois que des obstacles, aide-moi à voir Tes opportunités. Que chaque journée soit marquée par Ta présence et Ta grâce. Guide mes pas, mes paroles et mes décisions. Au nom de Jésus, Amen."
  },

  2: { // MARDI
    verset: "« Tu lui donneras la paix parfaite, à celui dont l'esprit est soutenu par toi, parce qu'il se confie en toi. »",
    reference: "Ésaïe 26 : 3",
    versetBonus: "« Ne vous inquiétez de rien, mais en toute chose faites connaître vos besoins à Dieu. »",
    referenceBonus: "Philippiens 4 : 6",
    reflexion: [
      "La paix n'est pas l'absence de problèmes — c'est la présence de Dieu au milieu des problèmes. Aujourd'hui, peut-être que ton cœur est agité. Dieu te dit : fixe ton esprit sur Moi, et je te donnerai une paix parfaite.",
      "Cette paix ne dépend pas de tes circonstances. Elle vient d'une seule source : la confiance placée en Celui qui tient toutes choses entre Ses mains.",
      "Aujourd'hui, chaque fois qu'une pensée d'anxiété arrive, transforme-la en prière. C'est le secret d'une vie dans la paix de Dieu."
    ],
    priere: "Père céleste, mon cœur a besoin de Ta paix aujourd'hui. Je pose devant Toi chaque inquiétude, chaque peur, chaque question sans réponse. Que Ta paix qui dépasse tout entendement garde mon cœur. Au nom de Jésus, Amen."
  },

  3: { // MERCREDI
    verset: "« C'est pourquoi je puis tout par celui qui me fortifie. »",
    reference: "Philippiens 4 : 13",
    versetBonus: "« Fortifie-toi et prends courage ! Ne t'effraie point, car l'Éternel, ton Dieu, est avec toi. »",
    referenceBonus: "Josué 1 : 9",
    reflexion: [
      "Au milieu de la semaine, la fatigue peut commencer à se faire sentir. C'est précisément là que Dieu veut te rappeler cette vérité : ce n'est pas ta force qui fait la différence — c'est la Sienne.",
      "Paul n'a pas dit 'je peux tout par moi-même'. Il a dit 'je puis tout par Celui qui me fortifie'. Quand tu es faible, Il est fort.",
      "Ne regarde pas ce qui te manque aujourd'hui. Regarde Celui qui comble tout manque. Puise en Lui la force dont tu as besoin."
    ],
    priere: "Seigneur Jésus, mes forces humaines ont des limites, mais les Tiennes n'en ont pas. Aujourd'hui je m'appuie sur Toi. Fortifie-moi par Ton Esprit et donne-moi la sagesse pour accomplir tout ce que Tu as placé devant moi. Au nom de Jésus, Amen."
  },

  4: { // JEUDI
    verset: "« Cherchez premièrement le royaume et la justice de Dieu, et toutes ces choses vous seront données par-dessus. »",
    reference: "Matthieu 6 : 33",
    versetBonus: "« Remets ton sort à l'Éternel, mets en lui ta confiance, et il agira. »",
    referenceBonus: "Psaume 37 : 5",
    reflexion: [
      "Nous vivons dans un monde qui nous pousse à chercher d'abord le succès, l'argent, la reconnaissance. Jésus nous invite à inverser l'ordre des priorités : cherche d'abord Dieu, et tout le reste suivra.",
      "Quand Dieu est au centre de tes journées, tes décisions changent. Tu commences à voir les situations avec Ses yeux plutôt qu'avec les tiens.",
      "Aujourd'hui, avant de penser à tes besoins, prends un moment pour chercher Sa face. C'est dans ce lieu que tout prend sa juste place."
    ],
    priere: "Père, pardonne-moi les fois où j'ai mis mes préoccupations avant Ta présence. Aujourd'hui je Te remets la première place. Guide mes priorités et pourvois à tous mes besoins selon Tes richesses. Au nom de Jésus, Amen."
  },

  5: { // VENDREDI
    verset: "« Rendez grâces en toutes choses, car c'est à votre égard la volonté de Dieu en Jésus-Christ. »",
    reference: "1 Thessaloniciens 5 : 18",
    versetBonus: "« C'est le jour que l'Éternel a fait : réjouissons-nous et soyons dans l'allégresse ! »",
    referenceBonus: "Psaume 118 : 24",
    reflexion: [
      "La fin de la semaine approche. Avant de te laisser emporter par la joie du weekend ou par la fatigue accumulée, prends un moment pour regarder en arrière : qu'est-ce que Dieu a fait pour toi cette semaine ?",
      "La reconnaissance est une discipline spirituelle puissante. Elle change notre regard sur la vie. Quand tu commences à voir les cadeaux de Dieu dans le quotidien, ton cœur se remplit d'une joie que les circonstances ne peuvent pas voler.",
      "Termine cette semaine avec un cœur reconnaissant. Remercie Dieu non seulement pour ce qu'Il a fait, mais pour ce qu'Il est."
    ],
    priere: "Seigneur, merci pour cette semaine. Merci pour Tes protections visibles et invisibles, pour Tes provisions, pour Ta fidélité. Je Te loue non seulement pour ce que Tu as fait, mais pour qui Tu es. Au nom de Jésus, Amen."
  },

  6: { // SAMEDI
    verset: "« Venez à moi, vous tous qui êtes fatigués et chargés, et je vous donnerai du repos. »",
    reference: "Matthieu 11 : 28",
    versetBonus: "« Il donne de la force à celui qui est fatigué, et il augmente la vigueur de celui qui est à bout de forces. »",
    referenceBonus: "Ésaïe 40 : 29",
    reflexion: [
      "Le samedi est souvent le jour où l'on reprend souffle. Mais parfois même le repos du corps ne suffit pas — c'est l'âme qui est fatiguée. Des semaines difficiles s'accumulent, des fardeaux non résolus pèsent.",
      "Jésus t'invite aujourd'hui à une forme de repos différente : venir à Lui. Pas avec des formules parfaites — venir simplement, tel que tu es, fatigué et chargé. Il promet Lui-même de te donner le repos.",
      "Profite de ce samedi pour te reposer vraiment — non seulement en dormant ou en te détendant, mais en passant du temps dans Sa présence."
    ],
    priere: "Seigneur Jésus, je viens à Toi tel que je suis. Je pose devant Toi la fatigue de cette semaine et les fardeaux que j'ai portés. Tu as promis du repos — je le reçois par la foi. Restaure mon âme et prépare-moi pour la semaine à venir. Au nom de Jésus, Amen."
  }

};

// ─────────────────────────────────────────────────────────────
//  ⚙️  LOGIQUE AUTOMATIQUE — Ne pas modifier
//  Fusionne le contenu automatique avec le contenu manuel
// ─────────────────────────────────────────────────────────────
var jourSemaine = new Date().getDay();
var CONTENU = CONTENU_SEMAINE[jourSemaine];

// Si tu as rempli AUJOURD_HUI, ça remplace le contenu automatique
if (AUJOURD_HUI.verset)    CONTENU.verset    = AUJOURD_HUI.verset;
if (AUJOURD_HUI.reference) CONTENU.reference = AUJOURD_HUI.reference;
if (AUJOURD_HUI.versetBonus)    CONTENU.versetBonus    = AUJOURD_HUI.versetBonus;
if (AUJOURD_HUI.referenceBonus) CONTENU.referenceBonus = AUJOURD_HUI.referenceBonus;
if (AUJOURD_HUI.reflexion && AUJOURD_HUI.reflexion.length > 0) CONTENU.reflexion = AUJOURD_HUI.reflexion;
if (AUJOURD_HUI.priere)    CONTENU.priere    = AUJOURD_HUI.priere;
