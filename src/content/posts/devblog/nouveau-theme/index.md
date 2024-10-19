---
example: "EXAMPLE: Nouveau thème !"
title: "Nouveau thème !"
published: "2016-08-04"
author: "lartboratoire"
thumbnail: "img/theme_miniature.jpg"
thumbnail_alt: "Header du blog"
seo:
    desc: "Joie, cotillons et farandoles ; le nouveau thème de l'artboratoire est (enfin) en ligne"
---

Joie, cotillons et farandoles ; le nouveau thème de l'artboratoire est (enfin) en ligne !


Je vous en parle depuis quelques temps, mais voilà, ça y est.

### 50 nuances de bugs divers

Comme tout bon nouveau site qui se respecte à sa sortie, il est fort possible pour ne pas dire certain qu'il y ait quelques problèmes d'affichage voire de fonctionnalités (pour ce second point, _normalement_, cela devrait aller).

Si vous tombez souris à pixel avec un bug, n'hésitez surtout pas à me le signaler en commentaire, par mail ( lartboratoire\[arobase\]gmail\[point\]com ), via Facebook ou encore Twitter. Cela me permettra d'améliorer rapidement votre navigation et je vous en serai éternellement reconnaissant.

{% Figure "img/mobile02.jpg", "Exemple de truc pas normal", "Exemple de truc pas normal sur téléphone" %}

Il reste encore quelques détails à régler, et ils le seront d'ici Septembre, mais je souhaitais vraiment mettre le site en ligne maintenant, puisqu'il est fonctionnel et que mon côté perfectionniste ne doit plus ralentir sa parution !

### Graphisme, code et magie

Pour ceux qui se demandent quel a été le procédé de développement et surtout parce que j'ai bien envie d'en parler ici un minimum, voici un résumé du périple. Notez que cela risque d'être _un peu_ technique sur les bords... Vous êtes prévenus !

Tout d'abord, j'ai eu la chance de penser et créer la charte graphique dans le cadre de mes études en fin d'année scolaire, avec les bons conseils de mon enseignant. Le dossier d'un peu plus de 20 pages A4 et A3 m'a permis de bien mettre à plat ce que je souhaitais et surtout, de créer les maquettes finales du site à venir.

Cette première étape réussie, je me suis lancé dans le développement en local d'un thème Wordpress complet.

> « This has to be the strangest issue i have seen with a wp site over the last few years. The search for answers continues…  »
>
> AH. CHOUETTE
>
> -- moi sur Twitter, 29 juillet 2016. 

Ne m'étant jamais attaqué à un tel morceau, c'était à la fois un défi personnel et une manière de ne pas perdre la main durant les vacances tout en apprenant moult choses. Bref, ce n'était pas de la tarte, mais il faut croire que j'ai finalement eu raison du PHP et des fonctions natives tordues de WP... Victoire pour le peuple !

Pour ceux que cela intéresse : non, pas de framework type JQuery ; seulement du PHP, HTML, CSS, JS. (Je fais exception de tout ce qui est natif à WP et ne parle que de la partie développée de mon côté.)

### De l'importance de tout prévoir

Ce que je n'ai pas dit, c'est qu'avec ma magnifique charte graphique de plus de 20 pages, je n'avais fait que 3 jolies maquettes : celle de l'accueil, de l'affichage des articles dans une catégories et enfin une version mobile. Certes toutes les polices, codes couleurs et autres marges étaient préparées, mais il me manquait pas mal de légers détails tels que... _Comment est-ce que je présente mes articles ?_ Parce que théoriquement, c'est un blog, l'artboratoire, hein. Bon.

Joyeuse galère, qui s'est soldée par l'idée lumineuse et inopinée de mettre cette magnifique barre fixée en haut quand on descend (chers utilisateurs depuis un mobile : vous serez obligés de revenir sur ordinateur pour vérifier mes dires). Idée lumineuse qui m'a occupée pendant plus de 10h parce que j'ai codé à l'aveugle sans avoir de plan (et aussi car la gestion du scroll en JavaScript, c'est un sacré cauchemar)... Morale de l'histoire : autant être légèrement monomaniaque et tout prévoir plutôt que partir les mains dans les poches et espérer que le code apparaisse comme par magie.

### À bas les plug-ins fourre-tout

Un monsieur avec des moustaches serait fichtrement fier, là (si vous vous reconnaissez, bonjour et bienvenue ! ) ; avec mon bidouillage et en tâtonnant pas mal, je me suis débrouillé pour me débarrasser de plug-ins généralistes de type usine à gaz exposant centrale nucléaire (Jetpack pour ne citer que lui). Cela permet, outre de mieux cibler l'utilisation d'un plug-in, de ne pas balancer ses identifiants Facebook, Twitter, Google Plus et Meetic n'importe où. Oui, c'est fichtrement plus compliqué à coder, mais j'en retire une certaine fierté de s'en être sorti et une liberté au gout sucré !

À l'heure actuelle, je garde encore Yoast et Google Analytics sous la main, car je n'ai pas spécialement le temps de développer un équivalent ou d'en trouver un correct pour l'optimisation SEO ou la gestion des statistiques du blog.

### Après le code, le beau temps (ou pas)

Après avoir pleuré toutes les larmes de mon corps parce que j'avais oublié d'insérer les descriptions des catégories ce qui a chamboulé une bonne partie de mon CSS, j'ai transféré le thème développé en local sur le serveur et, étonnamment, rien n'a trop explosé ; à part deux ou trois trucs qui ont bougé parce que je suis un boulet en CSS et un title qui ne m'écoutait pas... Dans l'absolu, tout est rentré dans l'ordre quelques minutes plus tard !


> Update : ça pue.
>
> -- moi sur Twitter, 30 juillet 2016.


J'ai juste dû remettre en place manuellement toutes les miniatures des articles afin qu'elles s'adaptent aux nouveaux standards.

### Verdict

Finalement, c'était une super chouette expérience ; je ne compte clairement pas m'arrêter ici en termes de développement web pour ce blog ! Je suis très la fierté d'avoir réussi, mais je n'y serai _jamais_ arrivé sans l'aide régulière et salvatrice de [Nasc'](https://twitter.com/yNasc_) sur Twitter. Merci maître padawan, t'es vraiment patient.

Pour ceux qui souhaiteraient se lancer dans l'aventure du développement d'un thème Wordpress (héhé, bonne chance), je vous conseille l'excellente série de [Francis Chouquet](http://www.fran6art.com/wordpress/creez-votre-theme-wordpress-de-a-a-z/), conseillée par [Julie Latieule](http://julielatieule.fr/), qui m'a permis (la série, pas Julie) de ne pas fuir devant la dose de travail et surtout, de poser des bases solides en PHP. Ayant initialement des connaissances suffisantes pour faire bande à part, je m'en suis rapidement détaché avant de me tourner vers le [forum Wordpress](https://wordpress.org/support/) et [Stack Overflow](http://stackoverflow.com/) lorsque ce que je trouvais sur le [Codex de Wordpress](https://codex.wordpress.org/) manquait de clarté. Dans l'absolu, la meilleure solution reste de taper une série de mots-clefs dans Google et de tenter sa chance avec les différents résultats.

Si vous avez des questions au sujet du développement et codage, des sites proposés ci-dessus, de ma tarte préférée ou de quoi que ce soit d'autre, faites un coucou dans les commentaires ou sur les réseaux sociaux.

Sur ce, merci d'avoir lu jusqu'ici et bonne navigation sur le nouveau site tout beau tout propre ! S'il ne l'est pas, je le répète : **n'hésitez pas à signaler tout ce qui vous semble se comporter bizarrement** !
