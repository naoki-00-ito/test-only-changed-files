# test-only-changed-files

## Overview
This repository demonstrates GitHub Actions workflow for tracking changed files and their dependents using [madge](https://github.com/pahen/madge). It includes a Vite + React + TypeScript application with a clear dependency chain for testing the dependency detection.

## Project Structure

### Source Code Dependency Chain
The project includes TypeScript modules with clear dependencies to test dependency detection:

```
utils.ts (base utilities)
  ↓
calculator.ts (depends on utils.ts)
  ↓
mathService.ts (depends on calculator.ts)
  ↓
App.tsx (React component using mathService.ts)
```

Each module has corresponding vitest unit tests:
- `src/utils.test.ts` - Tests for utility functions (add, subtract)
- `src/calculator.test.ts` - Tests for calculator operations
- `src/mathService.test.ts` - Tests for MathService class

### Scripts

- `npm run dev` - Start Vite development server
- `npm run build` - Build for production with TypeScript compilation
- `npm test` - Run vitest tests
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Dependency Analysis

The repository includes a script to find files that depend on changed files:
```bash
node scripts/find-dependents.cjs "src/utils.ts"
```

This will output:
- The changed file(s)
- All files that depend on the changed file(s)

### Running Tests for Changed Files

The repository includes a script to run tests for changed files and their dependents:
```bash
node scripts/run-tests-for-changed-files.cjs "src/utils.ts"
```

This script:
- Filters changed files to include only source files (files in `src/` directory)
- Runs `vitest related` command which automatically tests the changed files and all files that depend on them
- Skips testing if no source files were changed (e.g., if only documentation or configuration files were modified)

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
3. Test results for the changed files and their dependents

**How it works:**
- The workflow uses `tj-actions/changed-files` to detect changed files
- It then uses madge to analyze the dependency graph of JavaScript/TypeScript files
- Files that import or depend on the changed files are identified and displayed
- Finally, it runs `vitest related` to test all changed source files and their dependents

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
