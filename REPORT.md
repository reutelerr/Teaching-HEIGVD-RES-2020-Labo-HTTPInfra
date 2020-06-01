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
