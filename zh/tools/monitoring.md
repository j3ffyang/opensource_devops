# 监控和可观测性

## 可观测性的三大支柱

现代系统需要通过指标、日志和追踪对其行为的深入可见性。

### 1. 指标

定期间隔收集的定量测量：
- CPU、内存、磁盘使用率
- 请求延迟和吞吐量
- 错误率
- 自定义应用指标

工具：Prometheus、Datadog、New Relic

### 2. 日志

用于调试和审计的详细事件记录：
- 应用日志
- 系统日志
- 访问日志
- 结构化日志（JSON）

工具：ELK Stack（Elasticsearch、Logstash、Kibana）、Splunk、Loki

### 3. 追踪

跨分布式系统的请求流：
- 服务间的请求路径
- 每一步的延迟
- 错误位置
- 服务依赖关系

工具：Jaeger、Zipkin、Datadog APM

## Prometheus

业界标准的指标收集和告警。

### 架构

```
应用程序 → Prometheus → Grafana（可视化）
                      ↓
              AlertManager（告警）
```

### 指标收集

**拉取模型**
- Prometheus 定期抓取指标端点
- 应用在 `/metrics` 端点公开指标

```python
from prometheus_client import Counter, Histogram

request_count = Counter('requests_total', '总请求数')
request_duration = Histogram('request_duration_seconds', '请求持续时间')

@app.route('/api/data')
def get_data():
    with request_duration.time():
        request_count.inc()
        # ... 业务逻辑
```

### PromQL 查询

```promql
# 请求速率（每秒）
rate(requests_total[5m])

# 错误百分比
(rate(requests_total{status="500"}[5m]) / rate(requests_total[5m])) * 100

# P95 延迟
histogram_quantile(0.95, request_duration_seconds_bucket)
```

## Grafana

可视化和告警平台。

### 仪表板创建

- 使用 PromQL 查询 Prometheus
- 创建面板（图表、仪表、表格）
- 设置告警阈值
- 跨团队共享仪表板

### 告警规则

```yaml
- alert: 高错误率
  expr: |
    (sum(rate(requests_total{status=~"5.."}[5m])) 
     / sum(rate(requests_total[5m]))) > 0.05
  for: 5m
  annotations:
    summary: "检测到高错误率"
```

## ELK Stack

Elasticsearch、Logstash、Kibana 用于日志管理。

### 日志管道

```
应用程序 → Logstash → Elasticsearch → Kibana
```

### 结构化日志

```json
{
  "timestamp": "2024-01-15T10:30:45.123Z",
  "level": "ERROR",
  "service": "auth-api",
  "trace_id": "abc123def456",
  "message": "认证失败",
  "user_id": "user_123",
  "error_code": "INVALID_TOKEN"
}
```

### Kibana 查询

```
level: "ERROR" AND service: "auth-api" AND timestamp: [now-1h TO now]
```

## 告警策略

### 告警原则

**1. 根据结果而不是指标进行告警**
- ❌ CPU > 80%
- ✅ 请求延迟 > 2s（用户影响）

**2. 有意义的告警**
- 高信噪比
- 可操作的信息
- 清晰的补救步骤

**3. 防止告警疲劳**
- 设置适当的阈值
- 根据基线进行调优
- 抑制已知问题

### 告警路由

```yaml
# PagerDuty 用于关键问题
- receivers: [pagerduty]
  matchers:
    - severity = "critical"

# Slack 用于警告
- receivers: [slack]
  matchers:
    - severity = "warning"
```

## SLOs 和错误预算

### 服务级别目标（SLOs）

定义可接受的性能：
- 99% 正常运行时间（月停机 53 分钟）
- 99.9% 正常运行时间（月停机 43 秒）
- 95% 的请求延迟 < 100ms

### 错误预算

如果 SLO = 99.9% 正常运行时间，您可以每月承受 43 秒的停机时间。明智地使用该预算进行部署和实验。

## 分布式追踪

### 追踪示例

```
用户请求
├─ API 网关（10ms）
├─ 认证服务（20ms）
├─ 数据库查询（50ms）
├─ 缓存查找（5ms）
└─ 响应（总共 85ms）
```

### 检测

```python
from opentelemetry import trace

tracer = trace.get_tracer(__name__)

with tracer.start_as_current_span("process_order") as span:
    span.set_attribute("order_id", order_id)
    # ... 业务逻辑
```

## 监控最佳实践

### 1. 覆盖范围
- 应用指标
- 基础设施指标
- 业务指标
- 用户体验指标

### 2. 告警
- 对症状而不是原因进行告警
- 包含运行手册链接
- 定期测试告警路径

### 3. 仪表板
- 运维仪表板：系统健康
- 业务仪表板：KPI
- 服务仪表板：服务特定指标
- 事故仪表板：实时事故数据

### 4. 保留
- 指标：1-2 年
- 日志：30-90 天
- 追踪：24-48 小时
- 根据合规性/成本调整

## 成本优化

- 对高量日志采样（99% 的类似日志）
- 聚合旧数据
- 使用更便宜的存档日志存储
- 从原始数据计算指标

## 事故响应

### 值班流程

1. 告警触发 → 通知值班工程师
2. 在 PagerDuty 中确认告警
3. 检查仪表板和日志
4. 执行运行手册
5. 如需要，升级
6. 事后审查

### 运行手册

```markdown
# 高错误率

## 症状
- 错误率 > 5%
- PagerDuty 告警触发

## 立即操作
1. 检查最近的部署
2. 审查错误日志
3. 检查数据库连接
4. 检查外部 API 依赖

## 升级
如果 5 分钟后未解决，通知值班经理
```
