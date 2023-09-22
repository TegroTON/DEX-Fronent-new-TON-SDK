<br/>
<p align="center">
  <a href="https://github.com/SKAT1005/dex-fronent-new-DEX">
    <img src="https://tegro.money/assets/images/logotype.svg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">DEX - Decentralized Exchange</h3>

  <p align="center">
    DEX is a platform for secure and efficient cryptocurrency exchange.
    <br/>
    <a href="https://dex.tegro.io/">View Demo</a>
    .
    <a href="https://github.com/SKAT1005/dex-fronent-new-DEX/issues">Report Bug</a>
    .
    <a href="https://github.com/SKAT1005/dex-fronent-new-DEX/issues">Request Feature</a>
  </p>
</p>

## Table Of Contents

- [About the Project](#about-the-project)
- [Key Features](#key-features)
- [Main Components and Functions](#main-components-and-functions)
  - [Components](#components)
  - [Hooks](#hooks)
  - [Templates](#templates)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Testing](#testing)
- [Contribution](#contribution)
- [Authors](#authors)

## About the Project

**DEX (Decentralized Exchange)** is a decentralized platform for cryptocurrency exchange. It provides users with an intuitive interface for secure transactions without the need to trust centralized exchanges.

## Key Features

- **Security**: All transactions are directly between users, eliminating risks associated with hacking attacks on centralized exchanges.
- **User-friendly**: An intuitive interface makes the exchange process straightforward even for beginners.
- **Flexibility**: Supports various cryptocurrencies and tokens.

## Main Components and Functions
### Components
   - App.tsx: Main application component.
   - ScrollToTop.tsx: Component for scrolling the page to the top.
   - context.tsx: Contextual state storage of the application.
   - deLabContext.tsx: Additional contextual storage.
   - main.tsx: Main entry point to the application.
   - wallets-list.ts: List of wallets for connection.
 ### Hooks
   - useCalcPrice.ts: Hook for price calculation.
   - useForceUpdate.ts: Hook for forced component update.
   - useFormatPriceImpact.tsx: Hook for formatting price impact.
   - usePrintRoute.tsx: Hook for route display.
   - useSlicedAddress.ts: Hook for address truncation.
   - useSwitchTheme.ts: Hook for theme switching.
   - useTonConnectWallet.ts: Hook for TON wallet connection.
 ### Templates
   - AddLiquidity.tsx: Liquidity addition.
   - ComingSoon.tsx: "Coming Soon" page.
   - Farms.tsx: Mining farms.
   - IDO.tsx: Initial Exchange Offering initialization.
   - Liquidity.tsx: Liquidity management.
   - Swap.tsx: Token exchange.

## Getting Started

### Installation

To get started with the project, ensure you have Node.js (version >13.0) and npm installed. Then, execute the following commands:

```sh
# Clone the repository
git clone https://github.com/SKAT1005/dex.git

# Navigate to the project directory
cd dex

# Install dependencies
npm install

# Build project
npm run build

# Start the project in development mode
npm run dev



## Authors

* **SKAT1005** - *Developer* - [SKAT1005](https://github.com/SKAT1005)
