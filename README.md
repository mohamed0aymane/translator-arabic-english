# English → Darija Translator

Cette application permet de traduire du texte anglais vers le Darija marocain.  
Le projet est composé de **backend Spring Boot** et **frontend React** avec authentification et reconnaissance vocale.

---

## Fonctionnalités

### Backend
- Développé avec **Spring Boot**
- Authentification simple :
  - **Username** : `admin`
  - **Password** : `1234`
- Endpoint de traduction sécurisé par JWT
- Traduction via API interne

### Frontend
- Développé avec **React**
- Deux façons de saisir le texte à traduire :
  1. **Saisie manuelle** dans une zone de texte
  2. **Reconnaissance vocale** : parler dans un micro, le texte s'affiche automatiquement
- Lecture audio du texte traduit grâce à **Speech Synthesis**
- Copier le texte traduit dans le presse-papier

---

## Installation

### Backend
1. Cloner le dépôt
2. Aller dans le dossier backend
3. Configurer le fichier `application.properties` si nécessaire
4. Lancer le projet Spring Boot :
   mvn spring-boot:run

### Frontend
1. Aller dans le dossier frontend
2. Installer les dépendances si nécessaire:
   npm install
3. Lancer le projet React :
   npm start

