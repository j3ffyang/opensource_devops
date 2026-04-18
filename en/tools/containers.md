# Containerization & Docker

## Why Containers?

Containers package applications with their dependencies, ensuring consistency across development, testing, and production environments.

### Benefits

- **Consistency**: Same behavior everywhere
- **Isolation**: Dependencies don't conflict
- **Portability**: Run on any system with container runtime
- **Efficiency**: Lightweight compared to VMs
- **Scalability**: Easy to replicate and distribute

## Docker Fundamentals

Docker is the industry-standard container platform.

### Key Concepts

**Image**: Blueprint for a container (filesystem, code, dependencies)
**Container**: Running instance of an image
**Registry**: Repository for storing images (Docker Hub, private registries)
**Dockerfile**: Instructions to build an image

### Dockerfile Example

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
```

### Docker Lifecycle

```bash
# Build image
docker build -t myapp:1.0 .

# Run container
docker run -d -p 3000:3000 --name myapp myapp:1.0

# View logs
docker logs myapp

# Stop container
docker stop myapp

# Remove image
docker rmi myapp:1.0
```

## Image Best Practices

### Multi-Stage Builds

Reduce final image size by separating build and runtime:

```dockerfile
# Build stage
FROM node:18 as builder
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

# Runtime stage
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm ci --only=production
CMD ["node", "dist/server.js"]
```

### Security Scanning

- Scan images for vulnerabilities
- Use minimal base images (alpine, distroless)
- Don't run as root
- Regularly update base images

### Image Tagging

```bash
# Tag with version
docker tag myapp:latest myapp:1.2.3

# Push to registry
docker push registry.example.com/myapp:1.2.3
```

## Container Registries

### Private Registries

- Docker Registry
- Harbor
- Artifactory
- ECR (AWS), GCR (Google), ACR (Azure)

### Registry Features

- Image storage and versioning
- Access control and authentication
- Image scanning
- Replication across regions
- Webhook integration

## Networking

### Container Communication

**Bridge Networks**: Default, containers on same host communicate
**Host Networks**: Container uses host's network stack
**Overlay Networks**: Multi-host networking for Kubernetes

### Ports

```bash
# Map port 8080 on host to 3000 in container
docker run -p 8080:3000 myapp
```

## Storage & Volumes

### Stateless Containers

Preferred for cloud-native applications:
- No persistent storage needed
- Easy to replicate
- Simple to update

### Named Volumes

For stateful services:

```bash
docker volume create mydata
docker run -v mydata:/data myapp
```

## Orchestration

While Docker handles single-host container management, orchestration platforms manage containers across multiple hosts:

- **Kubernetes**: Industry standard
- **Docker Swarm**: Simpler alternative
- **AWS ECS**: AWS-native solution

See the [Kubernetes section](/en/infrastructure/kubernetes) for container orchestration details.

## Docker Compose

Define multi-container applications locally:

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

## Container Runtime Standards

### OCI (Open Container Initiative)

Industry standard for:
- Image format
- Runtime specification
- Distribution specification

This ensures containers can run on any compatible platform.

## Troubleshooting Containers

### Common Commands

```bash
# View running containers
docker ps

# View all containers (including stopped)
docker ps -a

# Execute command in running container
docker exec -it myapp sh

# View container logs
docker logs --tail 100 -f myapp

# Inspect container details
docker inspect myapp

# View resource usage
docker stats
```

### Debugging

- Check logs for errors
- Verify environment variables
- Test network connectivity
- Check resource limits
- Validate volume mounts

## Container Security

### Best Practices

1. **Minimal Base Images**: Use alpine or distroless
2. **Non-Root User**: Don't run as root
3. **Read-Only Filesystem**: Make root filesystem read-only when possible
4. **Resource Limits**: Set CPU and memory limits
5. **Image Signing**: Verify image authenticity
6. **Regular Scanning**: Detect vulnerabilities early
7. **Secret Management**: Never embed secrets in images
