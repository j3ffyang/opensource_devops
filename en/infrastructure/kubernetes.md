# Kubernetes & Container Orchestration

## Why Kubernetes?

Kubernetes automatically manages containerized applications across clusters of machines, handling deployment, scaling, and networking.

### Problems Kubernetes Solves

- **Deployment**: Where should containers run?
- **Scaling**: How many replicas do we need?
- **Networking**: How do containers communicate?
- **Storage**: How do we manage persistent data?
- **Updates**: How do we deploy new versions safely?
- **Recovery**: What happens when containers crash?

## Kubernetes Architecture

### Control Plane

- **API Server**: Central hub for all operations
- **etcd**: Distributed database storing cluster state
- **Scheduler**: Assigns pods to nodes
- **Controller Manager**: Manages various controllers

### Worker Nodes

- **Kubelet**: Agent ensuring pods are running
- **Container Runtime**: Docker, containerd
- **kube-proxy**: Networking rules

## Core Concepts

### Pods

Smallest deployable unit (usually one container per pod):

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
spec:
  containers:
  - name: nginx
    image: nginx:1.21
    ports:
    - containerPort: 80
```

### Deployments

Manages replica sets and rolling updates:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.21
        ports:
        - containerPort: 80
        resources:
          requests:
            memory: "64Mi"
            cpu: "250m"
          limits:
            memory: "128Mi"
            cpu: "500m"
```

### Services

Network abstraction for accessing pods:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  selector:
    app: nginx
  type: LoadBalancer
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
```

### ConfigMaps & Secrets

Configuration and sensitive data:

```yaml
# ConfigMap
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  database_host: postgres.default.svc.cluster.local
  log_level: INFO

---
# Secret
apiVersion: v1
kind: Secret
metadata:
  name: db-credentials
type: Opaque
stringData:
  username: admin
  password: secretpassword
```

## Deploying Applications

### kubectl Commands

```bash
# Create resources
kubectl apply -f deployment.yaml

# View deployments
kubectl get deployments

# View pods
kubectl get pods

# View logs
kubectl logs deployment/nginx-deployment

# Port forward
kubectl port-forward svc/nginx-service 8080:80

# Execute command in pod
kubectl exec -it <pod-name> -- /bin/bash

# Delete resources
kubectl delete -f deployment.yaml
```

## Scaling & Load Balancing

### Horizontal Pod Autoscaling

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: nginx-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: nginx-deployment
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
```

### Service Load Balancing

Kubernetes automatically distributes traffic across replicas using kube-proxy and Service IP.

## Updates & Rollbacks

### Rolling Update

Gradually replace old pods with new ones:

```bash
# Update image
kubectl set image deployment/nginx-deployment \
  nginx=nginx:1.22

# Watch rollout
kubectl rollout status deployment/nginx-deployment

# Rollback if issues
kubectl rollout undo deployment/nginx-deployment
```

### Update Strategies

**RollingUpdate** (default)
- Gradually replace pods
- Zero downtime
- Slower deployment

**Recreate**
- Terminate all pods, then start new ones
- Downtime
- Faster rollout

```yaml
spec:
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
```

## Storage

### Volumes

```yaml
spec:
  containers:
  - name: app
    volumeMounts:
    - name: data
      mountPath: /data
  volumes:
  - name: data
    persistentVolumeClaim:
      claimName: data-pvc
```

### PersistentVolumeClaim

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: data-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi
```

## Helm

Package manager for Kubernetes:

```bash
# Install chart
helm install my-release bitnami/nginx

# Upgrade release
helm upgrade my-release bitnami/nginx

# Rollback release
helm rollback my-release

# List releases
helm list
```

## Ingress

Route external traffic to services:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: app-ingress
spec:
  rules:
  - host: myapp.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: nginx-service
            port:
              number: 80
```

## Namespaces

Logical cluster partitioning:

```bash
# Create namespace
kubectl create namespace production

# Deploy to namespace
kubectl apply -f deployment.yaml -n production

# Switch namespace context
kubectl config set-context --current --namespace=production
```

## Monitoring in Kubernetes

### Metrics Server

```bash
# Install metrics server
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

# View resource usage
kubectl top nodes
kubectl top pods
```

### Prometheus in Kubernetes

- Scrape metrics from kubelet
- Monitor pod/node performance
- Alert on resource usage
- Integrate with Grafana

## Security Best Practices

1. **Network Policies**: Restrict pod-to-pod communication
2. **RBAC**: Role-based access control
3. **Pod Security**: Run as non-root, read-only filesystem
4. **Secrets Encryption**: Encrypt etcd
5. **Image Scanning**: Scan container images for vulnerabilities
6. **Resource Limits**: Prevent resource exhaustion

## Troubleshooting

```bash
# Check pod status
kubectl describe pod <pod-name>

# View events
kubectl get events --sort-by='.lastTimestamp'

# Check logs
kubectl logs <pod-name>
kubectl logs <pod-name> -f  # Follow logs

# Check resource availability
kubectl describe node <node-name>
```
