# 基础设施即代码（IaC）

## 为什么需要基础设施即代码？

将基础设施像代码一样对待可以提供版本控制、代码审查、测试和自动化——确保可靠性和可重复性。

### 好处

- **版本控制**：追踪基础设施随时间的变化
- **代码审查**：在应用更改前进行同行评审
- **测试**：在部署前验证基础设施
- **自动化**：可重复、一致的环境
- **文档**：代码是事实来源
- **回滚**：恢复到以前的基础设施状态

## Terraform

使用声明式语法的业界领先 IaC 工具。

### Terraform 基础

```hcl
# 定义提供者
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

# 定义资源
resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"
  
  tags = {
    Name = "web-server"
  }
}

# 输出值
output "instance_ip" {
  value = aws_instance.web.public_ip
}
```

### Terraform 工作流

```bash
# 初始化工作目录
terraform init

# 计划更改
terraform plan -out=tfplan

# 审查并批准
# ...

# 应用更改
terraform apply tfplan

# 查看状态
terraform show

# 销毁资源
terraform destroy
```

### 状态管理

```hcl
# 在 S3 中存储状态以进行团队协作
terraform {
  backend "s3" {
    bucket         = "terraform-state"
    key            = "prod/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-locks"
  }
}
```

### 模块

可重用的组件：

```hcl
# 使用模块
module "vpc" {
  source = "./modules/vpc"
  
  cidr_block = "10.0.0.0/16"
  region     = "us-east-1"
}
```

## Ansible

无代理配置管理和自动化。

### Playbook 结构

```yaml
---
- hosts: webservers
  become: yes
  tasks:
    - name: 安装 nginx
      apt:
        name: nginx
        state: present

    - name: 启动 nginx 服务
      systemd:
        name: nginx
        state: started
        enabled: yes

    - name: 部署应用
      copy:
        src: ./app
        dest: /var/www/myapp
```

### 清单

```ini
[webservers]
web1.example.com
web2.example.com
web3.example.com

[databases]
db1.example.com
```

### 运行 Playbooks

```bash
# 运行 playbook
ansible-playbook site.yml

# 在特定主机上运行
ansible-playbook site.yml -l webservers

# 检查模式（干运行）
ansible-playbook site.yml --check
```

## CloudFormation（AWS）

AWS 原生基础设施自动化。

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
      GroupDescription: Web 服务器安全组
      VpcId: !Ref MyVPC
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 80
          ToPort: 80
          CidrIp: 0.0.0.0/0
```

## GitOps

IaC 与 Git 作为事实来源相结合。

### GitOps 原则

1. **声明式**：基础设施在 Git 中定义
2. **版本控制**：所有更改被追踪
3. **自动化同步**：系统自动同步到 Git
4. **观察**：实时状态可见性

### GitOps 工具

- **ArgoCD**：Kubernetes 原生 GitOps
- **Flux**：Kubernetes 的 GitOps
- **Atlantis**：Terraform 拉取请求自动化

### Atlantis 工作流

```yaml
version: 3

projects:
  - name: prod
    dir: terraform/prod
```

推送到 Git → 创建 PR → Atlantis 规划 → 审查规划 → 批准 → 自动应用

## 最佳实践

### 1. 版本控制
- 在 Git 中存储所有 IaC
- 使用语义化版本发布
- 保护主分支
- 需要审查

### 2. 模块化
- 创建可重用模块
- DRY（不要重复）
- 清晰的模块边界
- 记录输入和输出

### 3. 测试
```bash
# 验证语法
terraform validate

# 格式检查
terraform fmt -check

# 策略即代码
sentinel apply policies/
```

### 4. 状态管理
- 远程状态后端（S3、Terraform Cloud）
- 启用状态锁定
- 定期备份
- 加密敏感数据

### 5. 秘密
- 不提交秘密
- 使用秘密管理工具
- 在运行时引用秘密
- 审计访问

## 工具比较

| 工具 | 用例 | 学习曲线 |
|------|------|---------|
| Terraform | 多云，大型项目 | 中等 |
| Ansible | 配置管理，简单 | 低 |
| CloudFormation | 仅 AWS 项目 | 中等 |
| Pulumi | 程序化 IaC | 高 |

## 漂移检测

检测实际基础设施与代码的差异：

```bash
# Terraform
terraform refresh
terraform plan  # 显示任何漂移

# Ansible
ansible-playbook site.yml --check  # 显示会发生什么
```

## 文档

```hcl
# terraform/prod/main.tf

# 此模块为托管我们微服务平台配置生产 VPC 和子网。

resource "aws_vpc" "prod" {
  description = "具有公共/私有子网的生产 VPC"
  # ...
}
```
