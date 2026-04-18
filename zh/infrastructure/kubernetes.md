# Kubernetes 和容器编排

## 为什么选择 Kubernetes？

Kubernetes 自动跨机器集群管理容器化应用，处理部署、扩展和网络。

### Kubernetes 解决的问题

- **部署**：容器应该在哪里运行？
- **扩展**：我们需要多少副本？
- **网络**：容器如何通信？
- **存储**：我们如何管理持久数据？
- **更新**：我们如何安全地部署新版本？
- **恢复**：容器崩溃时会发生什么？

## Kubernetes 架构

### 控制平面

- **API 服务器**：所有操作的中心枢纽
- **etcd**：存储集群状态的分布式数据库
- **调度器**：将 pod 分配给节点
- **控制器管理器**：管理各种控制器

### 工作节点

- **Kubelet**：确保 pod 运行的代理
- **容器运行时**：Docker、containerd
- **kube-proxy**：网络规则

## 核心概念

### Pods

最小可部署单元（通常每个 pod 一个容器）：

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

管理副本集和滚动更新：

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

访问 pod 的网络抽象：

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

### ConfigMaps 和 Secrets

配置和敏感数据：

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

## 部署应用

### kubectl 命令

```bash
# 创建资源
kubectl apply -f deployment.yaml

# 查看部署
kubectl get deployments

# 查看 pod
kubectl get pods

# 查看日志
kubectl logs deployment/nginx-deployment

# 端口转发
kubectl port-forward svc/nginx-service 8080:80

# 在 pod 中执行命令
kubectl exec -it <pod-name> -- /bin/bash

# 删除资源
kubectl delete -f deployment.yaml
```

## 扩展和负载均衡

### 水平 Pod 自动扩展

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

### 服务负载均衡

Kubernetes 使用 kube-proxy 和 Service IP 自动在副本间分发流量。

## 更新和回滚

### 滚动更新

逐步用新 pod 替换旧 pod：

```bash
# 更新镜像
kubectl set image deployment/nginx-deployment \
  nginx=nginx:1.22

# 监视推出
kubectl rollout status deployment/nginx-deployment

# 如有问题则回滚
kubectl rollout undo deployment/nginx-deployment
```

### 更新策略

**RollingUpdate**（默认）
- 逐步替换 pod
- 零停机时间
- 部署较慢

**Recreate**
- 终止所有 pod，然后启动新的
- 停机时间
- 部署较快

```yaml
spec:
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
```

## 存储

### 卷

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

Kubernetes 的包管理器：

```bash
# 安装图表
helm install my-release bitnami/nginx

# 升级发行版
helm upgrade my-release bitnami/nginx

# 回滚发行版
helm rollback my-release

# 列表发行版
helm list
```

## Ingress

将外部流量路由到服务：

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

## 命名空间

逻辑集群分区：

```bash
# 创建命名空间
kubectl create namespace production

# 部署到命名空间
kubectl apply -f deployment.yaml -n production

# 切换命名空间上下文
kubectl config set-context --current --namespace=production
```

## Kubernetes 监控

### 指标服务器

```bash
# 安装指标服务器
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

# 查看资源使用
kubectl top nodes
kubectl top pods
```

### Kubernetes 中的 Prometheus

- 从 kubelet 抓取指标
- 监控 pod/节点性能
- 资源使用告警
- 与 Grafana 集成

## 安全最佳实践

1. **网络策略**：限制 pod 间通信
2. **RBAC**：基于角色的访问控制
3. **Pod 安全**：以非 root 身份运行，只读文件系统
4. **秘密加密**：加密 etcd
5. **镜像扫描**：扫描容器镜像中的漏洞
6. **资源限制**：防止资源耗尽

## 故障排除

```bash
# 检查 pod 状态
kubectl describe pod <pod-name>

# 查看事件
kubectl get events --sort-by='.lastTimestamp'

# 检查日志
kubectl logs <pod-name>
kubectl logs <pod-name> -f  # 跟踪日志

# 检查资源可用性
kubectl describe node <node-name>
```
