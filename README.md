# test-only-changed-files

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
