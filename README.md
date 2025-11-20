# See Tickets Frontend

A React application that displays events from a backend API with a responsive Material-UI interface.

## Features

- **Event List**: Browse events in a responsive grid layout with virtual scrolling
- **Settings**: Update application settings via a form drawer
- **Optimized Fetching**: Toggle between standard and optimized event loading with pagination
- **State Management**: Redux Toolkit for centralized state management

## Tech Stack

- **React 18** with TypeScript
- **Material-UI (MUI)** for UI components
- **Redux Toolkit** for state management
- **Formik** with Yup for form handling
- **React Virtuoso** for virtualized lists
- **Vite** as the build tool

## Getting Started

### Install Dependencies

```bash
yarn install
```

### Run Development Server

```bash
yarn dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
yarn build
```

### Preview Production Build

```bash
yarn preview
```

## Project Structure

- `src/components/` - UI components (atoms, molecules, organisms, templates)
- `src/hooks/` - Custom React hooks
- `src/store/` - Redux store and slices
- `src/types/` - TypeScript type definitions
- `src/utils/` - Utility functions
