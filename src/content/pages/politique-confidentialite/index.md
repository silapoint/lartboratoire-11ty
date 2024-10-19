---
title: Politique de confidentialité
---

Dans un effort de protection de vos données et de votre vie privée, l'artboratoire en collecte un minimum. 

[[toc]]

## Hébergement et services
- L'artboratoire est hébergé via [Gitlab](https://about.gitlab.com/privacy/).
- L'artboratoire collecte des données de navigation via le logiciel auto-hébergé [Umami](https://github.com/umami-software/umami).

## Données collectées 
### Umami
Afin d'aide l'administration du site (par exemple : repérer les pages manquant de succès), l'artboratoire utilise [Umami](https://github.com/umami-software/umami). Cette solution *auto-hébergée* ne collecte **pas** d'informations personnelles (par exemple : pas d'adresse IP ni de cookie de tracking). En pratique, cela signifie que l'administrateur du site a accès aux données anonymisées suivantes pour chaque visite :
- les pages visitées ;
- la durée de la visite ;
- le type de navigateur, système d'opération, et appareil ; 
- le pays de visite (basé sur le fuseau horaire).

Les données de navigation uniques sont effacées après 3 mois. Sont conservés les rapports hebdomadaires / mensuels / annuels comportant les données agregées.

### Gitlab
En plus de ces informations, [Gitab](https://about.gitlab.com/privacy) collecte davantage de données en sa qualité d'hébergeur (auxquelles l'administrateur de lartboratoire.fr n'a pas accès, sauf si spécifiées précédemment) :

> When you visit our Websites, we automatically log information about how you interact with the sites, such as the referring site, date and time of visit, and the pages you have viewed or links you have clicked. For our Websites, GitLab uses session replay, which captures a de-identified log of the marketing Websites that you visit.
>
> -- [Privacy Policy](https://about.gitlab.com/privacy), consultée le 18 octobre 2024.

### Note sur les contenus embarqués
Bien que l'intégration de services tiers dans les articles de l'artboratoire soit sporadique et potentiellement évitée, il est possible que l'ajout d'une playlist Soundcloud, d'un tweet ou d'une vidéo Youtube entraîne l'enregistrement de données de leur part. L'artboratoire n'a aucun contrôle sur ce comportement.

## Généralités et philosophie

En tant qu'administrateur de site internet, il est facile de se laisser tenter par des solutions prêtes à l'emploi et techniquement puissantes (*c'est toi que je regarde, Google Analytics*). Néanmoins, un temps supplémentaire - et nécessaire - a été pris pour choisir des services respectueux de votre vie privée ou, du moins, donnant la possibilité à l'administrateur d'auto-héberger vos données sans qu'un service tiers n'y accède. C'est aussi l'une des raisons pour laquelle ce site n'utilise pas de librairies Javascript externes.

Pour connaître vos droits en tant qu'utilisateur et vous renseigner sur la protection de vos données personnelles, vous êtes invité à visiter le [site officiel de la CNIL](https://www.cnil.fr/fr).

Si vous jugez qu'une des pratiques de ce site n'est pas conforme et/ou n'est pas assez respectueuse de votre vie privée, merci de contacter l'administrateur du site par mail :: <span class="email">{{ site.meta.email }}</span>.

--- 

Dernière édition : 18 octobre 2024.