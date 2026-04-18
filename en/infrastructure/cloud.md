# Cloud Platforms & Multi-Cloud

## Cloud Computing Models

### IaaS (Infrastructure as a Service)

Raw compute, storage, and networking resources:
- Examples: EC2 (AWS), Compute Engine (GCP), VMs (Azure)
- Use case: Full control, custom configurations

### PaaS (Platform as a Service)

Managed environments for running applications:
- Examples: Heroku, Cloud Run, App Engine
- Use case: Focus on code, not infrastructure

### SaaS (Software as a Service)

Fully managed applications:
- Examples: Salesforce, Gmail, GitHub
- Use case: Use without hosting concerns

## AWS (Amazon Web Services)

Largest cloud provider with broadest service range.

### Compute

- **EC2**: Virtual machines with full control
- **Lambda**: Serverless functions
- **ECS**: Container orchestration (alternative to Kubernetes)
- **EKS**: Managed Kubernetes

### Storage

- **S3**: Object storage (files, backups, static content)
- **EBS**: Block storage (databases, volumes)
- **EFS**: Network filesystem (shared storage)

### Database

- **RDS**: Managed relational databases (PostgreSQL, MySQL, MariaDB)
- **DynamoDB**: NoSQL key-value store
- **ElastiCache**: In-memory cache (Redis, Memcached)

### Networking

- **VPC**: Virtual private cloud
- **ELB/ALB**: Load balancers
- **Route 53**: DNS service
- **CloudFront**: CDN

### DevOps Services

- **CodePipeline**: CI/CD orchestration
- **CodeBuild**: Build service
- **CodeDeploy**: Deployment automation
- **CloudFormation**: Infrastructure as Code

## Google Cloud Platform (GCP)

Known for data processing and machine learning.

### Compute

- **Compute Engine**: Virtual machines
- **App Engine**: Managed application hosting
- **Cloud Run**: Serverless containers
- **GKE**: Managed Kubernetes

### Storage

- **Cloud Storage**: Object storage
- **Persistent Disk**: Block storage
- **Filestore**: Network filesystem

### Database

- **Cloud SQL**: Managed databases
- **Cloud Datastore**: NoSQL database
- **Bigtable**: Large-scale NoSQL
- **Firestore**: Document database

### Unique Strengths

- **BigQuery**: Data warehouse and analytics
- **Cloud AI/ML**: Machine learning services
- **Dataflow**: Stream and batch processing

## Microsoft Azure

Strong enterprise integration and hybrid capabilities.

### Compute

- **Virtual Machines**: IaaS VMs
- **App Service**: Managed web applications
- **Container Instances**: Serverless containers
- **AKS**: Managed Kubernetes

### Storage

- **Blob Storage**: Object storage
- **Disk Storage**: Block storage
- **File Shares**: Network filesystem

### Database

- **Azure SQL**: Managed SQL Server/PostgreSQL
- **Cosmos DB**: Globally distributed NoSQL
- **Azure Database**: Managed MySQL, PostgreSQL

### Unique Strengths

- **Active Directory Integration**: Enterprise security
- **Hybrid Cloud**: Seamless on-premises integration
- **Microsoft Stack Support**: .NET, Office 365 integration

## Choosing a Cloud Provider

| Factor | AWS | GCP | Azure |
|--------|-----|-----|-------|
| Market Share | Largest | Growing | Enterprise strong |
| Ease of Use | Steep | Moderate | Steep for enterprises |
| Cost | Competitive | Competitive | Competitive |
| Data/ML | Good | Excellent | Good |
| Enterprise | Mature | Growing | Excellent |
| Global Reach | Best | Best | Good |

## Multi-Cloud Strategy

### Advantages

- Avoid vendor lock-in
- Leverage provider strengths
- Disaster recovery across clouds
- Compliance in different regions

### Challenges

- Operational complexity
- Team skill requirements
- Cost management difficulty
- Data egress costs

### Tools for Multi-Cloud

**Kubernetes**
- Runs on any cloud provider
- Portable workloads
- Consistent API

**Terraform**
- Cloud-agnostic IaC
- Single configuration language

**Multi-Cloud Platforms**
- HashiCorp Consul: Service mesh
- CNCF Stackdriver: Observability

## Cost Optimization

### AWS Cost Management

```bash
# Use AWS Cost Explorer
# Set up budget alerts
# Reserved instances for predictable workloads
# Spot instances for fault-tolerant workloads
```

### Cost Reduction Strategies

1. **Right-sizing**: Use appropriate instance types
2. **Auto-scaling**: Scale down unused capacity
3. **Reserved Instances**: Discounted long-term rates
4. **Spot Instances**: Up to 90% cheaper, but interruptible
5. **Data Transfer**: Minimize egress costs
6. **Storage Optimization**: Archive old data

## Disaster Recovery

### RTO/RPO

- **RTO** (Recovery Time Objective): Max acceptable downtime
- **RPO** (Recovery Point Objective): Max acceptable data loss

### Strategies

**Backup & Restore**
- RTO: Hours, RPO: Hours
- Cheapest, slowest

**Pilot Light**
- RTO: 10-15 minutes, RPO: Minutes
- Minimal resources running

**Warm Standby**
- RTO: Minutes, RPO: Seconds
- Near full-capacity standby

**Active-Active**
- RTO: None, RPO: None
- Full replication, highest cost

## Hybrid Cloud

Combine on-premises and cloud infrastructure:

### AWS Outposts
- AWS infrastructure on your premises
- Consistent API and tooling
- Low-latency connectivity

### Azure Stack
- Azure services on-premises
- Consistent experience
- Flexible deployment options

## Security in Cloud

1. **Identity & Access**: IAM policies, MFA
2. **Network**: VPCs, firewalls, security groups
3. **Encryption**: In-transit and at-rest
4. **Compliance**: Meet regulatory requirements
5. **Monitoring**: CloudTrail, VPC Flow Logs
6. **Secrets Management**: AWS Secrets Manager, Azure Key Vault

## Cloud-Native Architecture

### Characteristics

- **Microservices**: Small, independent services
- **Containers**: Portable, lightweight deployments
- **Serverless**: Function-based computing
- **Managed Services**: Reduce operational burden
- **Auto-scaling**: Dynamic capacity adjustment
- **Resilience**: Handle failures gracefully
