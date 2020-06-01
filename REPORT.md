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

Commandes docker utilisées : 

docker build -t node_server .

docker run -d -p 9090:2001 node_server 


## Step 3: Apache Reverse Proxy

### Branch "step3-reverseProxy"

On utilise toujours apache 7.2 

Dockerfile : 

FROM php:7.2-apache
COPY conf/ /etc/apache2

RUN a2enmod proxy proxy_http
RUN a2ensite 000-default 001-reverse-proxy

Le COPY copie nos fichiers de configuration dans la config de apache2

a2enmod permet d'activer des modules apache (en l'occurence les modules permettant les proxys) et a2ensite permet d'activer des sites (où le nom du site est le nom du "noeud" logique représentant un site pour apache, déterminé par les fichiers de configuration dans le dossier sites-availible)

Adresse du serveur apache statique (nom de l'image : http_server) : 172.17.0.2
Adresse du serveur node dynamique (nom de l'image : node_server) : 172.17.0.3

nom du site : noidea.ch

Les fichiers de config contiennent le routage des adresses, permettant d'accéder au contenu dynamique avec noidea.ch/api/guessingGame et au contenu statique si seulement noidea

En lançant les images précédentes comme décrit dans les parties 1 et 2, et en lançant l'image du proxy, en mappant par exemple le port 1272 au port 80, on

Je n'arrive inexplicablement pas à obtenir de réponse en utilisant le navigateur, qui me répond juste avec une erreur 404 (oui, j'ai modifié le fichier hosts !). Le serveur crache simplement : 
'172.17.0.4:80 172.17.0.1 - - [01/Jun/2020:19:30:51 +0000] "GET /api/guessingGame HTTP/1.1" 404 490 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36"'

Les requêtes recoivent une réponse lorsque j'utilise telnet cependant


