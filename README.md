# test-only-changed-files

## GitHub Actions Workflows

### PR Changed Files
This repository includes a GitHub Actions workflow that automatically lists all files changed in a Pull Request.

**Workflow file:** `.github/workflows/pr-changed-files.yml`

**Triggers:**
- When a PR is opened
- When a PR is updated (synchronize)
- When a PR is reopened

**Output:**
The workflow will display a list of all changed files in the Actions tab for each PR run.
