## Pingly

Le but de cet API est de pouvoir ping et faire du monitoring de statut sur un siteweb/IP.


## Points importants

- [Fonctionnnement](#fonctionnement)
  - [Basique](#basique)
  - [Options](#options)
- [API Publique](#api-publique)
- [Mise en place](#mise-en-place)
- [Informations](#informations)


## Fonctionnement

### Versions

L'API garde ces anciennes versions de fonctionnement, vous pouvez donc choisir la version de l'API que vous souhaitez dans le lien de la requête.

`/api/vX/` (X = version de l'API)

<details>
<summary>Exemple</summary>

`https://mondomaine.fr/api/v2/`
</details>

### Basique

Version API:
<details>
<summary>v1</summary>

Le lien dépend de votre nom de domaine mais il existe une partie fixe:

`/api/v1/host/votreIPouURL.fr`

<details>
<summary>Exemple</summary>

`https://mondomaine.fr/api/v1/host/google.com`
</details>

<details>
<summary>Résultat Attendu</summary>

```json
{
    "pingInfo": {
        "host": "google.com",
        "alive": true,
        "output": "PING google.com (172.217.19.238): 56 data bytes\n64 bytes from 172.217.19.238: icmp_seq=0 ttl=119 time=15.800 ms\n\n--- google.com ping statistics ---\n1 packets transmitted, 1 packets received, 0.0% packet loss\nround-trip min/avg/max/stddev = 15.800/15.800/15.800/0.000 ms\n",
        "time": 15.8,
        "times": [
            15.8
        ],
        "min": "15.800",
        "max": "15.800",
        "avg": "15.800",
        "stddev": "0.000",
        "packetLoss": "0.000",
        "numeric_host": "172.217.19.238"
    },
    "statusInfo": {
        "sitewebAccessible": true,
        "statusCode": 200,
        "error": null,
        "statusMessage": "OK"
    }
}
```
</details>

</details>
<details>
<summary>v2</summary>

Le lien dépend de votre nom de domaine mais il existe une partie fixe qui dépend de votre demande:

#### Ping Simple

`/api/v2/ping/votreIPouURL.fr`

<details>
<summary>Exemple</summary>

`https://mondomaine.fr/api/v2/ping/google.com`
</details>

<details>
<summary>Résultat Attendu</summary>

```json
{
    "pingInfo": {
        "host": "google.com",
        "alive": true,
        "output": "PING google.com (142.250.178.142): 56 data bytes\n64 bytes from 142.250.178.142: icmp_seq=0 ttl=119 time=14.771 ms\n\n--- google.com ping statistics ---\n1 packets transmitted, 1 packets received, 0.0% packet loss\nround-trip min/avg/max/stddev = 14.771/14.771/14.771/0.000 ms\n",
        "time": 14.771,
        "times": [
            14.771
        ],
        "min": "14.771",
        "max": "14.771",
        "avg": "14.771",
        "stddev": "0.000",
        "packetLoss": "0.000",
        "numeric_host": "142.250.178.142"
    }
}
```
</details>

#### Ping avec Statut

`/api/v2/status/votreIPouURL.fr`

<details>
<summary>Exemple</summary>

`https://mondomaine.fr/api/v2/status/google.com`
</details>

<details>
<summary>Résultat Attendu</summary>

```json
{
    "pingInfo": {
        "host": "google.com",
        "alive": true,
        "output": "PING google.com (216.58.213.142): 56 data bytes\n64 bytes from 216.58.213.142: icmp_seq=0 ttl=119 time=15.788 ms\n\n--- google.com ping statistics ---\n1 packets transmitted, 1 packets received, 0.0% packet loss\nround-trip min/avg/max/stddev = 15.788/15.788/15.788/0.000 ms\n",
        "time": 15.788,
        "times": [
            15.788
        ],
        "min": "15.788",
        "max": "15.788",
        "avg": "15.788",
        "stddev": "0.000",
        "packetLoss": "0.000",
        "numeric_host": "216.58.213.142"
    },
    "statusInfo": {
        "sitewebAccessible": true,
        "statusCode": 200,
        "error": null,
        "statusMessage": "OK"
    }
}
```
</details>

</details>

### Options
#### Port
Vous pouvez ping un lien qui contient un port en rajoutant ceci:
> <> ne pas ajouter

.../votreIPouURL.fr`?port=<votre port>`

<details>
<summary>Exemple</summary>

`.../google.com?port=80`
</details>

#### Timeout

Vous pouvez choisir le temps avant que la requête soit annulée
> <> ne pas ajouter

.../votreIPouURL.fr`?timeout=<temps en millisecondes>`

<details>
<summary>Exemple</summary>

`.../google.com?timeout=5000`
</details>

#### Ajouter plusieures options
Pour cela il vous suffit de remplacer le deuxième `?` par un `&`

<details>
<summary>Exemple</summary>

`.../google.com?port=80&timeout=5000`
</details>

### API Publique

Le site [pingly.app](https://pingly.app/) est et sera continuellement actualisé avec la dernière version de cette api. 
Vous pouvez donc utiliser ce lien librement et a bon escient. 

## Mise en place

### Installation des modules:

Pour installer les modules nécéssaire au bon fonctionnement de l'API il faut éxécuter cette commande dans le terminal du dossier

`npm install`

### Tracking d'erreurs avec Sentry

Cette API utilise [Sentry](https://sentry.io/) comme logiciel d'enregistrement d'erreurs et de performances. Pour faire fonctionner ce système il suffit de mettre la clé correspondant à votre projet dans Sentry dans le fichier `.env` (expliqué [ici](#configuration)). 
> Cette fonctionnalité n'est pas obligatoire mais est cependant fortement recommandée pour avoir un aperçu des erreurs qu'il pourrait avoir lieu.

### Configuration:

Il existe un fichier `.env.exemple` il faut le renommer et enlever le `.exemple`. Vous pourrez par la suite modifier les informations si situant à l'intérieur pour changer la configuration de votre API

## Informations:

Le fichier de démarrage est le `app.js`

Les scripts de démarrages disponibles sont:

- `npm run start` Pour un démarrage simple

- `npm run dev` Pour un démarrage en développement
