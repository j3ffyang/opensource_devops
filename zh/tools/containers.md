# 容器化和 Docker

## 为什么使用容器？

容器将应用程序与其依赖项打包在一起，确保在开发、测试和生产环境中的行为一致。

### 好处

- **一致性**：各处行为相同
- **隔离**：依赖项不冲突
- **可移植性**：在任何具有容器运行时的系统上运行
- **效率**：与 VM 相比轻量级
- **可扩展性**：易于复制和分发

## Docker 基础

Docker 是业界标准的容器平台。

### 关键概念

**镜像**：容器的蓝图（文件系统、代码、依赖）
**容器**：镜像的运行实例
**注册表**：存储镜像的仓库（Docker Hub、私有注册表）
**Dockerfile**：构建镜像的指令

### Dockerfile 示例

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
```

### Docker 生命周期

```bash
# 构建镜像
docker build -t myapp:1.0 .

# 运行容器
docker run -d -p 3000:3000 --name myapp myapp:1.0

# 查看日志
docker logs myapp

# 停止容器
docker stop myapp

# 删除镜像
docker rmi myapp:1.0
```

## 镜像最佳实践

### 多阶段构建

通过分离构建和运行时减少最终镜像大小：

```dockerfile
# 构建阶段
FROM node:18 as builder
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

# 运行时阶段
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm ci --only=production
CMD ["node", "dist/server.js"]
```

### 安全扫描

- 扫描镜像中的漏洞
- 使用最小基础镜像（alpine、distroless）
- 不以 root 身份运行
- 定期更新基础镜像

### 镜像标签

```bash
# 使用版本标记
docker tag myapp:latest myapp:1.2.3

# 推送到注册表
docker push registry.example.com/myapp:1.2.3
```

## 容器注册表

### 私有注册表

- Docker Registry
- Harbor
- Artifactory
- ECR（AWS）、GCR（Google）、ACR（Azure）

### 注册表功能

- 镜像存储和版本控制
- 访问控制和身份验证
- 镜像扫描
- 跨区域复制
- Webhook 集成

## 网络

### 容器通信

**桥接网络**：默认，同一主机上的容器相互通信
**主机网络**：容器使用主机的网络堆栈
**覆盖网络**：多主机网络用于 Kubernetes

### 端口

```bash
# 将主机上的 8080 映射到容器中的 3000
docker run -p 8080:3000 myapp
```

## 存储和卷

### 无状态容器

云原生应用的首选：
- 不需要持久存储
- 易于复制
- 简单更新

### 命名卷

用于有状态服务：

```bash
docker volume create mydata
docker run -v mydata:/data myapp
```

## 编排

虽然 Docker 处理单主机容器管理，但编排平台跨多个主机管理容器：

- **Kubernetes**：业界标准
- **Docker Swarm**：更简单的替代品
- **AWS ECS**：AWS 原生解决方案

有关容器编排的详细信息，请参阅 [Kubernetes 部分](/zh/infrastructure/kubernetes)。

## Docker Compose

本地定义多容器应用：

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://db/myapp
    depends_on:
      - db

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=myapp
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## 容器运行时标准

### OCI（开放容器倡议）

行业标准：
- 镜像格式
- 运行时规范
- 分发规范

这确保容器可以在任何兼容平台上运行。

## 容器故障排除

### 常见命令

```bash
# 查看运行中的容器
docker ps

# 查看所有容器（包括已停止）
docker ps -a

# 在运行中的容器中执行命令
docker exec -it myapp sh

# 查看容器日志
docker logs --tail 100 -f myapp

# 检查容器详细信息
docker inspect myapp

# 查看资源使用情况
docker stats
```

### 调试

- 检查日志中的错误
- 验证环境变量
- 测试网络连接
- 检查资源限制
- 验证卷挂载

## 容器安全

### 最佳实践

1. **最小基础镜像**：使用 alpine 或 distroless
2. **非 root 用户**：不以 root 身份运行
3. **只读文件系统**：尽可能使根文件系统只读
4. **资源限制**：设置 CPU 和内存限制
5. **镜像签名**：验证镜像真实性
6. **定期扫描**：早期发现漏洞
7. **秘密管理**：不在镜像中嵌入秘密
