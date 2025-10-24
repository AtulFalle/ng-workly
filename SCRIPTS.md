# Workly UI - NPM Scripts Guide

This document provides a comprehensive guide to all available npm scripts for running, building, and testing the Workly UI applications.

## 🚀 Quick Start Commands

### Development
```bash
# Start the main shell application (default)
npm start
# or
npm run start:shell

# Start the authentication microfrontend
npm run start:auth

# Start both applications simultaneously
npm run start:all
# or
npm run dev
```

### Building
```bash
# Build all applications and libraries
npm run build

# Build individual applications
npm run build:shell
npm run build:auth

# Build only the shared libraries
npm run build:libs
```

## 📋 Complete Script Reference

### Development Scripts

| Command | Description | What it does |
|---------|-------------|--------------|
| `npm start` | Start main shell app | Runs `nx serve workly-ui` |
| `npm run start:shell` | Start shell application | Runs the main workly-ui app |
| `npm run start:auth` | Start auth microfrontend | Runs the authenticationUi app |
| `npm run start:all` | Start both apps | Runs both apps simultaneously |
| `npm run dev` | Development mode | Alias for `start:all` |

### Build Scripts

| Command | Description | What it does |
|---------|-------------|--------------|
| `npm run build` | Build everything | Builds all apps and libraries |
| `npm run build:shell` | Build shell app | Builds workly-ui application |
| `npm run build:auth` | Build auth app | Builds authenticationUi application |
| `npm run build:libs` | Build libraries | Builds shared UI libraries |
| `npm run build:all` | Build all | Builds libs + shell + auth |

### Testing Scripts

| Command | Description | What it does |
|---------|-------------|--------------|
| `npm test` | Run all tests | Runs tests for all projects |
| `npm run test:shell` | Test shell app | Runs tests for workly-ui |
| `npm run test:auth` | Test auth app | Runs tests for authenticationUi |
| `npm run test:libs` | Test libraries | Runs tests for shared libraries |

### Linting Scripts

| Command | Description | What it does |
|---------|-------------|--------------|
| `npm run lint` | Lint everything | Runs linting for all projects |
| `npm run lint:shell` | Lint shell app | Runs linting for workly-ui |
| `npm run lint:auth` | Lint auth app | Runs linting for authenticationUi |
| `npm run lint:libs` | Lint libraries | Runs linting for shared libraries |

### Utility Scripts

| Command | Description | What it does |
|---------|-------------|--------------|
| `npm run clean` | Clean workspace | Runs `nx reset` to clean cache |

## 🎯 Common Development Workflows

### 1. Full Development Setup
```bash
# Start both applications for full development
npm run dev
```
This will start:
- **Shell App**: http://localhost:4200 (main application)
- **Auth App**: http://localhost:4201 (authentication microfrontend)

### 2. Shell App Development Only
```bash
# Work on the main shell application
npm start
# or
npm run start:shell
```

### 3. Authentication Development Only
```bash
# Work on the authentication microfrontend
npm run start:auth
```

### 4. Library Development
```bash
# Build shared libraries first
npm run build:libs

# Then start the shell app
npm run start:shell
```

## 🔧 Advanced Usage

### Running with Specific Ports
```bash
# Start shell app on specific port
nx serve workly-ui --port 4200

# Start auth app on specific port
nx serve authenticationUi --port 4201
```

### Building for Production
```bash
# Build everything for production
npm run build

# Build specific app for production
npm run build:shell
```

### Running Tests
```bash
# Run all tests
npm test

# Run tests for specific app
npm run test:shell
npm run test:auth
```

## 📁 Project Structure

```
workly/
├── apps/
│   └── frontend/
│       ├── shell/workly/          # Main shell application
│       └── features/auth/         # Authentication microfrontend
├── shared/
│   └── ui-component/              # Shared UI components library
├── libs/                          # Theming library
└── package.json                   # NPM scripts configuration
```

## 🚨 Troubleshooting

### Port Already in Use
```bash
# Kill processes on specific ports
npx kill-port 4200
npx kill-port 4201

# Then restart
npm run dev
```

### Cache Issues
```bash
# Clean Nx cache
npm run clean

# Then restart
npm run dev
```

### Build Issues
```bash
# Build libraries first
npm run build:libs

# Then build applications
npm run build:shell
npm run build:auth
```

## 💡 Tips

1. **Use `npm run dev`** for full development with both apps
2. **Use `npm start`** for shell app development only
3. **Use `npm run build:libs`** before starting apps if you've made library changes
4. **Use `npm run clean`** if you encounter cache issues
5. **Check ports** if apps fail to start (4200 for shell, 4201 for auth)

## 🔗 URLs

- **Shell App**: http://localhost:4200
- **Auth App**: http://localhost:4201
- **Nx Graph**: `nx graph` (visualize project dependencies)
- **Nx Console**: Use VS Code Nx extension for GUI operations
