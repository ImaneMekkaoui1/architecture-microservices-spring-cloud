# 🛒 E-Commerce Microservices Architecture with Spring Cloud

**Activité Pratique N°2 — Architecture Micro-services avec Spring Cloud**  
**Etudiante :** Imane Mekaoui 
**Master Sdia

---

## 📌 1. Présentation du projet

Ce projet consiste à concevoir et développer une application e-commerce basée sur une **architecture microservices** avec Spring Boot et Spring Cloud.

L'application permet de gérer les clients, les produits et les factures. Chaque fonctionnalité métier est organisée dans un service indépendant, tandis que Spring Cloud fournit les mécanismes de communication, de découverte des services, de routage et de centralisation de la configuration.

Une application cliente développée avec Angular permet d'accéder aux fonctionnalités de la plateforme.

## 🎯 2. Objectifs pédagogiques

Les principaux objectifs de ce travail pratique sont :

- Comprendre les principes fondamentaux d'une architecture microservices.
- Développer des services REST indépendants avec Spring Boot.
- Mettre en place une API Gateway avec Spring Cloud Gateway.
- Configurer le routage statique et dynamique des requêtes.
- Découvrir et enregistrer les services avec Eureka Discovery Service.
- Mettre en œuvre la communication interservices avec OpenFeign.
- Centraliser la configuration avec Spring Cloud Config Server.
- Développer une interface utilisateur avec Angular.
- Comprendre l'organisation et l'intégration des composants d'un système distribué.

## 🏗️ 3. Architecture du système

L'application est composée de six services Spring Boot et d'un client Angular.

```text
                     Angular Client
                            |
                            v
                   Spring Cloud Gateway
                       Port 8888
                            |
              +-------------+-------------+
              |             |             |
              v             v             v
       Customer Service  Inventory     Billing
          Port 8081       Port 8082   Port 8083
              ^             ^             |
              |             |             |
              +-------------+-------------+
                      OpenFeign

              +-----------------------+
              |                       |
              v                       v
       Eureka Discovery       Config Server
          Port 8761              Port 9999
```

**Description du fonctionnement :**

1. L'utilisateur interagit avec l'application Angular.
2. Les requêtes HTTP sont envoyées à Spring Cloud Gateway.
3. La Gateway redirige les requêtes vers le microservice approprié.
4. Eureka permet aux services de se découvrir et de s'enregistrer.
5. Billing Service utilise OpenFeign pour communiquer avec les services métier nécessaires à la facturation.
6. Config Server centralise les propriétés de configuration des services qui lui sont connectés.

*Remarque : les ports indiqués correspondent à la configuration du projet. Les routes et la communication interservices doivent être vérifiées lors des tests.*

## ⚙️ 4. Description des microservices

### 4.1 Customer Service

**Port :** `8081`

Ce microservice est responsable de la gestion des clients.

Fonctionnalités principales :
- Créer un client.
- Consulter la liste des clients.
- Consulter les informations d'un client.
- Modifier les informations d'un client.
- Supprimer un client.

### 4.2 Inventory Service

**Port :** `8082`

Ce service gère le catalogue des produits.

Fonctionnalités principales :
- Ajouter un produit.
- Afficher la liste des produits.
- Consulter un produit par son identifiant.
- Modifier les informations d'un produit.
- Supprimer un produit.

### 4.3 Billing Service

**Port :** `8083`

Ce microservice est consacré à la gestion des factures.

Son rôle est notamment de :
- Gérer les factures.
- Associer une facture à un client.
- Associer les produits concernés à une facture.
- Récupérer les données des autres services à l'aide d'OpenFeign.

### 4.4 Discovery Service — Eureka

**Port :** `8761`

Eureka fournit un annuaire centralisé des microservices.

Il permet :
- L'enregistrement des services.
- La découverte des services disponibles.
- L'identification des services par leur nom.
- La prise en charge du routage vers les instances enregistrées lorsque la configuration le permet.

Interface de supervision : `http://localhost:8761`

### 4.5 Gateway Service — Spring Cloud Gateway

**Port :** `8888`

La Gateway constitue le point d'entrée HTTP de l'application.

Ses responsabilités sont :
- Recevoir les requêtes du client Angular.
- Router les requêtes vers les microservices.
- Utiliser des routes configurées statiquement ou dynamiquement.
- Exploiter la découverte des services pour le routage basé sur leur nom lorsque cette fonctionnalité est configurée.

Exemples de chemins prévus dans la configuration :
- `/customers/**` : Customer Service.
- `/products/**` : Inventory Service.

### 4.6 Config Service — Spring Cloud Config Server

**Port :** `9999`

Ce service permet de centraliser la configuration externe des microservices.

Il peut fournir des propriétés comme :
- Les ports des services.
- Les URL des services.
- Les paramètres de découverte Eureka.
- Les paramètres propres à chaque environnement.

Le dépôt Git configuré dans `config-service` doit contenir les fichiers de configuration attendus par les services clients.

### 4.7 Client Angular

**Dossier :** `ecom-client-ang`

Le frontend Angular fournit une interface graphique permettant d'interagir avec l'application.

Les fonctionnalités prévues comprennent :
- L'affichage et la gestion des clients.
- L'affichage et la gestion des produits.
- La consultation des factures.
- La communication avec les API backend.

## 🧰 5. Technologies utilisées

| Technologie | Rôle |
|---|---|
| Java | Langage de programmation backend |
| Spring Boot | Développement des microservices |
| Spring Cloud Gateway | Routage des requêtes HTTP |
| Spring Cloud Netflix Eureka | Découverte des services |
| Spring Cloud Config | Configuration centralisée |
| OpenFeign | Communication entre microservices |
| REST API | Échange de données via HTTP |
| Angular | Développement du frontend |
| Maven | Gestion des dépendances et compilation |
| Git et GitHub | Gestion de versions et hébergement du code |

## 📁 6. Structure du projet

```text
architecture-microservices-spring-cloud/
│
├── customer-service/
│   └── src/
│
├── inventory-service/
│   └── src/
│
├── billing-service/
│   └── src/
│
├── gateway-service/
│   └── src/
│
├── discovery-service/
│   └── src/
│
├── config-service/
│   └── src/
│
├── ecom-client-ang/
│   ├── src/
│   ├── package.json
│   └── package-lock.json
│
├── src/
├── pom.xml
├── .gitignore
└── README.md
```

Le fichier `pom.xml` situé à la racine permet de gérer le projet Maven parent et ses modules, selon la configuration définie dans le projet.

## 💻 7. Prérequis

Avant de démarrer le projet, installer les outils suivants :

- JDK 21.
- Maven, ou le Maven Wrapper fourni avec le projet.
- Node.js et npm pour Angular.
- Git.
- Un IDE compatible avec Java, par exemple IntelliJ IDEA ou Visual Studio Code.

Vérifier les installations :

```bash
java -version
mvn -version
node -v
npm -v
git --version
```

## 🚀 8. Installation et démarrage

### 8.1 Cloner le dépôt

```bash
git clone https://github.com/ImaneMekkaoui1/architecture-microservices-spring-cloud.git
cd architecture-microservices-spring-cloud
```

### 8.2 Compiler le backend

À la racine du projet :

```bash
mvn clean package -DskipTests
```

Cette commande compile les modules et génère les artefacts de construction sans exécuter les tests.

### 8.3 Démarrer les services backend

Lancer chaque service dans un terminal séparé, après avoir vérifié sa configuration et ses dépendances.

Exemple pour Eureka :

```bash
cd discovery-service
mvn spring-boot:run
```

Répéter la procédure pour les services suivants :

| Service | Port |
|---|---:|
| Config Service | 9999 |
| Discovery Service | 8761 |
| Customer Service | 8081 |
| Inventory Service | 8082 |
| Billing Service | 8083 |
| Gateway Service | 8888 |

**Ordre de démarrage recommandé :**

1. Config Service, si les autres services dépendent de sa configuration.
2. Discovery Service.
3. Customer Service et Inventory Service.
4. Billing Service.
5. Gateway Service.

Adapter cet ordre aux dépendances réelles du projet. Si Config Server est configuré comme facultatif, certains services peuvent démarrer sans lui.

### 8.4 Démarrer le frontend Angular

Ouvrir un terminal :

```bash
cd ecom-client-ang
npm install
npm start
```

Si la commande `npm start` n'est pas définie dans `package.json`, utiliser :

```bash
npx ng serve
```

Accéder ensuite à l'application via :

`http://localhost:4200`

## 🌐 9. Points d'accès et tests

| Composant | Adresse |
|---|---|
| Angular | `http://localhost:4200` |
| Eureka Dashboard | `http://localhost:8761` |
| Gateway | `http://localhost:8888` |
| Customer Service direct | `http://localhost:8081` |
| Inventory Service direct | `http://localhost:8082` |
| Billing Service direct | `http://localhost:8083` |
| Config Server | `http://localhost:9999` |

Les URL exactes des endpoints REST dépendent des contrôleurs définis dans chaque service.

### Vérifications recommandées

- Vérifier que tous les services démarrent sans erreur.
- Vérifier que les services concernés apparaissent dans le tableau de bord Eureka.
- Tester les opérations CRUD des clients et des produits.
- Tester les routes de la Gateway.
- Vérifier les appels OpenFeign depuis Billing Service.
- Vérifier que Config Server retourne les propriétés attendues.
- Tester l'interface Angular et ses appels HTTP.

## 🔒 10. Configuration et bonnes pratiques

- Ne pas publier de mots de passe, clés API ou autres secrets dans Git.
- Utiliser des fichiers de configuration adaptés à chaque environnement.
- Vérifier les ports pour éviter les conflits.
- Maintenir les responsabilités métier séparées entre les microservices.
- Documenter les endpoints et les erreurs rencontrées.
- Effectuer les tests des services indépendamment avant de tester l'ensemble de l'application.

## 📚 11. Ressources pédagogiques

### Architecture microservices avec Spring Cloud

- [Partie 1 — Vidéo YouTube](https://www.youtube.com/watch?v=kOVHzN8I8e8)
- [Partie 2 — Vidéo YouTube](https://www.youtube.com/watch?v=-iM3J_mgqlM)

### Spring Cloud Config Server

- [Vidéo sur la configuration centralisée](https://www.youtube.com/watch?v=-G2rcLMO1gQ)
- [Dépôt de référence de Mohamed Youssfi](https://github.com/mohamedYoussfi/micro-services-app)

Ces ressources servent de support pédagogique pour la réalisation du travail pratique.


---

*Ce projet est réalisé dans un cadre pédagogique afin de mettre en pratique les concepts d'architecture microservices, de découverte et de communication entre services, de routage et de configuration centralisée avec Spring Cloud.*
