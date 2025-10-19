# test-only-changed-files

## Overview
This repository demonstrates GitHub Actions workflow for tracking changed files and their dependents using [madge](https://github.com/pahen/madge). It includes a Vite + React application with a clear dependency chain for testing the dependency detection.

## Project Structure

### Source Code Dependency Chain
The project includes JavaScript modules with clear dependencies to test dependency detection:

```
utils.js (base utilities)
  ↓
calculator.js (depends on utils.js)
  ↓
mathService.js (depends on calculator.js)
  ↓
App.jsx (React component using mathService.js)
```

Each module has corresponding vitest unit tests:
- `src/utils.test.js` - Tests for utility functions (add, subtract)
- `src/calculator.test.js` - Tests for calculator operations
- `src/mathService.test.js` - Tests for MathService class

### Scripts

- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm test` - Run vitest tests
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Dependency Analysis

The repository includes a script to find files that depend on changed files:
```bash
node scripts/find-dependents.cjs "src/utils.js"
```

This will output:
- The changed file(s)
- All files that depend on the changed file(s)

## GitHub Actions Workflows

### PR Changed Files
This repository includes a GitHub Actions workflow that automatically lists all files changed in a Pull Request and identifies files that depend on those changes using [madge](https://github.com/pahen/madge).

**Workflow file:** `.github/workflows/pr-changed-files.yml`

**Triggers:**
- When a PR is opened
- When a PR is updated (synchronize)
- When a PR is reopened

**Output:**
The workflow will display:
1. A list of all changed files
2. A list of files that depend on the changed files (for JavaScript/TypeScript projects)

Both outputs are available in the Actions tab for each PR run.

**How it works:**
- The workflow uses `tj-actions/changed-files` to detect changed files
- It then uses madge to analyze the dependency graph of JavaScript/TypeScript files
- Files that import or depend on the changed files are identified and displayed

**Note:** Dependency analysis is only available for JavaScript/TypeScript files (.js, .jsx, .ts, .tsx, .mjs, .cjs). For other file types, only the changed files list will be shown.

## Testing

All tests are written using vitest and can be run with:
```bash
npm test
```

Current test coverage:
- 3 test files
- 13 passing tests
- Tests cover all utility functions, calculator operations, and service methods
