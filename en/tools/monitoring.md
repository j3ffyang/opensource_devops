# Monitoring & Observability

## The Three Pillars of Observability

Modern systems require deep visibility into their behavior through metrics, logs, and traces.

### 1. Metrics

Quantitative measurements collected at regular intervals:
- CPU, memory, disk usage
- Request latency and throughput
- Error rates
- Custom application metrics

Tools: Prometheus, Datadog, New Relic

### 2. Logs

Detailed event records for debugging and auditing:
- Application logs
- System logs
- Access logs
- Structured logs (JSON)

Tools: ELK Stack (Elasticsearch, Logstash, Kibana), Splunk, Loki

### 3. Traces

Request flows across distributed systems:
- Request path through services
- Latency at each step
- Error locations
- Service dependencies

Tools: Jaeger, Zipkin, Datadog APM

## Prometheus

Industry-standard metrics collection and alerting.

### Architecture

```
Applications → Prometheus → Grafana (visualization)
                      ↓
              AlertManager (alerts)
```

### Metrics Collection

**Pull-based Model**
- Prometheus scrapes metrics endpoints periodically
- Applications expose metrics on `/metrics` endpoint

```python
from prometheus_client import Counter, Histogram

request_count = Counter('requests_total', 'Total requests')
request_duration = Histogram('request_duration_seconds', 'Request duration')

@app.route('/api/data')
def get_data():
    with request_duration.time():
        request_count.inc()
        # ... business logic
```

### PromQL Queries

```promql
# Request rate (per second)
rate(requests_total[5m])

# Error percentage
(rate(requests_total{status="500"}[5m]) / rate(requests_total[5m])) * 100

# P95 latency
histogram_quantile(0.95, request_duration_seconds_bucket)
```

## Grafana

Visualization and alerting platform.

### Dashboard Creation

- Query Prometheus with PromQL
- Create panels (graphs, gauges, tables)
- Set alert thresholds
- Share dashboards across teams

### Alert Rules

```yaml
- alert: HighErrorRate
  expr: |
    (sum(rate(requests_total{status=~"5.."}[5m])) 
     / sum(rate(requests_total[5m]))) > 0.05
  for: 5m
  annotations:
    summary: "High error rate detected"
```

## ELK Stack

Elasticsearch, Logstash, Kibana for log management.

### Log Pipeline

```
Application → Logstash → Elasticsearch → Kibana
```

### Structured Logging

```json
{
  "timestamp": "2024-01-15T10:30:45.123Z",
  "level": "ERROR",
  "service": "auth-api",
  "trace_id": "abc123def456",
  "message": "Authentication failed",
  "user_id": "user_123",
  "error_code": "INVALID_TOKEN"
}
```

### Kibana Queries

```
level: "ERROR" AND service: "auth-api" AND timestamp: [now-1h TO now]
```

## Alerting Strategy

### Alert Principles

**1. Alert on Outcomes, Not Metrics**
- ❌ CPU > 80%
- ✅ Request latency > 2s (user impact)

**2. Meaningful Alerts**
- High signal-to-noise ratio
- Actionable information
- Clear remediation steps

**3. Alert Fatigue Prevention**
- Set appropriate thresholds
- Tuning based on baselines
- Suppress known issues

### Alert Routing

```yaml
# PagerDuty for critical issues
- receivers: [pagerduty]
  matchers:
    - severity = "critical"

# Slack for warnings
- receivers: [slack]
  matchers:
    - severity = "warning"
```

## SLOs & Error Budgets

### Service Level Objectives (SLOs)

Define acceptable performance:
- 99% uptime (53 minutes downtime/month)
- 99.9% uptime (43 seconds downtime/month)
- < 100ms latency for 95% of requests

### Error Budget

If SLO = 99.9% uptime, you can afford 43 seconds downtime monthly. Use this budget wisely for deployments and experiments.

## Distributed Tracing

### Trace Example

```
User Request
├─ API Gateway (10ms)
├─ Auth Service (20ms)
├─ Database Query (50ms)
├─ Cache Lookup (5ms)
└─ Response (85ms total)
```

### Instrumentation

```python
from opentelemetry import trace

tracer = trace.get_tracer(__name__)

with tracer.start_as_current_span("process_order") as span:
    span.set_attribute("order_id", order_id)
    # ... business logic
```

## Monitoring Best Practices

### 1. Coverage
- Application metrics
- Infrastructure metrics
- Business metrics
- User experience metrics

### 2. Alerting
- Alert on symptoms, not causes
- Include runbook links
- Test alert paths regularly

### 3. Dashboards
- Ops dashboard: system health
- Business dashboard: KPIs
- Service dashboard: service-specific metrics
- Incident dashboard: real-time incident data

### 4. Retention
- Metrics: 1-2 years
- Logs: 30-90 days
- Traces: 24-48 hours
- Adjust based on compliance/cost

## Cost Optimization

- Sample high-volume logs (99% of similar logs)
- Aggregate old data
- Use cheaper storage for archive logs
- Calculate metrics from raw data

## Incident Response

### On-Call Process

1. Alert triggers → Pages on-call engineer
2. Acknowledge alert in PagerDuty
3. Check dashboard and logs
4. Execute runbook
5. If needed, escalate
6. Post-incident review

### Runbooks

```markdown
# High Error Rate

## Symptoms
- Error rate > 5%
- PagerDuty alert triggered

## Immediate Actions
1. Check recent deployments
2. Review error logs
3. Check database connectivity
4. Check external API dependencies

## Escalation
If unresolved after 5 minutes, page on-call manager
```
