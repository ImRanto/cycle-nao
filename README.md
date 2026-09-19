# Cycle-nao

Application web de suivi du cycle menstruel développée avec Next.js et Tailwind CSS.

## À propos

Cycle-nao est un outil simple qui permet de calculer les dates clés du cycle menstruel (date d'ovulation, fenêtre de fertilité, prochaines règles). Toutes les données sont enregistrées localement sur le navigateur de l'utilisateur (`localStorage`) sans aucun envoi vers des serveurs externes.

## Fonctionnalités

- **Calculs estimatifs du cycle** : ovulation, période fertile, prochaines règles.
- **Paramétrage personnalisable** : durée du cycle, durée des règles, durée de la phase lutéale.
- **Calendrier mensuel interactif** : affichage coloré des différentes phases.
- **Confidentialité** : fonctionnement hors-ligne, aucun compte requis.

## Stack technique

- **Framework** : Next.js 16 (App Router) & React 19
- **Styles** : Tailwind CSS v4
- **Icônes** : Lucide React
- **Langage** : TypeScript

## Installation et démarrage

```bash
# Installation des dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Compiler pour la production
npm run build
```

## Avertissement

Les prédictions fournies par cette application sont basées sur des modèles statistiques moyens. Elles ne constituent en aucun cas un avis médical ni une méthode contraceptive garantis.
