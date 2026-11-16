# Profily

Profily is a platform for creating and sharing professional online profiles. It helps users present their experience and work in one place by providing tools to build:

- CVs and resumes
- Portfolio pages
- Link pages for sharing professional resources
- Public previews and profile pages
- Reusable templates and example pages

The application is built with React, Vite, Tailwind CSS, and shadcn-style UI components. The repository uses npm workspaces and Turborepo so the web application and future packages can be developed from a single workspace.

## Requirements

- Node.js 24 or newer
- npm 11.6.2 or newer

You can check your installed versions with:

```bash
node --version
npm --version
```

## Getting started

Clone the repository and install dependencies from the repository root:

```bash
git clone https://github.com/KhalilAndolsi/profily.git
cd profily
npm install
```

Start the development server:

```bash
npm run dev
```

Turborepo starts the development script for the web application. Vite will display the local URL in the terminal, usually `http://localhost:5173`.

## Available commands

Run these commands from the repository root:

```bash
# Start all workspace development tasks
npm run dev

# Build all workspace applications and packages
npm run build

# Run lint checks
npm run lint

# Run TypeScript checks
npm run check-types

# Format Markdown and TypeScript files
npm run format
```

To run a command directly for the web application:

```bash
npm run dev --workspace=web
npm run build --workspace=web
npm run lint --workspace=web
```

After building the web application, preview the production build with:

```bash
npm run preview --workspace=web
```
