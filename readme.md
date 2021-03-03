## WebSite Ping API

Le but de cet API est de pouvoir ping in siteweb a travers le lien de l'application.

## Fonctionnement

Le lien dépend de votre nom de domaine mais il existe une partie fixe:

`/api/host/votreIPouURL.fr`

### Exemple

`https://mondomaine.fr/api/host/google.com`


## Mise en place

### Installation des modules:

Pour installer les modules nécéssaire au bon fonctionnement de l'API il faut éxécuter cette commande dans le terminal du dossier

`npm install`

### Configuration du port:

Il existe normalement un fichier `.env.exemple` il faut le renommer et enlever le `.exemple`. Vous pourrez par la suite modifier le port de l'application

## Informations:

Le fichier de démarrage est le `app.js`

Les scripts de démarrages disponibles sont:

- `npm run start` Pour un démarrage simple

- `npm run dev` Pour un démarrage en développement
