# DevSecOps: Security in DevOps

## Shifting Security Left

Traditional security testing happens after development is complete. DevSecOps integrates security from the beginning of development.

### Benefits of Shift-Left

- **Early Detection**: Find vulnerabilities before production
- **Cost Savings**: Cheaper to fix early
- **Development Speed**: Security doesn't slow deployment
- **Compliance**: Meet requirements throughout process

## Secure Development Practices

### Secret Management

Never commit secrets to version control:

```bash
# ❌ Wrong
password = "my-secret-key-12345"
api_token = env("DATABASE_PASSWORD")  # in code

# ✅ Right
password = os.environ.get("DB_PASSWORD")
# Set via environment variables or secret manager
```

### Secret Scanning

Scan repositories for accidentally committed secrets:

```bash
# Git pre-commit hook
git secrets --scan

# CI/CD integration
truffleHog scan filesystem /
```

### Credential Management

- **AWS Secrets Manager**: AWS credentials
- **HashiCorp Vault**: Multi-cloud secret storage
- **Azure Key Vault**: Azure secrets
- **GitHub Secrets**: Repository secrets

## Code Security

### Static Application Security Testing (SAST)

Analyze source code for vulnerabilities before compilation.

### Popular SAST Tools

**SonarQube**
```bash
# Analyze code
sonar-scanner \
  -Dsonar.projectKey=myapp \
  -Dsonar.sources=src
```

**Snyk**
```bash
# Test dependencies
snyk test

# Fix vulnerabilities
snyk fix
```

**Checkmarx**
- Enterprise SAST platform
- Multi-language support
- Policy-based scanning

### Code Quality Gates

```yaml
# GitHub Actions example
- name: SonarQube Scan
  uses: SonarSource/sonarqube-scan-action@master
  with:
    args: >
      -Dsonar.projectName=myapp
      -Dsonar.projectKey=myapp
      -Dsonar.qualitygate.wait=true
```

## Dependency Security

### Supply Chain Security

Monitor dependencies for vulnerabilities:

**Dependabot** (GitHub)
```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "daily"
    open-pull-requests-limit: 5
```

**Snyk**
```bash
# Check for vulnerable dependencies
snyk test --all-projects
```

**OWASP Dependency-Check**
```bash
dependency-check.sh \
  --project "MyApp" \
  --scan /path/to/project
```

## Container Security

### Image Scanning

Scan container images for vulnerabilities:

```bash
# Trivy
trivy image myregistry/myapp:1.0

# Grype
grype myregistry/myapp:1.0

# Aqua Security
aqua scan myregistry/myapp:1.0
```

### Image Best Practices

```dockerfile
# ✅ Secure Dockerfile
FROM alpine:3.18
RUN apk add --no-cache ca-certificates

# Create non-root user
RUN addgroup -S appuser && adduser -S appuser -G appuser

COPY --chown=appuser:appuser app /app
WORKDIR /app

USER appuser

ENTRYPOINT ["./app"]
```

## Dynamic Application Security Testing (DAST)

Test running applications for vulnerabilities.

### Tools

**OWASP ZAP**
```bash
docker run -t owasp/zap2docker-stable zap-baseline.py \
  -t https://myapp.example.com
```

**Burp Suite**
- Manual and automated testing
- Vulnerability scanning
- Enterprise capabilities

## Secrets Rotation

Regularly change credentials:

```bash
# AWS Secrets Manager - automatic rotation
aws secretsmanager rotate-secret \
  --secret-id my-database-secret \
  --rotation-rules AutomaticallyAfterDays=30
```

## Container Runtime Security

### Falco

Monitor container behavior for anomalies:

```yaml
- rule: Unauthorized Process
  desc: Detect unauthorized process execution
  condition: >
    spawned_process and container and
    not (proc.name in (allowed_processes))
  output: >
    Unauthorized process
    (user=%user.name command=%proc.cmdline)
  priority: WARNING
```

### OPA/Gatekeeper

Enforce security policies:

```rego
package kubernetes.admission

deny[msg] {
  container := input_containers[_]
  not container.securityContext.runAsNonRoot
  msg := sprintf("Container %v must run as non-root", [container.name])
}

deny[msg] {
  image := container_images[_]
  contains(image, ":latest")
  msg := sprintf("Image %v must not use latest tag", [image])
}
```

## Compliance & Audit

### Compliance Frameworks

- **HIPAA**: Healthcare data protection
- **PCI-DSS**: Payment card security
- **SOC 2**: Service organization controls
- **GDPR**: Data privacy (EU)
- **CCPA**: Data privacy (California)

### Audit Logging

```bash
# CloudTrail (AWS)
aws cloudtrail list-events

# Azure Audit Logs
az monitor activity-log list

# Kubernetes audit logs
kubectl get events
```

### Infrastructure Scanning

**CIS Benchmarks**
- Security configurations
- Best practices
- Automated testing

```bash
# CIS Kubernetes Benchmark
kube-bench run --targets node,policies
```

## Incident Response

### Security Incident Checklist

1. ✓ Detect and identify
2. ✓ Contain the threat
3. ✓ Preserve evidence
4. ✓ Remediate
5. ✓ Monitor for recurrence
6. ✓ Post-incident review

### Secrets Compromise Response

```bash
# Rotate compromised secret
aws secretsmanager put-secret-value \
  --secret-id prod/db-password \
  --secret-string "new-secure-password"

# Review secret access logs
aws secretsmanager describe-secret --secret-id prod/db-password
```

## Security Training

### Developer Training

- OWASP Top 10
- Secure coding practices
- Threat modeling
- Security tools usage

### Culture

- Security is everyone's responsibility
- Regular security reviews
- Blameless incident postmortems
- Security champions program

## DevSecOps in CI/CD

### Secure Pipeline

```yaml
stages:
  - build:
      - Compile code
      - Run SAST
      - Check dependencies
      
  - test:
      - Run unit tests
      - Run integration tests
      
  - security:
      - Scan container image
      - Runtime security check
      
  - deploy:
      - Deploy to staging
      - DAST testing
      - Deploy to production
```

## Tools Summary

| Category | Tools |
|----------|-------|
| Secret Management | Vault, AWS Secrets, Azure Key Vault |
| SAST | SonarQube, Snyk, Checkmarx |
| Dependency Scanning | Dependabot, Snyk, OWASP Dep-Check |
| Container Scanning | Trivy, Grype, Aqua |
| DAST | OWASP ZAP, Burp Suite |
| Policy Enforcement | OPA/Gatekeeper, Kyverno |
| Compliance | CIS Benchmarks, Chef InSpec |
