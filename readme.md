## WebSite Ping API

Le but de cet API est de pouvoir ping un siteweb à travers le lien de l'application.


## Points importants

- [Fonctionnnement](#fonctionnement)
  - [Basique](#basique)
  - [Options](#options)
- [API Publique](#api-publique)
- [Mise en place](#mise-en-place)
- [Informations](#informations)


## Fonctionnement

### Basique
Le lien dépend de votre nom de domaine mais il existe une partie fixe:

`/api/host/votreIPouURL.fr`

<details>
<summary>Exemple</summary>

`https://mondomaine.fr/api/host/google.com`
</details>

### Options
#### Port
Vous pouvez maintenant ping un lien qui contient un port en rajoutant ceci:
> <> ne pas ajouter

/api/host/votreIPouURL.fr`?port=<votre port>`

<details>
<summary>Exemple</summary>

`https://mondomaine.fr/api/host/google.com?port=80`
</details>

#### Timeout

Vous pouvez maintenant choisir le temps avant que la requête soit annulée
> <> ne pas ajouter

/api/host/votreIPouURL.fr`?timeout=<temps en millisecondes>`

<details>
<summary>Exemple</summary>

`https://mondomaine.fr/api/host/google.com?timeout=5000`
</details>

#### Ajouter plusieures options
Pour cela il vous suffit de remplacer le deuxième `?` par un `&`

<details>
<summary>Exemple</summary>

`https://mondomaine.fr/api/host/google.com?port=80&timeout=5000`
</details>

### API Publique

Le site [ping-it.ml](https://ping-it.ml/) est et sera continuellement actualisé avec la dernière version de cette api. 
Vous pouvez donc utiliser ce lien librement et a bon escient. 

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
