# REPORT-LaboHTTPInfra
## Author : Robin Reuteler

## Step 1: Static HTTP server with apache httpd

### Branch "step1-apacheHTTP"

La page docker hub de PHP propose cette configuration :

FROM php:7.2-apache
COPY src/ /var/www/html/

Utilisée sans modifications pour le moment 

On build le container avec :

docker build -t http_server .

On lance le container avec :

docker run -d -p 2000:80 http_server 

On peut ensuite accèder au serveur apache via localhost:2000

Template bootstrap utilisé : https://bootstrapmade.com/arsha-free-bootstrap-html-template-corporate/

## Step 2: Dynamic HTTP server with express.js

### Branch "step2-dynamicServer"

On utilise node 10.20.1 dans cette partie (contrairement à 4.4 dans la démonstration vidéo)

Contenu du Dockerfile : 

FROM node:10
COPY src /opt/app

Puis on lance "npm init" dans src pour créer le package.json

On lance "npm install chance" pour ajouter la dépendance "chance" qui sert à générer du contenu aléatoire.

On utilise Express.js, qui paraît moins complexe que d'autres frameworks pour des personnes inexpérimentées en js... (J'ai pensé à utiliser Next.js, mais ce framework paraissait plus difficile à utiliser, je suis donc resté dans les sentiers battus)

On lance donc "npm install express" pour ajouter express.js à notre package

Pour varier un peu les choses, j'ai décidé de créer un petit jeu : l'utilisateur doit deviner le nombre tiré par le serveur. Une fois qu'il a trouvé, le serveur lui retourne la séquence envoyée et le nombre d'essais effectués (en JSON, simplement pour montrer que j'étais capable de renvoyer du JSON puisque c'est demandé). Le code et le fonctionnement ne sont pas très élégants, mais je trouve ça plus intéressant que de simplement renvoyer des données aléatoires

On utilise postman pour tester le serveur indépendamment du contenu html utilisé pour envoyer les requêtes

Enfin, avec tous les fichiers nécessaires (index.js et une page html statique qui sert d'interface) dans src, on peut build et run le container, mappant le port interne 2001 utilisé par le serveur au port 9090 par exemple (oui je sais mes numéros de port ne sont pas cohérents puisque le port 2000 était précédemment le numéro de port externe...).



