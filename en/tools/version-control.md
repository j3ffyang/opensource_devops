# Version Control

## Why Version Control?

Version control is the foundation of modern software development. It enables:
- Tracking changes over time
- Collaboration among teams
- Code review and quality gates
- Rollback capabilities
- Release management

## Git Fundamentals

Git is the industry-standard distributed version control system used across the open source community and enterprises.

### Key Concepts

**Repository**: A project containing all code and history
**Commit**: A snapshot of code changes with metadata
**Branch**: A parallel development line
**Remote**: Centralized repository (GitHub, GitLab)
**Merge**: Combining changes from different branches

### Common Git Workflows

**Feature Branch Workflow**
```bash
git checkout -b feature/new-auth-system
# Make changes
git commit -m "Implement JWT authentication"
git push origin feature/new-auth-system
# Create pull request
```

**Git Flow**
- `main` (production-ready)
- `develop` (integration branch)
- `feature/*` (new features)
- `hotfix/*` (production patches)
- `release/*` (release preparation)

**Trunk-Based Development**
- Single main branch (`main`)
- Short-lived feature branches (< 1 day)
- Continuous integration
- Feature flags for incomplete work

## GitHub

GitHub is the world's leading platform for collaborative software development.

### GitHub Workflows

**Pull Requests (PRs)**
- Code review mechanism
- Automated checks and tests
- Discussion and approval workflow
- Merge strategies (squash, rebase, merge commit)

**GitHub Actions**
- Native CI/CD platform
- Automated testing and deployments
- Scheduled workflows
- Community-maintained actions

**GitHub Issues**
- Bug tracking
- Feature requests
- Project planning
- Discussion threads

### GitHub Best Practices

- Require branch protection rules
- Enforce code reviews before merge
- Run automated tests on all PRs
- Use semantic commit messages
- Tag releases with version numbers

## Branching Strategies

### Feature Branches
- One feature per branch
- Short-lived (1-3 days)
- Automated tests before merge

### Environment Branches
- `main` → production
- `staging` → pre-production
- `develop` → integration

### Release Branches
- `release/v1.2.0` for release preparation
- Hotfixes tagged with version
- Automated version bumping

## Commit Message Guidelines

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**: feat, fix, docs, style, refactor, test, chore
**Example**:
```
feat(auth): add JWT token refresh endpoint

Implement automatic token refresh to improve user experience
and reduce session timeouts.

Fixes #123
```

## Code Review Best Practices

1. **Timely Reviews**: Review within 24 hours
2. **Constructive Feedback**: Focus on code, not person
3. **Approve Clearly**: Distinguish approvals from suggestions
4. **Automate Checks**: Let tools enforce standards
5. **Document Decisions**: Explain why, not just what

## Advanced Topics

### Git Hooks
Automate checks before commits/pushes
- `pre-commit`: lint, format checks
- `commit-msg`: enforce commit message format
- `pre-push`: run tests locally

### Semantic Versioning
- MAJOR.MINOR.PATCH (e.g., 1.2.3)
- MAJOR: incompatible API changes
- MINOR: backward-compatible features
- PATCH: bug fixes

### Commit Squashing
Combine multiple commits before merging to keep history clean
```bash
git rebase -i HEAD~3  # Squash last 3 commits
```
