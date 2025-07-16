# Rolling Dice – E-commerce de jeux de société

Rolling Dice est un site e-commerce permettant de découvrir, filtrer et acheter des jeux de société en ligne. Il propose un système d'abonnement donnant droit à une réduction de 50 % sur toutes les commandes.

## Fonctionnalités

- Navigation par catalogue et page de détail d’un jeu
- Panier avec ajout, suppression et ajustement des quantités
- Authentification (connexion, inscription)
- Paiement simulé en trois étapes
- Abonnement premium avec réduction automatique
- Récapitulatif de commande avec estimation de livraison

## Technologies utilisées

- Next.js (App Router)
- TypeScript / React
- Redux Toolkit (auth et panier)
- CSS Modules
- LocalStorage
- Déploiement via Vercel

## Installation locale

```bash
npm install
npm run dev

/app            → Pages (produits, login, checkout...)
/components     → Composants réutilisables (Nav, Panier, etc.)
/features       → Redux slices (auth, panier)
/public         → Images statiques
/styles         → Fichiers CSS


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
