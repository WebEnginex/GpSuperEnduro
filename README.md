# SX Tour Douai - Site Web Vitrine

## 🏁 Projet Terminé

Site web vitrine professionnel pour l'événement Supercross Douai 2025 avec système d'administration complet.

## 🚀 Fonctionnalités Principales

### Site Public
- **Page d'accueil** : Présentation de l'événement avec design moderne
- **Billetterie** : 4 types de billets avec tarifs et réservation en ligne
- **Contact** : Formulaire de contact connecté à la base de données
- **Design responsive** : Optimisé pour tous les appareils

### Système d'Administration
- **Authentification Supabase** : Connexion sécurisée pour les administrateurs
- **Dashboard analytique** : Statistiques de visites en temps réel
- **Gestion des messages** : Interface complète pour traiter les demandes de contact
- **Tracking automatique** : Comptabilisation des visites sans doublons

## 🛠️ Installation et développement

### Prérequis
- Node.js 18+ 
- npm, yarn, pnpm ou bun

### Installation

```bash
# Cloner le projet
git clone <your-repo-url>
cd sx-tour-douai-react

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur pour voir le résultat.

### Scripts disponibles

```bash
npm run dev      # Serveur de développement
npm run build    # Build de production
npm run start    # Serveur de production
npm run lint     # Vérification ESLint
```

## 📁 Structure du projet

```
src/
├── app/                 # App Router (Next.js 13+)
│   ├── layout.tsx      # Layout principal
│   ├── page.tsx        # Page d'accueil
│   └── globals.css     # Styles globaux
├── components/         # Composants réutilisables
│   ├── ui/            # Composants shadcn/ui
│   ├── header.tsx     # Header avec navigation
│   └── footer.tsx     # Footer
└── lib/               # Utilitaires et configuration
    └── utils.ts       # Fonctions utilitaires
```

## 🎨 Personnalisation

### Couleurs et thème
Le thème utilise la palette de couleurs **Slate** de shadcn/ui. Vous pouvez la modifier dans :
- `src/app/globals.css` - Variables CSS personnalisées
- `tailwind.config.ts` - Configuration Tailwind

### Composants
Ajoutez de nouveaux composants shadcn/ui :
```bash
npx shadcn@latest add [component-name]
```

## 🚀 Déploiement sur Vercel

1. **Push votre code sur GitHub**

2. **Connectez votre repo à Vercel**
   - Visitez [vercel.com](https://vercel.com)
   - Importez votre projet GitHub
   - Vercel détectera automatiquement Next.js

3. **Configuration automatique**
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

4. **Variables d'environnement** (si nécessaire)
   - Ajoutez vos variables dans les settings Vercel

## 📱 Responsive Design

Le site est optimisé pour tous les écrans :
- **Mobile** : < 768px
- **Tablet** : 768px - 1024px  
- **Desktop** : > 1024px

## 🔧 Développement

### Ajout de nouvelles pages
Créez un nouveau fichier dans `src/app/` :
```tsx
// src/app/about/page.tsx
export default function About() {
  return <div>À propos</div>
}
```

### Ajout de composants
```tsx
// src/components/my-component.tsx
export function MyComponent() {
  return <div>Mon composant</div>
}
```

## 📄 Licence

Ce projet est sous licence MIT.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou un PR.

---

Créé avec ❤️ par [SX Tours](https://sx-tours.fr)
