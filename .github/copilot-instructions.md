# Copilot Instructions for expenses-tracking-front

## Project Overview
- This is a React + TypeScript frontend using Vite for fast development and HMR.
- The app is structured with feature-based folders: `components/`, `hooks/`, `provider/`, `routes/`, and `types/`.
- Authentication is managed via `AuthProvider` (`src/provider/AuthProvider.ts`) using React Context and TanStack Query.
- API calls use Axios, with endpoints like `/auth/login` and `/logout` (see `AuthProvider.ts`).
- User state is fetched via the custom hook `useMe` (`src/hooks/useMe.ts`).

## Key Patterns & Conventions
- **Context Usage:** Use `useAuth()` to access authentication state and actions. Always wrap components needing auth in `AuthProvider`.
- **Query Management:** TanStack Query is used for data fetching and caching. Invalidate queries with `queryClient.removeQueries` after logout.
- **Type Safety:** All API payloads and responses are typed (see `types/`).
- **Component Organization:** UI components are in `components/`, grouped by feature. Auth forms are in `components/auth/`.
- **Routing:** App routes are defined in `src/routes/Router.ts`.
- **Assets:** Static files and images are in `public/` and `src/assets/`.

## Developer Workflows
- **Start Dev Server:**
  ```powershell
  npm install # if needed
  npm run dev
  ```
- **Build for Production:**
  ```powershell
  npm run build
  ```
- **Linting:**
  ESLint is configured via `eslint.config.js`. Type-aware linting uses `tsconfig.app.json` and `tsconfig.node.json`.
- **Type Checking:**
  ```powershell
  npm run type-check
  ```
- **Testing:**
  _No test setup detected. Add tests in `src/` and document conventions if added._

## External Dependencies
- **React, TypeScript, Vite**: Core stack.
- **TanStack Query**: For server state management.
- **Axios**: For HTTP requests.

## Integration Points
- **Auth API:** All auth logic is centralized in `AuthProvider.ts` and `useMe.ts`. Update these for changes in backend auth.
- **Environment Variables:** Use `.env` for API URLs and secrets (not present, but recommended for production).

## Example: Auth Usage
```tsx
import { useAuth } from '../provider/AuthProvider';
const { user, login, logout } = useAuth();
```

---
_If any conventions or workflows are unclear, please ask for clarification or provide missing details to improve these instructions._
