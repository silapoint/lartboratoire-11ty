/*
    Metadata for tags/categories/collections
    Format: 
    tag_used_as_key: {
        "name": (String) readable name,
        "desc": (array) description, each element of the array is outputed as a <p>,
        "image": (String) path to hero image,
        "alt":"",
        "cred": (String) author/credits to the hero image
    }

*/
let exportObj = {}
let catsList = []
let tagsList = []

exportObj.excluded_from_menu = ["article", "devblog", "translated"]

let allCats = {
    "article": {
        "name": "Articles",
        "desc": [
            "Tous les articles publiés sur l'artboratoire sont compilés ici. Cela risque d'être un peu fouilli mais, au moins, vous êtes sûr de ne pas en rater une miette…",
            "Bon périple !"
        ],
        "image": "img/taxonomies/musée.webp",
        "alt": "Salle d'exposition, filtre rose pastel sur l'ensemble de l'image.",
        "cred": "",
    },
    "artistes": {
        "name": "Coin des artistes",
        "desc": [
            "Que vous soyez amateur ou artiste professionnel, voici quelques humbles conseils, astuces et autres informations utiles pour votre activité. Sortez les pinceaux, préparez les objectifs, dans cette catégorie <strong>vous</strong> êtes à l'honneur !"
        ],
        "metadesc": "Que vous soyez amateur ou artiste professionnel, voici quelques humbles conseils, astuces et autres informations utiles pour votre activité.",
        "image": "img/taxonomies/Coin-des-artistes-lartboratoire.webp",
        "alt":"Pots de peinture ouverts sur un drap, filtre rose pastel sur l'ensemble de l'image.",
        "cred": ""
    },
    "decouvertes-artistiques": {
        "name": "Découvertes artistiques",
        "desc": [
            "Découvrir des artistes et leurs œuvres d'art, ça vous tente ? Ne cherchez plus, vous êtes au bon endroit : bienvenue dans les Découvertes Artistiques !",
            "Dans chaque article, un ensemble de créations est mis sous les feux de la rampe et la technique utilisée est présentée, que cela soit de la peinture (à l'huile, à l'eau ou à l'escargot tout chaud), de la photographie, de la sculpture, de la broderie, à l'ordinateur ou avec des brindilles, avec les doigts ou au fusain… Vous devriez trouver de quoi vous plaire !",
        ],
        "metadesc": "Découvrir des artistes et leurs œuvres d'art, ça vous tente ? Ne cherchez plus, vous êtes au bon endroit : bienvenue dans les Découvertes Artistiques !",
        "image": "img/taxonomies/Découvertes-artistiques-Aenami.webp",
        "alt":"Illustration d'Alena Aenami",
        "cred": "<a href='/alena-aenami-digital-painting-contemplatif/'>Alena Aenami</a>"
    },
    "devblog": {
        "name": "Devblog",
        "desc": [
            "Regroupe les articles en rapport avec le fonctionnement ou le design du blog. Au menu : comptes-rendus de mises à jours, développement web, design, SEO et autres. Du web, quoi."
        ],
        "image": "img/taxonomies/breillas_still_here.webp",
        "alt":"Ecran d'une vieille machine affichant \"I'm still here\", couleurs néons avec teintes violettes.",
        "cred": '<a href="https://www.instagram.com/brellias/" rel="nofollow" target="_blank">Breillas</a>'
    },
    "dossiers": {
        "name": "Dossiers (in)complets",
        "desc": [
            "Les dossiers (in)complets tentent de présenter un thème artistique dans sa globalité, en observant une approche à la fois historique et technique, tout en proposant une humble analyse des œuvres d'art. Comme leur nom l'indique, ils ne font que « tenter » tout ceci… et ce n'est déjà pas si mal !",
            "Voici quelques sujets abordés par ici :<br>\
            → <a href='/glitch-art-son/'>le glitch art</a> (son et image) ;<br>\
            → <a href='/origami-science-art/'>l'origami</a> ;<br>\
            → <a href='/art-fractales-decouverte-monde/'>les fractales</a>."
        ],
        "metadesc": "Les dossiers (in)complets tentent de présenter un thème artistique en observant une approche à la fois historique et technique, avec une humble analyse des œuvres.",
        "image": "img/taxonomies/Shadow-Art-dossier-artistique.webp",
        "alt":"Shadow art par Kumi Yamashita, point d'exclamation dont l'ombre forme un point d'interrogation ; filtre rose pastel sur l'ensemble de l'image.",
        "cred": '<a href="/shadow-art-ombre-lumiere/">Kumi Yamashita</a>'
    },
    "p-art-ition": {
        "name": "P'art'ition",
        "desc": [
            "Musique électronique et alternative ; deux vastes thèmes qu'explore HyacinthAorchis dans cette série d'articles. Proposant une analyse technique et émotionnelle des créations musicales complexes, cet aventurier touche-à-tout aura sûrement de quoi vous intéresser dans ses bagages.",
            "Au-delà des deux genres principaux, laissez-vous porter par les sons et les artistes venus de tout horizons au gré des playlists savamment concoctées !"
        ],
        "metadesc": "Musique électronique et alternative ; deux vastes thèmes qu'explore HyacinthAorchis dans cette série d'articles",
        "image": "img/taxonomies/Acupressure-Shine-HyacinthAorchis.webp",
        "alt":"Jeune fille regardant vers la droite, image glitchée, filtre rose pastel sur l'ensemble de l'image.",
        "cred": '<a href="/author/hyacinthaorchis/">HyacinthAorchis</a>'
    },
    "translated": {
        "name": "Translated",
        "desc": [
            "You will find translated articles from the main french feed here. Please excuse the broken english and don't hesitate to report any grammar mistake you may come across; I'm eager to learn!"
        ],
        "metadesc": "Translated content from french to english.",
        "image": "img/taxonomies/Kyle_T_Webster.webp",
        "alt":"Grenouille sur un grand bi, portant un bérêt, baguette sous le bras.",
        "cred": '<a href="http://www.kyletwebster.com/" rel="nofollow" target="_blank">Kyle T. Webster</a>'
    },
}

let allTags = {
    "animation": {
        "name": "Animation",
        "desc": [
            "Dans les jeux vidéos ou les dessins animés, voici l'art en 24 images par secondes. Ou plus. Ou moins.",
            "Quoi qu'il en soit, l'animation est ici à l'honneur !"
        ],
        "image": "img/taxonomies/Gris-le-jeu-vidéo.webp",
        "alt":"Schéma d'animation du personnage du jeu vidéo GRIS, filtre rose pastel sur l'ensemble de l'image.",
        "cred": '<a href="/gris-jeu-video-aquarelle-art/">GRIS</a> - Nomada Studio'
    },
    "aquarelle": {
        "name": "Aquarelle",
        "desc": [
            "L'aquarelle, aussi sobrement nommée peinture à l'eau, est ici à l'honneur. Diluez, distillez, et surtout, admirez les œuvres des différents artistes sélectionnés.",
        ],
        "image": "img/taxonomies/Aquarelle-Marc-Allante.webp",
        "alt":"Aquarelle de Marc Allante, filtre rose pastel sur l'ensemble de l'image.",
        "cred": '<a href="/marc-allante-animaux-couleurs/">Marc Allante</a>'
    },
    "art-abstrait": {
        "name": "Art abstrait",
        "desc": [
            "Dans le royaume de l'art abstrait, tout s'invente, flux tendu entre votre imagination et le medium. Les formes se mêlent et ne se ressemblent pas. Que verrez-vous dans ces créations étranges ?",
        ],
        "image": "img/taxonomies/Art-abstrait-lartboratoire.webp",
        "alt":"Art abstrait, filtre rose pastel sur l'ensemble de l'image.",
        "cred": ""
    },
    "art-insolite": {
        "name": "Art insolite",
        "desc": [
            "Laissez-vous surprendre par des œuvres étonnantes, sortant des sentiers battus artistiques ! Les œuvres d'art sont parfois indéfinissables, inclassables, trop étonnantes pour entrer dans des cases et des catégories… L'art insolite ne se limite pas aux tableaux à bordures dorées que l'on trouve dans les musées ; il jaillit dans les rues, sur les toits, qu'importe la forme pourvu que l'artiste laisse parler sa créativité…",
        ],
        "metadsec": "Laissez-vous surprendre par des œuvres étonnantes, sortant des sentiers battus artistiques !",
        "image": "img/taxonomies/RGB-Carnovsky-art-insolite.webp",
        "alt":"Oeuvre par Carnovsky, filtre rose pastel sur l'ensemble de l'image.",
        "cred": '<a href="/rgb-carnovsky-oeuvres-couleurs/">Carnovsky</a>'
    },
    "concept-art": {
        "name": "Concept art",
        "desc": [
            "Le concept art : un vaste domaine allant du film au jeu vidéo, en passant par l'animation ou la bande dessinée. Représenter un univers avec des croquis ou des illustrations est une tâche ardue… Heureusement, les artistes présentés ici s'y adonnent avec brio !",
        ],
        "metadesc": "Le concept art : un vaste domaine allant du film au jeu vidéo, en passant par l'animation ou la bande dessinée.",
        "image": "img/taxonomies/The-Reader-Charlie-Bowater.webp",
        "alt":"Illustration par Charlie Bowater, filtre rose pastel sur l'ensemble de l'image.",
        "cred": '<a href="/charlie-bowater-personnages-fantastiques/">Charlie Bowater</a>'
    },
    "design-graphisme": {
        "name": "Design & graphisme",
        "desc": [
            "Le design graphique (graphic design en anglais) est une discipline artistique et/ou artisanale permettant de communiquer une information. Les créateurs mis en avant ici utilisent la typographie, la couleur ou encore la photographie intelligemment… Pour le plus grand plaisir de nos mirettes !",
        ],
        "metadesc": "Tout sur le design graphique (graphic design en anglais), large discipline permettant de communiquer au mieux une information.",
        "image": "img/taxonomies/Design-et-Graphisme-lartboratoire.webp",
        "alt":"Forme abstraite, filtre rose pastel sur l'ensemble de l'image.",
        "cred": ""
    },
    "digital-painting": {
        "name": "Digital painting",
        "desc": [
            "Découvrez les créations des artistes maniant tablettes et pinceaux virtuels ! Le digital painting se fait sur un ordinateur, à travers un logiciel, mais cela n'enlève rien à sa beauté. Que ce soit avec Gimp, Photoshop ou Paint, le résultat est splendide alors n'attendez plus…",
        ],
        "metadesc": "Tout sur le digital paiting, réalisations via ordinateur, tablettes et pinceaux virtuels !",
        "image": "img/taxonomies/Digital-painting-Hai.webp",
        "alt":"Illustration par HAI, filtre rose pastel sur l'ensemble de l'image.",
        "cred": '<a href="/pastel-art-tranquillite-illustrations-hai/">HAI</a>'
    },
    "inktober": {
        "name": "Inktober",
        "desc": [
            "Chaque année, le mois d'octobre est marqué par l'Inktober. Ce défi artistique rassemble des milliers de créateurs avec un unique but… Progresser en dessinant chaque jour un nouveau croquis. L'artboratoire vous propose une sélection des œuvres marquantes des différentes éditions avec, en bonus, quelques conseils !",
        ],
        "metadesc": "Thèmes, techniques, listes, sélections... Tout connaître sur l'Inktober, un défi artistique rassemblant des milliers de créateurs chaque octobre !",
        "image": "img/taxonomies/bouteille_loishh_inktober2018.webp",
        "alt":"Jeune femme regardant des bouteilles contenant des parchemins, illustration par Loishh, filtre rose pastel sur l'ensemble de l'image.",
        "cred": '/inktober-2018-selection-semaine-3/">Loishh</a>'
    },
    "peinture": {
        "name": "Peinture",
        "desc": [
            "Gouache, huile, aquarelle, pinceaux et chevalets… Ici, on peinturlure à souhait ; pensez à mettre votre tablier et vous retrousser les manches !",
            "Découvrez les créations de nombreux artistes, tous unis par une forme de peinture. Réaliste, abstraite, sur bois, sur toile, sur un mûr qui picote du pain dur… Qu'importe !",
        ],
        "image": "img/taxonomies/Ivana-Besevic-Peinture.webp",
        "alt":"Portrait d'un jeune homme de couleur, illustration par Ivana Besevic, filtre rose pastel sur l'ensemble de l'image.",
        "cred": '<a href="/ivana-besevic-portraits-emotions/">Ivana Besevic</a>'
    },
    "photographie": {
        "name": "Photographie",
        "desc": [
            "Posez un instant votre appareil photo et admirez les créations des artistes venus du monde entier ! Qu'elle soit amatrice ou professionnelle, surréaliste ou non, un portrait ou un paysage… vous trouverez sûrement photographie à votre goût !",
        ],
        "metadesc": "Ici, la photographie sous toutes ses formes et techniques est à l'honneur !",
        "image": "img/taxonomies/Appareil-photo-Alexander-Andrews.webp",
        "alt":"Vieil appareil photo, filtre rose pastel sur l'ensemble de l'image.",
        "cred": ""
    },
    "sculpture": {
        "name": "Sculpture",
        "desc": [
            "Si les sculptures vous laissent de marbre, il est peut-être temps de jeter un œil par ici.",
            "Fil de fer, verre, pierre ou pointe de crayon… Tout est sculpté, ciselé, et, nous l'espérons, apprécié !",
        ],
        "image": "img/taxonomies/Janusz-Jurek-sculpture.webp",
        "alt":"Sculpture féminine par Janusz Jurek, filtre rose pastel sur l'ensemble de l'image.",
        "cred": '<a href="/art-generatif-corps-humain-janusz-jurek/">Janusz Jurek</a>'
    },
    "stenope": {
        "name": "Sténopé",
        "desc": [
            "Vous pensiez être un hipster avec votre appareil argentique ? Attendez de découvrir le sténopé, l'ancêtre de la photographie ! S'il semble archaïque, ce procédé technique laisse une grande part à l'émotion…",
        ],
        "metadesc": "Vous pensiez être un hipster avec votre appareil argentique ? Attendez de découvrir le sténopé, l'ancêtre de la photographie !",
        "image": "img/taxonomies/Sténopé-Sténopé-Chris-Keeney.webp",
        "alt":"Sténopé en double exposition d'un enfant à plage par Chris Keeney, filtre rose pastel sur l'ensemble de l'image.",
        "cred": '<a href="/stenope-ressourcer-photographie/">Chris Keeney</a>'
    },
    "street-art": {
        "name": "Street art",
        "desc": [
            "Les murs des villes sont autant de tableaux sur lesquels s'exprimer. La communauté street art l'a bien compris… Admirez les créations d'artistes urbains aux travaux variés, prenant d'assaut le béton.",
        ],
        "metadesc": "Tout sur le street art, les graffitis, tags, et autres tableaux urbains.",
        "image": "img/taxonomies/Street-art-et-tags.webp",
        "alt":"Tags dans une ruelle, filtre rose pastel sur l'ensemble de l'image.",
        "cred": ""
    },
    "surrealisme": {
        "name": "Surréalisme",
        "desc": [
            "Parfois, la réalité ne suffit plus à l'imagination. Le surréalisme vient à la rescousse et des univers incroyables naissent. Laissez-vous emporter dans les œuvres vertigineuses et poétiques d'artistes tous plus talentueux les uns que les autres !",
        ],
        "metadesc": "Parfois, la réalité ne suffit plus à l'imagination. Découvrez les œuvres vertigineuses et poétiques d'artistes tous plus talentueux les uns que les autres !",
        "image": "img/taxonomies/Impact-Erik-Johansson.webp",
        "alt":"Photo-montage d'Erik Johansson dans un canoë brisant le miroir formé par un lac, filtre rose pastel sur l'ensemble de l'image.",
        "cred": '<a href="/erik-johansson-photographie-surrealiste/">Erik Johansson</a>'
    },
}

function addToExportObj(exportObj, objKey, obj, listKey, list) {
    exportObj[objKey] = {}
    

    for(let [key, val] of Object.entries(obj)) {
        exportObj[objKey][key] = val 
        list.push(key)
    }
    exportObj[listKey] = list
}

exportObj['all'] = {...allCats, ...allTags}

addToExportObj(exportObj, 'categorie', allCats, 'cats_list', catsList)
addToExportObj(exportObj, 'tag', allTags, 'tags_list', tagsList)

module.exports = exportObj