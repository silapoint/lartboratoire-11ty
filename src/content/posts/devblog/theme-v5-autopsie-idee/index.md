---
title: "Thème version 5 : autopsie d'une idée"
published: "2020-03-03"
author: "lartboratoire"
thumbnail: "img/typewriter_lartboratoire.jpg"
thumbnail_alt: "Machine à écrire avec 'woops' écrit sur la feuille"
seo: 
    desc: "Présentation détaillée plus ou moins technique de la 5ème version du thème WordPress."
---

Pas de nouvelle depuis plusieurs mois ? Sûrement parce que j'ai eu la bonne idée de refondre la totalité du thème de ce site. Évidemment, comme à chaque fois, l'envie de vous en parler me démange et le besoin de garder une trace synthétique se fait sentir. Voici un tour d'horizon express des dernières nouvelles de l'arrière-scène technique de l'artboratoire.

Au programme :

[[toc]]

## Philosophie initiale

Comme tout projet s'étalant sur plusieurs années et géré par un étudiant désoeuvré, le thème précédent souffrait d'un rangement relativement peu intuitif, pour ne pas dire digne des écuries d'Augias. À défaut d'arriver à les nettoyer correctement, autant tout raser. Partant de ce principe somme toute subtil et plein de bon sens, j'ai commencé à réfléchir à ce que je recherchais.

## Le graphisme, c'est compliqué

### Épurer les pixels

Tout d'abord, le courant lié aux sites ultra-minimalistes, cristallisé par les magnifiques [motherfuckingwebsite.com](https://motherfuckingwebsite.com/), [bettermotherfuckingwebsite.com](http://bettermotherfuckingwebsite.com/) et enfin [perfectmotherfuckingwebsite.com](https://perfectmotherfuckingwebsite.com/), a fortement influencé la phase de conception. Il faut aussi avouer que la faiblesse de mon forfait 3G tremblottant a donné naissance à une haine farouche et tumultueuse envers les sites mettant plus de 2 secondes à charger, le tout pour offrir 4 pop-up et 27 publicités. Néanmoins tiraillé entre cette représentation d'un web épuré à souhait et les oeuvres d'art (au modique prix de 70Mb par pages) encensées aux Awwwards, je suis parti du principe que cette splendide animation WebGL n'était probablement pas nécessaire mais qu'un joli menu, ce serait pas de trop.

Pour résumer : je voulais créer un site dont l'utilisation m'aurait fait plaisir. Un site loin des béhémoths inchargeables et inutilisables. Un site simple sans être spartiate, accueillant et bienveillant.

D'un point de vue général, je souhaitais améliorer la lisibilité du contenu et j'espère que jusqu'ici vos yeux ne se sont pas décrochés de leurs orbites. Meilleure taille d'interlignes, espacements, type de police... Puisque ce site a la prétention de proposer du contenu moyennement long, offrir une expérience de lecture agréable m'a semblé être une priorité. (Il reste encore des détails à régler mais l'idée est là.)

Autre symptôme fâcheux d'un projet monolithique et gargantuesque, c'est que supprimer une règle CSS peut entrainer une cascade d'évènements imprévisbles menant à la disparition pure et simple du menu les soirs de pleine lune. Cette refonte devait donc organiser le code mais aussi supprimer les disparités de style observées entre les différents articles, catégories ou pages.

### Le material design : une vaste (et rosée) supercherie

Pour m'aider à appréhender ces problématiques ô combien complexes mais stimulantes, je me suis armé d'une boîte à outils graphique (re)connue : le material design. Oui, c'est de la triche. Oui, c'est injuste ; mais que voulez-vous, la vie est ainsi. Et puis, ce n'est pas comme si vous ne vous en doutiez pas en voyant le menu ou les sortes de cartes un peu partout. Fallait s'y attendre.

{% Figure "img/figma02.png", "Figma à la rescousse", "Figma à la rescousse" %}

Bref, ce qui est compliqué avec le material design, c'est que l'image de marque peut se dissoudre dans un gloubiboulga de principes stylisés répliqués à l'infini sur tous les sites du monde. Profitant de l'occasion pour revoir rapidement le logo du blog, j'ai sélectionné une sorte de rose-vaporwave-mais-pas-trop-pour-rester-accessible. Fil conducteur graphique tout au long de la navigation, son côté atypique renvoie entre autre à l'annonce initiale : _découvrir l'art autrement_. Ça, et les yeux globuleux de la statue sur la page d'accueil.

L'équilibre entre personnalisation du standard pour une touche d'originalité et erreurs graphiques malencontreuses est précaire. J'espère ne pas m'être écroulé d'un côté ou de l'autre du fil tendu.

Au passage, la plupart des images utilisées proviennent d'[Unsplash](https://unsplash.com/) avant d'être retouchées par mes soins. Testé et approuvé.

## La Communauté de l'artbo

D'ores-et-déjà navré pour le jeu de mot douteux. Quoi qu'il en soit, je souhaitais mettre davantage l'accent sur la participation potentielle au site. Manière simple de proposer du contenu varié et d'apporter une pluralité des points de vue sur ce site, c'est une voie déjà empruntée qui me semble prometteuse pour la suite.

En pratique, cette volonté s'est sobrement matérialisée (hé) par une mise en avant dans le menu ainsi que la présence récurrente de la carte appelant à participer. En parallèle, une refonte de la [page associée](/participer/) a été effectuée ; elle est toute-belle-toute-propre !

## Un bon site non-accessible devrait renvoyer une erreur 500

Un point étroitement lié au retour aux racines du web est celui de l'accessibilité. Il s'avère qu'un aléa d'ADN favorable - et mon jeune âge - me protègent contre la cécité et de certains autres symptômes déséagréables voire handicapants lorsque l'on navigue sur Internet. Ce qui n'est absolument pas le cas de tout le monde. Je vous renvoie au passage vers l'excellent article [The Veil of Ignorance](https://mrmrs.cc/writing/the-veil-of-ignorance/).

Étant loin, très loin, d'être un professionnel du secteur, le titre tapageur de cette partie voudrait que ce site soit décédé dans les plus brefs délais. Pourtant, le phénix éternel qu'est ce thème tente encore et toujours d'être appréhendé au mieux par toutes et tous.

### HTML et sémantique, name a more iconic duo

Dans la lignée des efforts entamés lors de la version 4 du thème, j'ai utilisé une flopée de tags HTML sémantiquement corrects. Certes, "article" ou "section" ne servent pas à grand chose en terme d'accessibilité, mais utiliser un "nav" pour signaler un menu ou un vrai "bouton" à la place d'un lien avec une classe "btn" (on vous voit, les utilisateurs de Bootstrap) est toujours un plaisir dont on ne se privera pas.

### Aria-label accessibilité que voilà

La grande nouveauté provient de l'ajout des [attributs ARIA](https://a11yproject.com/posts/getting-started-aria/). Je connaissais seulement le nom en me lançant dans l'implémentation du menu (là, celles et ceux sachant dans quoi je m'engage rient de bon coeur). Après plusieurs litres de sang écoulés par les globes oculaires et la lecture de nombreux tutoriels, arguments et [contre-arguments](https://adrianroselli.com/2017/10/dont-use-aria-menu-roles-for-site-nav.html), j'en suis arrivé à la conclusion fulgurante d'intelligence suivante : l'accessibilité, c'est compliqué.

Fort de cet apprentissage et armé de mes meilleurs aria-haspopup et aria-expanded, j'ai finalement implémenté le menu du mieux possible. Normalement, il fonctionne presque bien.

Un autre exemple de l'utilisation des labels ARIA réside dans la magnifique (si, si, avouez-le) animation du titre de la page de garde ou de l'erreur 404, sur ordinateur. En effet, découper le texte en autant de "span" qu'il n'y a de lettres rend le tout ignoble pour les assistants vocaux. La solution, gentiment souflée par le tip-top [css-irl.info](https://css-irl.info/how-to-accessibly-split-text/) est d'utiliser aria-label sur le titre et aria-hidden sur chaque sous-élément. Effet garanti sans subterfuge.

### Animations et JavaScript ? Surcôtés

Si parler d'accessibilité renvoie souvent aux personnes malvoyantes, c'est un terme qui englobe bien plus d'affects. La surcharge visuelle liée à la navigation sur le web en fait partie, pouvant mener à des nausées ou vertiges devant trop d'animations. Conscient de ce problème, j'ai de base réduit les animations présentes sur l'artboratoire. Par ailleurs, le site respecte le paramétrage de _prefer-reduced-motion_, autant pour les animations CSS que celle JavaScript (oui).

{% Figure "img/a11y_animations.jpg", "Réduction des animations en fonction de la préférence utilisateur", "Réduction des animations en fonction de la préférence utilisateur (pas besoin de lire, croyez-moi sur parole)" %}

Toujours dans le prolongement philosophique des sites minimalistes précédents, l'artboratoire est désormais totalement utilisable sans JavaScript. Lubie frivole, rétorquerez-vous. [Que nenni](https://kryogenix.org/code/browser/everyonehasjs.html), réponds-je avec véhémence. La version 4, avec son magnifique écran de chargement, ne permettait pas une telle performance (enfin, si, possiblement, mais je ne l'avais pas fait) ; le tord est désormais à demi-pardonné. Le site marchera toujours plus fluidement avec JavaScript mais si l'envie vous prend de faire joujou avec [NoScript](https://addons.mozilla.org/en-US/firefox/addon/noscript/), sachez que le blog vous sera toujours _accessible_.

### En vrac

Lors de la conception du thème, je me suis souvenu d'une remarque pertinente faite par Hyacinth (mais non moins mise de côté par mon impétueux, incompétent et ignorant moi-du-passé). En paraphrasant, voici le discours qu'il me tint alors : "laisse-moi zoomer sur le site stp" . Face à une telle concision, je lui ai soutenu "personne ne fait ça" et je m'en suis mordu les doigts par la suite.

Merci pour ta remarque, Hyacinth, et navré pour ma réaction d'alors.

Vous pouvez désormais zoomer à souhait. Faites-vous plaisir, allez-y. Voilà. Grandes lettres, gros blocs. Normalement, tout n'est pas cassé comme sur la version précédente.

## Optimisation, encore et toujours

Si vous aviez lu [l'article datant d'il y a quelques mois](/mise-a-jour-saison-printemps-ete/#optimisations) ou suivi mes bêtises sur [Twitter](https://twitter.com/sila_point), vous connaissez mon attrait fusionnel pour l'optimisation des performances sur le web. Bien évidemment, ce renouveau a été l'occasion de continuer mes expériences.

### Découpez ce code que je ne saurais voir

La refonte du site m'a permis d'utiliser un code modulable, segmentable et quelque-chose-d'autre-en-able. Ainsi, chaque page ne charge que le code CSS et JavaScript nécessaire à son fonctionnement, et non la totalité du lot.

À chaque transition d'une page à l'autre, opérée avec [Barba](https://github.com/barbajs/barba), la présence des ressources à charger est vérifiée et elles sont ajoutées seulement si nécessaire. Ce fonctionnement, allié à des importations minimales en JavaScript permet de réduire au maximum la taille du code à télécharger. En guise de bonus, j'ai même séparé atomiquement des fonctions pour ne les importer qu'elles et non le fichier complet (oui, malgré les double accolades, je vous vois venir) et ainsi grappiller 1Kb par-ci, par là.

Via ces diverses galipettes, le code CSS a été divisé par 4 (environ 40Kb non compressés initialement contre 10 aujourd'hui) et celui JavaScript par 2 à 10 selon la route (environ 20Kb non compressé pour le coeur contre 2 à 10 aujourd'hui) entre la version 4 et la 5. Joie.

Au passage, la division en plusieurs fichiers profite de l'optimisation HTTP2 et d'une meilleure gestion de la file d'attente dans le thread principal du navigateur. Ces diverses optimisations ont permis de passer d'un Max Potential First Input Delay avoisinant les 120 millisecondes à [80 désormais](https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Flartboratoire.fr%2F). En clair, votre téléphone devrait moins chauffer.

La mise en place de cette architecture réellement complexe est aussi justifiée - outre ma fixette quasi-pathologique sur l'optimisation - par l'envie de créer des pages spécifiques à des thématiques et donc d'éviter de devoir charger leur CSS ou JavaScript sur l'ensemble du site. _To be continued_, comme on dit.

### La typographie, ce n'est pas gratuit

Profitant de la transition de Raleway à Montserrat, j'ai réduit au maximum le nombre de glyphes utilisées par les polices. En précisant l'alphabet français et quelques caractères de ponctuations, on passe de plus de 900 glyphes à quelques dizaines. Et de 333Kb transférés à... 33. Ce qui n'est pas négligeable du tout, lorsqu'on multiplie par le nombre de visiteurs quotidiens sur l'année.

Vos forfaits 3G me remercieront plus tard.

Si l'expérience vous tente, je ne peux que vous recommander l'excellent [outil de FontSquirrel](https://www.fontsquirrel.com/tools/webfont-generator) offrant une pimpante palette d'options.

## Et après ?

Comme d'habitude, j'ai _moult_ idées de bidouilles, articles et autres joyeux projets. Si tout se passe bien, le prochain portera sur la refonte générale de la section dédiée au glitch art. Je ne vous en dis pas plus pour l'instant car de nombreux points restent à déterminer, mais ça devrait être chouette.

Merci d'avoir lu et à très vite !

PS : si vous rencontrez un bug ou quelque chose de bizarre, n'hésitez pas à m'en faire part sur {% socialString %}, ou par mail ({{ site.meta.email }}).
