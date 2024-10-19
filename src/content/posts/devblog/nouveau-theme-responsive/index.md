---
title: "Nouveau thème responsive"
published: "2016-11-08"
author: "lartboratoire"
thumbnail: "img/miniature_devblog.jpg"
thumbnail_alt: "Logo du blog"
seo:
    desc: "Y a-t-il des beta-testeurs dans la salle ?"
---

Y a-t-il des beta-testeurs dans la salle ?

<!--more-->

Comme annoncé dans l'[article précédent](/selections-images-responsive-design/), le nouveau thème est là !

## Responsive ?

Ce terme barbare signifie que le nouveau thème s'adaptera plus facilement aux écrans que vous utilisez. Normalement. Si tout va bien.

Bref, j'ai besoin de votre aide, pour vérifier que tout fonctionne correctement (ou presque) ! **Si vous voyez un bug, n'hésitez surtout pas à m'en faire part sur Facebook, Twitter, en commentaires ou par mail** : {{ site.meta.email }}

Je vous tiendrai au courant en temps réel de la résolution des problèmes via le compte [Twitter de l'artboratoire](https://twitter.com/artboratoire).

## Problèmes déjà rencontrés

Oui... déjà. :(

<del datetime="2016-11-09T11:26:30+00:00">– Sur mobile, l’icône du menu ne s’affiche pas, ou incomplètement (il est en haut à droite, pour ceux qui le cherchent). Cf plus bas.</del>

<del datetime="2016-11-08T18:06:27+00:00">Le logo pixelise pour les ordinateurs à haute résolution. (Je sais que le .svg c’est la vie, mais pas avec WordPress.)</del>

<del datetime="2016-11-08T18:16:55+00:00">– La gestion des images dans la description des catégories n’est pas encore optimale sur petits écrans (oui, je sais, c’est bon, frappez-moi).</del>

## Détails techniques

Continuant dans ma lancée de "JE FAIS TOUT À LA MAIN PARCE YOLO", le css a été fait sans Bootstrap et tout à la main. Je n'ai pas énormément touché à la structure HTML générale, à part deux trois détails liés.

Il y a deux points de rupture, le premier à 800, qui passe de la version PC à mobile et le second à 680, qui permet une meilleure présentation des images dans les catégories. Du reste, le css est assez basique en lui-même.

Profitant de l'occasion, j'ai repris l'affichage du menu, désormais animé en jQuery (allez, parce qu'on ne se refuse pas un peu de luxe tant qu'on y est), avec un simple slideToggle. Il faut que je me renseigne plus précisément sur l'affichage du menu mobile, qui utilise un Unicode (☰) pour fonctionner ; cela ne fonctionne pas aussi bien qu'espéré sur de vieilles version de navigateurs mobile.

EDITION : j'ai modifié l'affichage du menu mobile, en supprimant l'Unicode et en utilisant à nouveau une simple image.

## Suggestions

Si vous avez une suggestions, un avis (ou un énième retour de bug), je suis totalement ouvert à la discussion ! Je suis très curieux et encore en phase d'apprentissage / application ; inondez-moi de termes techniques alambiqués et de propriétés CSS bizarres ! ;)

## Mot de la fin

BONNE VISITE !

J'espère qu'elle se fera sans encombre... Je vous invite à faire un tour du côté des [derniers articles du blog](/categorie/articles/) (qui parlent d'art, eux). 


* * *

Merci à [Julie Latieule](http://julielatieule.fr/) pour sa patience lorsque j'avais MOULT TROP de questions et à [yNasc](http://ynasc.net/blog/) pour sa réactivité sur Twitter quand tout ou presque part en cacahuète.

* * *

Miniature : Lucyhe
