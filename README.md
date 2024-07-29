# React + TypeScript + Vite

Ce dépôt fournit une configuration minimale pour utiliser React avec Vite, TypeScript et ESLint. Il inclut le rechargement à chaud des modules (HMR) et quelques règles ESLint recommandées pour une expérience de développement fluide.

## Plugins Disponibles

Actuellement, deux plugins officiels sont disponibles pour intégrer React avec Vite :

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) (utilise [Babel](https://babeljs.io/) pour Fast Refresh)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) (utilise [SWC](https://swc.rs/) pour Fast Refresh)

## Prise en Main

### Prérequis

Assurez-vous d'avoir les éléments suivants installés sur votre machine de développement :

- Node.js (version 14 ou supérieure)
- npm ou yarn

### Installation

Clonez le dépôt :

```bash
git clone https://github.com/Amine9000/ucdfs_frontend.git
cd ucdfs_frontend
```

Installez les dépendances :

```bash
npm install
# ou
yarn install
```

### Développement

Démarrez le serveur de développement :

```bash
npm run dev
# ou
yarn dev
```

Cela démarrera le serveur de développement Vite et ouvrira l'application dans votre navigateur par défaut avec HMR activé.

### Construction pour la Production

Pour créer une build optimisée pour la production :

```bash
npm run build
# ou
yarn build
```

Le résultat de la build se trouvera dans le répertoire `dist`.

## Contribuer

Les contributions sont les bienvenues ! Veuillez ouvrir un ticket ou soumettre une pull request pour toute amélioration ou correction de bug.

## Licence

Ce projet est sous licence MIT.
