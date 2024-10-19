---
title: "Robot, mon beau robot, dis moi quelle est la plus belle ?"
published: "2019-03-18"
tags: 
  - "design-graphisme"
  - "photographie"
author: "darkvador"
thumbnail: "img/Chat_soleil.jpg"
thumbnail_alt: "Ombre d'un chat s'étirant devant le soleil couchant"
seo:
  desc: "Explorons comment un algorithme évalue la beauté des images et interroge notre perception esthétique ; enjeux d'une tendance moderne."
---

Nous adorons évaluer, noter, donner notre avis sur tout et aussi (surtout ?) n'importe quoi : les hôtels, les restaurants, les marques, les produits, etc. Une société du jugement.

Autre phénomène massif : le partage d'images, de photographies, de toutes ces traces de nos vies créatives. Instagram, FlickR, etc. ont surfé sur cette vague des communautés de ses objets au choix, artistiques, égoïstes, commerciaux.

L'image et la note sont au cœur de nos vies numériques alors pourquoi pas ne pas noter les images ? Google en rêve : pouvoir référencer, comme les sites web, les images en fonction de leur pertinence attribuée non pas par le créateur de l'image mais par un algorithme qui se veut neutre, transparent, efficace... Google quoi. D'autres aussi recherchent ce Graal d'un programme capable de noter les images.

Mais noter quoi ?

La beauté bien-sûr et c'est là que ces tendances rejoignent L'artboratoire. Dans un monde où l'image est reine, les algorithmes veulent devenir leur roi.

Dans cet article, nous allons explorer les résultats surprenants d'une application qui propose un système d'évaluation automatique de l'esthétique des images. Si, si, ils ont osé ! Mais après tout, pourquoi pas ? On sait bien que la beauté est une convention sociale, une habitude du regard, un réflexe humain qui évolue selon les époques. Les vénus préhistoriques seraient-elles aujourd'hui mannequins ? Si la beauté est une phénomène social, elle doit être modélisable et donc programmable.

## Noter la beauté

Le site [Everypixel](https://www.everypixel.com/aesthetics) propose une application gratuite en ligne qui évalue l'esthétique d'une photographie. Par exemple :

{% Figure "img/Essai_Everypixel.jpg", "Essai Eveyrpixel", "Usage Everypixel" %}

Le pourcentage représente la probabilité que votre image déchaîne les passions sur vos réseaux sociaux. Plus il est proche de 100% et plus l'algorithme estimera qu'une bonne réception de votre image est probable. En dessous de 50%, pas besoin de se fatiguer à poster...

L'algorithme utilise un réseau de neurones profonds que je serais bien incapable de vous expliquer en détail (voir ce site pour plus d'informations sur le [fonctionnement d'Everypixel](https://devblogs.nvidia.com/understanding-aesthetics-deep-learning/)). L'idée qui me semble importante est que ces algorithmes "apprennent" c'est-à-dire qu'ils se perfectionnent en analysant des bases de données de millions de photographies en intégrant les avis d'experts humains qui les orientent au départ dans leur analyse. Ainsi, le programme construit des règles d'évaluation à partir des indications de départ des concepteurs et crée sa propre logique. Cette approche est dite "intelligente" en raison de l'apprentissage de l'algorithme qui est capable d'évoluer, non pas seul, mais à partir de son travail d'analyse accompagné des bases de données correctement indexées.

Dans l'exemple pris avant, aucune chance que cette photo soit partagée sur les réseaux avec un tel score. Il y a "0.1% de chance que cette image soit géniale"  alors il vaut mieux plutôt la garder secrète ;-)

Jusque là, tout va bien, on a trouvé un algorithme objectif qui note nos créations, on va pouvoir faire les malins dès qu'on aura un bon score, peut-être même le mettre sur son CV et pourquoi pas en faire un Tee-shirt !

Mais... car il y a un mais sinon ce ne serait pas drôle.

## La beauté des robots ou l'esthétique automatisée

Testons l'application avec d'autres photographies en commençant par la photographie la plus chère du monde à ce jour et officiellement car le marché n'est pas toujours très transparent : celle d'Andreas Gursky vendue pour 4.3 millions en 2014.

{% Figure "img/Gursky_Everypixel.jpg", "Rhein II Andreas Gursky et Everypixel", "Rhein II Andreas Gursky et Everypixel" %}

Hum... pas très enthousiasmant, je ne vais peut-être pas la partager sur mes réseaux celle-là, mes amis vont croire en plus que je suis complètement déprimé avec un tel paysage morne... L'application ne célèbre pas la beauté de l'argent.

Mais essayons encore avec, cette fois, un photographe mis en avant sur L'artboratoire,  [Vincent Bourilhon](/vincent-bourilhon/) :

{% Figure "img/Bourilhon_Everypixel.jpg", "Vincent Bourilhon et Everypixel", "Vincent Bourilhon et Everypixel" %}

Là, ça va ! Celle-ci est vraiment esthétique ! Mais, alors peut-être que les photographies de L'artboratoire sont toutes belles en fait. Je vais (enfin) pouvoir prouver que [les sténopés](/stenope-ressourcer-photographie/) sont beaux.

{% Figure "img/Stenope_Everypixel.jpg", "Sténopé série « Painted with light » 1997 Volkmar Herre et Everypixel", "Sténopé série « Painted with light » 1997 Volkmar Herre et Everypixel" %}

Ben c'est raté, je dois me tromper alors puisque l'algorithme le dit. J'ai très mauvais goût en fait et je ne comprends rien à la beauté... Sauf que...

## La beauté sociale ou la beauté en liberté ?

On voit bien que tout cela n'est pas évident. Déjà la notion d'esthétique est différente de la beauté. Définir l'esthétique est difficile. L'exemple d'A. Gursky interroge sur la valorisation financière d'une forme d'esthétique. Revenons maintenant au soi-disant apprentissage de l'algorithme. Il a appris et créé une forme de règles de beauté statistiquement significative et partagée majoritairement. Les photos de Vincent Bourilhon ne sont pas plus belles ou plus esthétiques mais correspondent mieux aux critères qu'a construits CET algorithme. La stratégie peut être sans doute efficace pour des réseaux sociaux peu avides de nouveautés finalement : un mignon petit chat, un coucher de soleil, des personnes souriantes et au mieux le mix : des personnes souriantes portant un petit chat au coucher de soleil ! Un peu comme la photo de couverture de cet article...

L'esthétique et la beauté sont très sociales et un algorithme ne fait que systématiser cette tendance. Mais attention à ne pas trop y croire. Sinon, LE beau sera tyrannique et les artistes n'auront plus qu'à faire des études de marché pour gagner des likes et ensuite des dollars.

Heureusement, ce n'est pas l'orientation de L'artboratoire qui vous propose des visions surprenantes, différentes, créatives, décalées qui ne marchent pas forcément sur les réseaux sociaux mais disent quelque chose de notre monde et de nos émotions. Et les émotions sont encore ce qu'il y a de plus humain !

### Quelques liens

- [Peut-on mesurer la beauté d’une photo ?](https://rfiap2018.ign.fr/sites/default/files/ARTICLES/RFIAP_2018/RFIAP_2018_Maitre_Peut-on.pdf) Henri Maître, 2018 ;
- [NIMA, le programme de Google](https://ai.googleblog.com/2017/12/introducing-nima-neural-image-assessment.html) ;
- [L'algorithme exploré dans cet article et appliqué aux hôtels](https://devblogs.nvidia.com/deep-learning-hotel-aesthetics-photos/) ;
- [Le modèle AVA](https://ieeexplore.ieee.org/document/6247954).

Deux outils différents d'évaluation automatique des images qui donnent aussi des résultats différents :

- [https://www.eyeem.com/eyeem-vision#wf-form-EyeEm-Vision](https://www.eyeem.com/eyeem-vision#wf-form-EyeEm-Vision) ;
- [https://www.everypixel.com/aesthetics](https://www.everypixel.com/aesthetics).
