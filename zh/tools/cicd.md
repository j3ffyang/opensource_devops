# CI/CD 管道

## 持续集成和持续部署

CI/CD 是自动化集成、测试和代码部署的实践——实现快速、可靠的软件交付。

## 持续集成（CI）

CI 为每个代码更改自动化构建和测试流程。

### CI 管道阶段

1. **触发**：推送到仓库或创建 PR
2. **构建**：编译代码并解决依赖
3. **单元测试**：运行快速、隔离的测试
4. **Lint/格式**：检查代码质量
5. **安全扫描**：SAST、依赖检查
6. **报告**：发布结果并在阈值上失败

### 好处

- **早期问题检测**：在几分钟内捕获问题
- **降低集成风险**：频繁合并小块代码
- **快速反馈**：开发人员快速了解状态
- **可靠构建**：标准化的构建流程

## 持续部署（CD）

CD 自动将测试过的代码部署到生产环境。

### 部署管道

```
分段 → 冒烟测试 → 生产 → 健康检查
```

### 策略

**蓝绿部署**
- 两个相同的生产环境
- 将流量路由到"蓝"（当前）或"绿"（新）
- 零停机部署
- 快速回滚能力

**灰度部署**
- 先部署到小部分用户
- 监控问题指标
- 逐步增加流量
- 检测到问题时回滚

**滚动更新**
- 一次更新一个实例
- 部署期间保持可用性
- 逐步流量转移
- 比蓝绿慢但资源高效

**特性标志**
- 部署代码但禁用特性
- 无需重新部署即可启用/禁用
- A/B 测试能力
- 风险免费部署

## GitHub Actions

GitHub 的原生 CI/CD 平台集成到您的仓库。

### 工作流结构

```yaml
name: 构建和部署

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
      - name: 运行测试
        run: npm test
      - name: 构建
        run: npm run build
      - name: 部署
        if: github.ref == 'refs/heads/main'
        run: npm run deploy
```

### 关键功能

- **事件**：在推送、PR、定时、手动时触发
- **作业**：并行或顺序执行
- **步骤**：单个 action 或 shell 命令
- **秘密**：安全的凭证管理
- **工件**：存储构建输出
- **缓存**：使用依赖缓存加速构建

## Jenkins

用于复杂管道的企业级自动化服务器。

### 声明式管道

```groovy
pipeline {
    agent any
    stages {
        stage('构建') {
            steps {
                sh 'make build'
            }
        }
        stage('测试') {
            steps {
                sh 'make test'
            }
        }
        stage('部署') {
            when { branch 'main' }
            steps {
                sh 'make deploy'
            }
        }
    }
}
```

### Jenkins 特性

- **分布式构建**：跨 agent 扩展
- **插件生态**：1800+ 个插件
- **管道即代码**：版本控制您的 CI/CD
- **共享库**：可重用的管道组件
- **Blue Ocean**：管道的现代 UI

## GitLab CI/CD

GitLab 中集成的 CI/CD。

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

## 管道最佳实践

### 1. 快速反馈
- 先运行更快的测试
- 并行化独立步骤
- 缓存依赖
- 目标：10 分钟内反馈

### 2. 快速失败
- 在第一次失败时停止管道
- 优先考虑关键检查
- 失败时不运行昂贵的检查

### 3. 安全
- 扫描依赖中的漏洞
- 运行 SAST 工具
- 验证容器镜像
- 审计秘密和凭证

### 4. 通知
- 通知开发人员失败
- 发布状态到拉取请求
- 生产问题告警值班
- Slack 集成以实现可见性

### 5. 可靠性
- 重试不稳定的测试
- 使用容器化的构建环境
- 显式版本化所有工具
- 记录失败恢复

## 工件和版本控制

### 构建工件

- Docker 镜像推送到注册表
- 安全存储的编译二进制文件
- 用于分析的测试报告
- 代码覆盖率指标

### CI 中的语义化版本控制

```bash
# 自动标记发布
git tag -a v1.2.3 -m "发布 v1.2.3"
git push origin v1.2.3
```

## 部署防护措施

### 部署前检查

- ✓ 所有测试通过
- ✓ 代码已审查和批准
- ✓ 安全扫描干净
- ✓ 允许部署窗口
- ✓ 获得必需的批准

### 部署后验证

- ✓ 健康检查通过
- ✓ 错误率正常
- ✓ 性能指标健康
- ✓ 业务交易正常工作

## 回滚策略

**自动回滚**
- 检测部署后失败
- 自动恢复到之前版本
- 告警团队进行调查

**手动回滚**
- 一条命令恢复
- 清晰沟通
- 事故事后分析
