# CI/CD Pipelines

## Continuous Integration & Continuous Deployment

CI/CD is the practice of automating integration, testing, and deployment of code changes—enabling rapid, reliable software delivery.

## Continuous Integration (CI)

CI automates the build and test process for every code change.

### CI Pipeline Stages

1. **Trigger**: Push to repository or PR creation
2. **Build**: Compile code and resolve dependencies
3. **Unit Tests**: Run fast, isolated tests
4. **Lint/Format**: Check code quality
5. **Security Scan**: SAST, dependency checks
6. **Report**: Publish results and fail on thresholds

### Benefits

- **Early Problem Detection**: Catch issues within minutes
- **Reduced Integration Risk**: Merge frequently in small chunks
- **Faster Feedback**: Developers know status quickly
- **Reliable Builds**: Standardized build process

## Continuous Deployment (CD)

CD automatically deploys tested code to production.

### Deployment Pipeline

```
Staging → Smoke Tests → Production → Health Checks
```

### Strategies

**Blue-Green Deployment**
- Two identical production environments
- Route traffic to "blue" (current) or "green" (new)
- Zero-downtime deployments
- Quick rollback capability

**Canary Deployments**
- Deploy to small percentage of users first
- Monitor metrics for issues
- Gradually increase traffic
- Rollback if problems detected

**Rolling Updates**
- Update instances one at a time
- Maintain availability during deployment
- Gradual traffic shift
- Slower than blue-green but resource-efficient

**Feature Flags**
- Deploy code but disable features
- Enable/disable without redeployment
- A/B testing capability
- Risk-free deployments

## GitHub Actions

GitHub's native CI/CD platform integrated into your repository.

### Workflow Structure

```yaml
name: Build and Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run tests
        run: npm test
      - name: Build
        run: npm run build
      - name: Deploy
        if: github.ref == 'refs/heads/main'
        run: npm run deploy
```

### Key Features

- **Events**: Trigger on push, PR, schedule, manual
- **Jobs**: Parallel or sequential execution
- **Steps**: Individual actions or shell commands
- **Secrets**: Secure credential management
- **Artifacts**: Store build outputs
- **Caching**: Speed up builds with dependency caching

## Jenkins

Enterprise-grade automation server for complex pipelines.

### Declarative Pipeline

```groovy
pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'make build'
            }
        }
        stage('Test') {
            steps {
                sh 'make test'
            }
        }
        stage('Deploy') {
            when { branch 'main' }
            steps {
                sh 'make deploy'
            }
        }
    }
}
```

### Jenkins Features

- **Distributed Builds**: Scale across agents
- **Plugin Ecosystem**: 1800+ plugins
- **Pipeline as Code**: Version-control your CI/CD
- **Shared Libraries**: Reusable pipeline components
- **Blue Ocean**: Modern UI for pipelines

## GitLab CI/CD

Integrated CI/CD within GitLab.

### .gitlab-ci.yml

```yaml
stages:
  - build
  - test
  - deploy

build:
  stage: build
  script:
    - docker build -t myapp .
    - docker push registry.example.com/myapp

test:
  stage: test
  script:
    - pytest tests/

deploy_prod:
  stage: deploy
  script:
    - kubectl set image deployment/myapp app=registry.example.com/myapp:$CI_COMMIT_SHA
  only:
    - main
```

## Pipeline Best Practices

### 1. Fast Feedback
- Run faster tests first
- Parallelize independent steps
- Cache dependencies
- Target: feedback within 10 minutes

### 2. Fail Fast
- Stop pipeline on first failure
- Prioritize critical checks
- Don't run expensive checks on failure

### 3. Security
- Scan dependencies for vulnerabilities
- Run SAST tools
- Verify container images
- Audit secrets and credentials

### 4. Notifications
- Notify developers of failures
- Post status to pull requests
- Alert on-call for production issues
- Slack integration for visibility

### 5. Reliability
- Retry flaky tests
- Use containerized build environment
- Version all tools explicitly
- Document failure recovery

## Artifacts & Versioning

### Build Artifacts

- Docker images pushed to registry
- Compiled binaries stored safely
- Test reports for analysis
- Code coverage metrics

### Semantic Versioning in CI

```bash
# Automatically tag releases
git tag -a v1.2.3 -m "Release v1.2.3"
git push origin v1.2.3
```

## Deployment Safeguards

### Pre-Deployment Checks

- ✓ All tests passing
- ✓ Code reviewed and approved
- ✓ Security scans clean
- ✓ Deployment window allowed
- ✓ Required approvals obtained

### Post-Deployment Validation

- ✓ Health checks passing
- ✓ Error rates normal
- ✓ Performance metrics healthy
- ✓ Business transactions working

## Rollback Strategy

**Automated Rollback**
- Detect failures post-deployment
- Automatically revert to previous version
- Alert team to investigate

**Manual Rollback**
- One-command reversal
- Clear communication
- Incident postmortem
