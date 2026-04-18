# DevSecOps：DevOps 中的安全

## 左移安全

传统的安全测试在开发完成后进行。DevSecOps 从开发开始就集成安全。

### 左移的好处

- **早期检测**：在生产前找到漏洞
- **成本节约**：早期修复成本更低
- **开发速度**：安全不会减慢部署
- **合规性**：在整个过程中满足要求

## 安全开发实践

### 秘密管理

不要将秘密提交到版本控制：

```bash
# ❌ 错误
password = "my-secret-key-12345"
api_token = env("DATABASE_PASSWORD")  # 在代码中

# ✅ 正确
password = os.environ.get("DB_PASSWORD")
# 通过环境变量或秘密管理器设置
```

### 秘密扫描

扫描仓库以查找意外提交的秘密：

```bash
# Git 预提交钩子
git secrets --scan

# CI/CD 集成
truffleHog scan filesystem /
```

### 凭证管理

- **AWS Secrets Manager**：AWS 凭证
- **HashiCorp Vault**：多云秘密存储
- **Azure Key Vault**：Azure 秘密
- **GitHub Secrets**：仓库秘密

## 代码安全

### 静态应用安全测试（SAST）

编译前分析源代码中的漏洞。

### 流行的 SAST 工具

**SonarQube**
```bash
# 分析代码
sonar-scanner \
  -Dsonar.projectKey=myapp \
  -Dsonar.sources=src
```

**Snyk**
```bash
# 测试依赖
snyk test

# 修复漏洞
snyk fix
```

**Checkmarx**
- 企业 SAST 平台
- 多语言支持
- 基于策略的扫描

### 代码质量门

```yaml
# GitHub Actions 示例
- name: SonarQube 扫描
  uses: SonarSource/sonarqube-scan-action@master
  with:
    args: >
      -Dsonar.projectName=myapp
      -Dsonar.projectKey=myapp
      -Dsonar.qualitygate.wait=true
```

## 依赖安全

### 供应链安全

监控依赖中的漏洞：

**Dependabot**（GitHub）
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
# 检查易受攻击的依赖
snyk test --all-projects
```

**OWASP Dependency-Check**
```bash
dependency-check.sh \
  --project "MyApp" \
  --scan /path/to/project
```

## 容器安全

### 镜像扫描

扫描容器镜像中的漏洞：

```bash
# Trivy
trivy image myregistry/myapp:1.0

# Grype
grype myregistry/myapp:1.0

# Aqua Security
aqua scan myregistry/myapp:1.0
```

### 镜像最佳实践

```dockerfile
# ✅ 安全的 Dockerfile
FROM alpine:3.18
RUN apk add --no-cache ca-certificates

# 创建非 root 用户
RUN addgroup -S appuser && adduser -S appuser -G appuser

COPY --chown=appuser:appuser app /app
WORKDIR /app

USER appuser

ENTRYPOINT ["./app"]
```

## 动态应用安全测试（DAST）

测试运行中的应用中的漏洞。

### 工具

**OWASP ZAP**
```bash
docker run -t owasp/zap2docker-stable zap-baseline.py \
  -t https://myapp.example.com
```

**Burp Suite**
- 手动和自动测试
- 漏洞扫描
- 企业功能

## 秘密轮换

定期更改凭证：

```bash
# AWS Secrets Manager - 自动轮换
aws secretsmanager rotate-secret \
  --secret-id my-database-secret \
  --rotation-rules AutomaticallyAfterDays=30
```

## 容器运行时安全

### Falco

监控容器行为以查找异常：

```yaml
- rule: 未授权进程
  desc: 检测未授权的进程执行
  condition: >
    spawned_process and container and
    not (proc.name in (allowed_processes))
  output: >
    未授权进程
    (user=%user.name command=%proc.cmdline)
  priority: WARNING
```

### OPA/Gatekeeper

强制执行安全策略：

```rego
package kubernetes.admission

deny[msg] {
  container := input_containers[_]
  not container.securityContext.runAsNonRoot
  msg := sprintf("容器 %v 必须以非 root 身份运行", [container.name])
}

deny[msg] {
  image := container_images[_]
  contains(image, ":latest")
  msg := sprintf("镜像 %v 不能使用 latest 标签", [image])
}
```

## 合规性和审计

### 合规框架

- **HIPAA**：医疗数据保护
- **PCI-DSS**：支付卡安全
- **SOC 2**：服务组织控制
- **GDPR**：数据隐私（欧盟）
- **CCPA**：数据隐私（加州）

### 审计日志

```bash
# CloudTrail（AWS）
aws cloudtrail list-events

# Azure 审计日志
az monitor activity-log list

# Kubernetes 审计日志
kubectl get events
```

### 基础设施扫描

**CIS 基准**
- 安全配置
- 最佳实践
- 自动化测试

```bash
# CIS Kubernetes 基准
kube-bench run --targets node,policies
```

## 事故响应

### 安全事故清单

1. ✓ 检测和识别
2. ✓ 遏制威胁
3. ✓ 保留证据
4. ✓ 补救
5. ✓ 监控复发
6. ✓ 事后审查

### 秘密泄露响应

```bash
# 轮换泄露的秘密
aws secretsmanager put-secret-value \
  --secret-id prod/db-password \
  --secret-string "new-secure-password"

# 审查秘密访问日志
aws secretsmanager describe-secret --secret-id prod/db-password
```

## 安全培训

### 开发人员培训

- OWASP Top 10
- 安全编码实践
- 威胁建模
- 安全工具使用

### 文化

- 安全是每个人的责任
- 定期安全审查
- 无责任的事故事后分析
- 安全冠军计划

## CI/CD 中的 DevSecOps

### 安全管道

```yaml
stages:
  - build:
      - 编译代码
      - 运行 SAST
      - 检查依赖
      
  - test:
      - 运行单元测试
      - 运行集成测试
      
  - security:
      - 扫描容器镜像
      - 运行时安全检查
      
  - deploy:
      - 部署到分段
      - DAST 测试
      - 部署到生产
```

## 工具摘要

| 类别 | 工具 |
|------|------|
| 秘密管理 | Vault、AWS Secrets、Azure Key Vault |
| SAST | SonarQube、Snyk、Checkmarx |
| 依赖扫描 | Dependabot、Snyk、OWASP Dep-Check |
| 容器扫描 | Trivy、Grype、Aqua |
| DAST | OWASP ZAP、Burp Suite |
| 策略执行 | OPA/Gatekeeper、Kyverno |
| 合规性 | CIS 基准、Chef InSpec |
