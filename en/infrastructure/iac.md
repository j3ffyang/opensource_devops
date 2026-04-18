# Infrastructure as Code (IaC)

## Why Infrastructure as Code?

Treating infrastructure like code provides version control, code review, testing, and automation—ensuring reliability and reproducibility.

### Benefits

- **Version Control**: Track infrastructure changes over time
- **Code Review**: Peer review before applying changes
- **Testing**: Validate infrastructure before deployment
- **Automation**: Reproducible, consistent environments
- **Documentation**: Code is the source of truth
- **Rollback**: Revert to previous infrastructure state

## Terraform

Industry-leading IaC tool using declarative syntax.

### Terraform Basics

```hcl
# Define provider
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

# Define resource
resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"
  
  tags = {
    Name = "web-server"
  }
}

# Output values
output "instance_ip" {
  value = aws_instance.web.public_ip
}
```

### Terraform Workflow

```bash
# Initialize working directory
terraform init

# Plan changes
terraform plan -out=tfplan

# Review and approve
# ...

# Apply changes
terraform apply tfplan

# View state
terraform show

# Destroy resources
terraform destroy
```

### State Management

```hcl
# Store state in S3 for team collaboration
terraform {
  backend "s3" {
    bucket         = "terraform-state"
    key            = "prod/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-locks"
  }
}
```

### Modules

Reusable components:

```hcl
# Use a module
module "vpc" {
  source = "./modules/vpc"
  
  cidr_block = "10.0.0.0/16"
  region     = "us-east-1"
}
```

## Ansible

Agentless configuration management and automation.

### Playbook Structure

```yaml
---
- hosts: webservers
  become: yes
  tasks:
    - name: Install nginx
      apt:
        name: nginx
        state: present

    - name: Start nginx service
      systemd:
        name: nginx
        state: started
        enabled: yes

    - name: Deploy application
      copy:
        src: ./app
        dest: /var/www/myapp
```

### Inventory

```ini
[webservers]
web1.example.com
web2.example.com
web3.example.com

[databases]
db1.example.com
```

### Running Playbooks

```bash
# Run playbook
ansible-playbook site.yml

# Run on specific host
ansible-playbook site.yml -l webservers

# Check mode (dry run)
ansible-playbook site.yml --check
```

## Cloudformation (AWS)

Native AWS infrastructure automation.

```yaml
AWSTemplateFormatVersion: '2010-09-09'

Resources:
  MyVPC:
    Type: AWS::EC2::VPC
    Properties:
      CidrBlock: 10.0.0.0/16
      Tags:
        - Key: Name
          Value: MyVPC

  MySecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: Web server security group
      VpcId: !Ref MyVPC
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 80
          ToPort: 80
          CidrIp: 0.0.0.0/0
```

## GitOps

IaC combined with Git as source of truth.

### GitOps Principles

1. **Declarative**: Infrastructure defined in Git
2. **Version Controlled**: All changes tracked
3. **Automated Sync**: System automatically syncs to Git
4. **Observed**: Real-time status visibility

### GitOps Tools

- **ArgoCD**: Kubernetes-native GitOps
- **Flux**: GitOps for Kubernetes
- **Atlantis**: Terraform pull request automation

### Atlantis Workflow

```yaml
version: 3

projects:
  - name: prod
    dir: terraform/prod
```

Push to Git → PR created → Atlantis plans → Review plan → Approve → Auto-apply

## Best Practices

### 1. Version Control
- Store all IaC in Git
- Use semantic versioning for releases
- Protect main branch
- Require reviews

### 2. Modularization
- Create reusable modules
- DRY (Don't Repeat Yourself)
- Clear module boundaries
- Document inputs and outputs

### 3. Testing
```bash
# Validate syntax
terraform validate

# Format checking
terraform fmt -check

# Policy as code
sentinel apply policies/
```

### 4. State Management
- Remote state backend (S3, Terraform Cloud)
- Enable state locking
- Regular backups
- Encrypt sensitive data

### 5. Secrets
- Never commit secrets
- Use secret management tools
- Reference secrets at runtime
- Audit access

## Tools Comparison

| Tool | Use Case | Learning Curve |
|------|----------|-----------------|
| Terraform | Multi-cloud, large projects | Medium |
| Ansible | Configuration management, simple | Low |
| CloudFormation | AWS-only projects | Medium |
| Pulumi | Programmatic IaC | High |

## Drift Detection

Detect when actual infrastructure differs from code:

```bash
# Terraform
terraform refresh
terraform plan  # Shows any drift

# Ansible
ansible-playbook site.yml --check  # Shows what would change
```

## Documentation

```hcl
# terraform/prod/main.tf

# This module provisions the production VPC and subnets
# for hosting our microservices platform.

resource "aws_vpc" "prod" {
  description = "Production VPC with public/private subnets"
  # ...
}
```
