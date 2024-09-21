# BARK Protocol - Blink As A Service (BaaS) Web UI

## Overview

BARK Blink is a platform designed to simplify and enhance Solana interactions. It empowers developers to create fast and efficient Solana actions and applications, streamlining blockchain development through our Blink As A Service platform.

## Features

- **Lightning-Fast Transactions**: Execute Solana transactions with unprecedented speed and efficiency.
- **Enhanced Security**: Implement robust security measures to protect user assets and sensitive data.
- **Token Management**: Easily create, transfer, and manage Solana tokens within your applications.
- **Intuitive Blink SDK**: Develop Solana applications quickly with our user-friendly SDK.
- **Seamless Integration**: Effortlessly integrate Solana functionality into existing applications.
- **Scalable Infrastructure**: Built to handle high-volume transactions for growing dApps and user bases.

## Frameworks

- **Next.js**: A React framework for server-side rendering and static site generation.
- **React**: A component-based JavaScript library for building user interfaces.
- **Radix**: A set of low-level UI primitives for building accessible and customizable components.
- **TypeScript**: A strongly typed programming language that builds on JavaScript, enhancing code quality and maintainability.
- **Node.js**: A JavaScript runtime built on Chrome's V8 engine for building scalable server-side applications.
- **shadcn/ui**: A modern UI component library designed for building beautiful user interfaces with ease.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18.0.0 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) for package management

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/barkprotocol/blink-as-a-service.git
   ```

2. Navigate to the project directory:
   ```bash
   cd blink-as-a-service
   ```

3. Install dependencies:
   ```bash
   pnpm install
   # or
   yarn install
   ```

### Configuration

Create a `.env` file in the root of the project and add the following environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
NEXT_PUBLIC_MINT_API_URL=https://api.actions.barkprotocol.net/mint
TOKEN_PROGRAM_ID=TokenkegQfeZyiNwAJbNbGKPFXkQd5J8X8wnF8MPzYx
NFT_PROGRAM_ID=gEb7nD9yLkau1P4uyMdke9byJNrat61suH4vYiPUuiR
DEFAULT_WALLET_ADDRESS=your_default_wallet_address
WALLETCONNECT_BRIDGE=https://bridge.walletconnect.org
METADATA_SERVICE_URL=https://api.example.com/upload-metadata
ERROR_TRACKING_SERVICE_URL=https://errors.example.com/report
SECRET_KEY=your_secret_key_here
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

### Running the Project

To start the development server, run:

```bash
pnpm run dev
# or
yarn dev
```

Visit `http://localhost:3000` in your browser to see the application in action.

## Deployment

For deploying the project, follow the instructions provided by [Vercel](https://vercel.com/docs/deploying).

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
