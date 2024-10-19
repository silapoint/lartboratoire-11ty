---
title: "Mises à jours et finitions"
published: "2016-08-29"
author: "lartboratoire"
thumbnail: "img/miniature_devblog.jpg"
thumbnail_alt: "Logo du blog sur illustration de Lucyhe"
seo:
    desc: "Ceux qui suivent le blog sur Twitter le savent en partie déjà : les dernières finitions ont été apportées à l'artboratoire"
---

Ceux qui suivent le blog sur Twitter le savent en partie déjà : les dernières finitions ont été apportées à l'artboratoire!

## Catégorie Aléartoire

J'ai concentré mes efforts sur la nouvelle gestion des sélections d'images, auparavant sous forme d'articles, qui sont désormais accessibles via une page par thème. Il est aujourd'hui possible de naviguer soit en visionnant globalement la sélection...

{% Figure "img/Capture-d’écran-2016-08-29-à-14.35.30.jpg", "Exemple de vue globale", "Exemple de vue globale" %}

... soit image par image, avec des flèches directionnelles apparaissant au survol.

{% Figure "img/selection_images_05.jpg", "Exemple de vue seule", "Exemple avec une image seule" %}

Longue histoire raccourcie : ça a été assez instructif au niveau du code !

**\[Explication indigeste de mon bidouillage** pour ceux qui le veulent :

J'ai d'abord codé un template pour un custom-post-type (single-bidouille.php) ainsi qu'une page d'archives pour la catégorie associée (archive-bidouille.php), en me basant sur celui déjà utilisé de base pour le reste du site. Ensuite, j'ai modifié quelques classes puis ai adapté le fichier CSS en conséquence, afin d’obtenir la mise en page actuelle.

Le squelette mis en place, je l'ai copié / collé, renommé, puis très légèrement repris pour chaque thème de l'aléartoire.

J'ai créé une [page à part](/aleartoire/) pour faire office d'accueil de la catégorie, avec la liste des thèmes abordés tout en insérant son lien au-dessus des descriptions de chaque sous-catégorie. Enfin, j'ai saupoudré le tout de redirections 301 depuis les anciens articles vers les nouvelles catégories.

Tout ceci marche assez bien, puisque la page d'accueil n'est pas affreusement polluée par les multiples nouveaux articles, mais il va probablement falloir que je crée un article chaque semaine avec une redirection 301 instantanée vers la catégorie d'images concernée... À moins que quelqu'un ait une idée bien plus lumineuse ?

**Fin de l'explication indigeste.\]**

Le prochain projet de code est aussi relatif à cette catégorie, puisque j'aimerais ajouter un système de votes avec réorganisation des images selon le nombre / ratio de votes positifs... Bref, je vais probablement pleurer mais surtout énormément apprendre ; ça va être chouette !

Oh, et puis... puisque j'ai passé fichtrement beaucoup trop de temps à créer ce gif, je le mets ici aussi :

{% Figure "img/aleartoire.gif", "Aleartoire – sélection d’images artistiques", "Aleartoire – sélection d’images artistiques" %}

Merci à Kuja filth et Nasc pour leurs conseils techniques et esthétiques avisés (c'était mal barré).

## Modification de pages

J'ai mis à jour la page "[À propos](/a-propos/)" en essayant d'optimiser le SEO un minimum tout en la rendant plus claire.

Par la même occasion, j'ai ajouté une page "[Copyrights & contact](/mentions-legales/)", traduite en anglais, afin de pas avoir de problème avec les potentielles erreurs de droits d'auteur. Ça m'ennuierait vraiment si cela arrivait ; mieux vaut prévenir que guérir.

## Ajout/modification des descriptions

J'ai profité de ma lancée pour modifier ou mettre à jour les diverses descriptions de catégories ([Découvertes artistiques](/categorie/decouvertes-artistiques/), [Dossiers (in)complets](/categorie/dossiers-complets/)) afin de les rendre un peu plus attrayantes et, une nouvelle fois, améliorer le référencement de tout ce bardas.

## Nouveau thème, bugs et SEO

Comme vous avez pu le lire plusieurs fois déjà, j'essaie de faire de mon mieux au niveau du référencement naturel, pour ce blog. Il y a énormément de travail, tant il part de loin et tant la discipline est vaste ; on avance, lentement mais surement (enfin, je crois) !

{% Figure "img/googlesearch03.png", "SEO et magie", "Le SEO, toujours la magie" %}

J'en profite pour remercier chaleureusement tous les beta-testeurs qui ont fait remonter avec brio (et patience) les divers bugs lors de la parution du dernier thème. Cela m'a réellement aidé. Merci beaucoup, vous êtes trop forts ! :D

Si vous croisez de nouveaux trucs bizarres, n'hésitez pas à me faire signe par commentaire ou sur les réseaux sociaux.

  

On se retrouve très vite de nouveaux et nombreux articles de découvertes diverses !

* * *

Illustration de la miniature par [@lucyhe\_artist](https://lucyhe.art/).
