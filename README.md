# WAZILEDGER

WAZILEDGER est une plateforme décentralisée qui transforme les ressources naturelles et culturelles de la RDC en **actifs traçables et authentifiés** via Hedera Hashgraph, NFTs et smart contracts.  
Elle permet de sécuriser, valoriser et commercialiser ces ressources tout en créant des opportunités pour les communautés locales.

---

## Table des matières

- [Architecture](#architecture)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Structure des dossiers](#structure-des-dossiers)
- [Variables d'environnement](#variables-denvironnement)
- [Commandes principales](#commandes-principales)
- [Tests](#tests)
- [Déploiement Hedera](#déploiement-hedera)
- [Technologies utilisées](#technologies-utilisées)
- [Sécurité & recommandations](#sécurité--recommandations)
- [Auteurs](#auteurs)

---

## Architecture

waziledger/
├─ frontend/ # Next.js + TypeScript
├─ backend/ # Express + TypeScript
├─ contracts/ # Solidity smart contracts
├─ docs/ # Documentation
├─ hardhat.config.ts # Config Hardhat Hedera EVM
└─ package.json # Dépendances racine

---

## Prérequis

- Node.js >= 18
- NPM >= 9
- Comptes Hedera testnet (operator id/key)
- API Key pour [nft.storage](https://nft.storage/) ou Pinata
- TypeScript installé globalement ou localement

---

## Installation

### Frontend

```bash
cd frontend
npm install

Backend
cd backend
npm install

Contrats (Hardhat + Hedera)
cd contracts
npm install
npx hardhat
# Choisir "Create a TypeScript project"

Structure des dossiers
Frontend (frontend/)

pages/ : index.tsx, upload.tsx, marketplace.tsx, profile.tsx

components/ : boutons, cards, alertes

utils/ : client Axios, fonctions helper pour backend

Backend (backend/)

src/controllers/ : API controllers pour upload, mint, HCS

src/services/ : interaction avec IPFS et Hedera SDK

src/routes.ts : définition des routes API

src/index.ts : serveur Express principal

Contrats (contracts/)

SimpleMarketplace.sol : marketplace NFT simple

hardhat.config.ts : configuration Hardhat + réseau Hedera

test/ : tests unitaires Hardhat

Variables d'environnement

Créer un fichier .env à la racine de backend/ et contracts/ :

# Backend
HEDERA_OPERATOR_ID=0.0.xxxxx
HEDERA_OPERATOR_KEY=302e02...
NFT_STORAGE_KEY=your_nft_storage_api_key
PORT=4000

# Contracts (Hardhat)
PRIVATE_KEY=ta_cle_privee_testnet
