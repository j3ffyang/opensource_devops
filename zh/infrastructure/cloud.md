# 云平台和多云

## 云计算模型

### IaaS（基础设施即服务）

原始计算、存储和网络资源：
- 示例：EC2（AWS）、Compute Engine（GCP）、VMs（Azure）
- 使用场景：完全控制、自定义配置

### PaaS（平台即服务）

运行应用的托管环境：
- 示例：Heroku、Cloud Run、App Engine
- 使用场景：专注于代码，而不是基础设施

### SaaS（软件即服务）

完全托管的应用：
- 示例：Salesforce、Gmail、GitHub
- 使用场景：无需托管即可使用

## AWS（亚马逊网络服务）

最大的云提供商，提供最广泛的服务范围。

### 计算

- **EC2**：具有完全控制的虚拟机
- **Lambda**：无服务器函数
- **ECS**：容器编排（Kubernetes 的替代品）
- **EKS**：托管的 Kubernetes

### 存储

- **S3**：对象存储（文件、备份、静态内容）
- **EBS**：块存储（数据库、卷）
- **EFS**：网络文件系统（共享存储）

### 数据库

- **RDS**：托管关系数据库（PostgreSQL、MySQL、MariaDB）
- **DynamoDB**：NoSQL 键值存储
- **ElastiCache**：内存缓存（Redis、Memcached）

### 网络

- **VPC**：虚拟私有云
- **ELB/ALB**：负载均衡器
- **Route 53**：DNS 服务
- **CloudFront**：CDN

### DevOps 服务

- **CodePipeline**：CI/CD 编排
- **CodeBuild**：构建服务
- **CodeDeploy**：部署自动化
- **CloudFormation**：基础设施即代码

## Google Cloud Platform（GCP）

以数据处理和机器学习而闻名。

### 计算

- **Compute Engine**：虚拟机
- **App Engine**：托管应用托管
- **Cloud Run**：无服务器容器
- **GKE**：托管的 Kubernetes

### 存储

- **Cloud Storage**：对象存储
- **Persistent Disk**：块存储
- **Filestore**：网络文件系统

### 数据库

- **Cloud SQL**：托管数据库
- **Cloud Datastore**：NoSQL 数据库
- **Bigtable**：大规模 NoSQL
- **Firestore**：文档数据库

### 独特优势

- **BigQuery**：数据仓库和分析
- **Cloud AI/ML**：机器学习服务
- **Dataflow**：流和批处理

## Microsoft Azure

强大的企业集成和混合功能。

### 计算

- **Virtual Machines**：IaaS VMs
- **App Service**：托管网络应用
- **Container Instances**：无服务器容器
- **AKS**：托管的 Kubernetes

### 存储

- **Blob Storage**：对象存储
- **Disk Storage**：块存储
- **File Shares**：网络文件系统

### 数据库

- **Azure SQL**：托管 SQL Server/PostgreSQL
- **Cosmos DB**：全球分布式 NoSQL
- **Azure Database**：托管 MySQL、PostgreSQL

### 独特优势

- **Active Directory 集成**：企业安全
- **混合云**：无缝的本地集成
- **Microsoft Stack 支持**：.NET、Office 365 集成

## 选择云提供商

| 因素 | AWS | GCP | Azure |
|------|-----|-----|-------|
| 市场份额 | 最大 | 增长 | 企业强 |
| 易用性 | 陡峭 | 中等 | 陡峭 |
| 成本 | 有竞争力 | 有竞争力 | 有竞争力 |
| 数据/ML | 好 | 优秀 | 好 |
| 企业 | 成熟 | 增长 | 优秀 |
| 全球覆盖 | 最好 | 最好 | 好 |

## 多云策略

### 优势

- 避免供应商锁定
- 利用提供商优势
- 跨云灾难恢复
- 不同地区的合规性

### 挑战

- 运维复杂性
- 团队技能要求
- 成本管理困难
- 数据出站成本

### 多云工具

**Kubernetes**
- 在任何云提供商上运行
- 可移植工作负载
- 一致的 API

**Terraform**
- 云无关的 IaC
- 单一配置语言

**多云平台**
- HashiCorp Consul：服务网格
- CNCF Stackdriver：可观测性

## 成本优化

### AWS 成本管理

```bash
# 使用 AWS 成本浏览器
# 设置预算告警
# 对可预测工作负载使用预留实例
# 对容错工作负载使用 Spot 实例
```

### 成本降低策略

1. **适当调整大小**：使用合适的实例类型
2. **自动扩展**：扩展未使用的容量
3. **预留实例**：折扣长期费率
4. **Spot 实例**：便宜 90%，但可中断
5. **数据传输**：最小化出站成本
6. **存储优化**：存档旧数据

## 灾难恢复

### RTO/RPO

- **RTO**（恢复时间目标）：最大可接受停机时间
- **RPO**（恢复点目标）：最大可接受数据损失

### 策略

**备份和恢复**
- RTO：小时，RPO：小时
- 最便宜，最慢

**热备**
- RTO：10-15 分钟，RPO：分钟
- 最小资源运行

**温备**
- RTO：分钟，RPO：秒
- 接近完全容量的待机

**双活**
- RTO：无，RPO：无
- 完全复制，最高成本

## 混合云

结合本地和云基础设施：

### AWS Outposts
- AWS 基础设施在您的场所
- 一致的 API 和工具
- 低延迟连接

### Azure Stack
- 本地 Azure 服务
- 一致的体验
- 灵活的部署选项

## 云中的安全

1. **身份和访问**：IAM 策略、MFA
2. **网络**：VPCs、防火墙、安全组
3. **加密**：传输中和静止时
4. **合规性**：满足监管要求
5. **监控**：CloudTrail、VPC Flow Logs
6. **秘密管理**：AWS Secrets Manager、Azure Key Vault

## 云原生架构

### 特征

- **微服务**：小的、独立的服务
- **容器**：便携、轻量级部署
- **无服务器**：基于函数的计算
- **托管服务**：减少运维负担
- **自动扩展**：动态容量调整
- **弹性**：优雅处理故障
