# DevOps Handbook & Technical Guide

A comprehensive, open-source knowledge base combining **conceptual DevOps best practices** with **practical, hands-on technical guides**.

**Available in:** [English](en/README.md) | [中文 (Chinese Simplified)](zh/README.md)

---

## 📖 Repository Structure

This repository is organized into two complementary sections:

### 1. **Handbook** (`en/` and `zh/`)
Conceptual, principle-based guides covering DevOps philosophy, culture, and high-level best practices.
- **Bilingual** — Full English and Chinese translations
- **Survey-level** — Broad overview of topics, foundational concepts
- Ideal for understanding **why** and **when** to use certain approaches

👉 **Start here:** [English Handbook](en/README.md) | [中文手册](zh/README.md)

### 2. **Technical Guides** (`docs/`)
Practical, implementation-focused documentation from years of real-world DevOps experience.
- **70+ guides** covering specific tools, architectures, and setups
- **Hands-on examples** with configurations, scripts, and troubleshooting
- Organized by topic for easy discovery

---

## 🚀 Quick Navigation

### Handbook (Best Practices & Concepts)

**English:**
```
en/
├── README.md           (start here)
├── philosophy.md
├── tools/
│   ├── version-control.md
│   ├── collaboration.md
│   ├── cicd.md
│   ├── containers.md
│   └── monitoring.md
├── infrastructure/
│   ├── iac.md
│   ├── kubernetes.md
│   ├── cloud.md
│   └── networking.md
└── security/
    └── devsecops.md
```

**中文:**
```
zh/
├── README.md           (从这里开始)
├── philosophy.md
├── tools/
│   ├── version-control.md
│   ├── collaboration.md
│   ├── cicd.md
│   ├── containers.md
│   └── monitoring.md
├── infrastructure/
│   ├── iac.md
│   ├── kubernetes.md
│   ├── cloud.md
│   └── networking.md
└── security/
    └── devsecops.md
```

### Technical Guides (Practical Implementations)

```
docs/
├── kubernetes/          (16 guides)
│   ├── 20190326_k8s_deploy.md                  # K8s on OpenStack
│   ├── 20211115_k8s_practice.md                # Production K8s deployment
│   ├── 20190909_k3s_raspberry_pi.md            # K3s on Raspberry Pi
│   ├── 20190705_istio.md                       # Istio service mesh
│   └── (more K8s, K3s, ArgoCD guides...)
│
├── containers/          (3 guides)
│   ├── 20171014_docker_swarm.md                # Docker Swarm setup
│   ├── 20171031_registry.md                    # Private Docker registry
│   └── 20220510_wechat_docker.md               # WeChat in Docker
│
├── cicd/                (4 guides)
│   ├── 20171022_gerrit.md                      # Gerrit code review
│   ├── 20180208_jenkins_openldap.md            # Jenkins + LDAP
│   ├── 20201213_argocd.md                      # ArgoCD deployment
│   └── 20210600_ansible.md                     # Ansible workflow (2240 lines)
│
├── networking/          (3 guides)
│   ├── 20201108_dns.md                         # DNS setup
│   ├── 20211122_nginx_ha_lb.md                 # Nginx HA & load balancing
│   └── 20171118_gfs.md                         # GlusterFS
│
├── security/            (14 guides)
│   ├── 20171011_openvpn_details.md             # OpenVPN setup
│   ├── 20171012_openldap.md                    # OpenLDAP + StartTLS
│   ├── 20200207_wireguard.md                   # WireGuard VPN
│   ├── 20210507_xray_vless.md                  # Xray + VLess proxy
│   ├── 240629_vless_reality_vision.md          # Reality + anti-censorship
│   └── (more VPN, proxy, LDAP, cert guides...)
│
├── databases/           (7 guides)
│   ├── 20180531_testcase_maria_mysql.md        # MySQL/MariaDB Galera
│   ├── 20170829_mongo_cluster_in_docker.md     # MongoDB cluster
│   ├── 20180626_redis_sentinel.md              # Redis HA with Sentinel
│   ├── 20201218_kafka.md                       # Kafka on K8s
│   └── (more database guides...)
│
├── monitoring/          (4 guides)
│   ├── 20201015_prom_snmp_exporter.md          # Prometheus SNMP exporter
│   ├── 20190604_stress_test.md                 # Performance testing
│   └── (monitoring setup guides...)
│
├── linux/               (8 guides)
│   ├── 20190702_ubuntu_behind_proxy.md         # Ubuntu behind proxy
│   ├── 240527_manjaroPostInstall.md            # Manjaro post-install
│   ├── 250725_installManjaroROG.md             # Manjaro on ASUS ROG laptop
│   └── (OS/hardware setup guides...)
│
├── ai/                  (3 guides)
│   ├── 20230422_chatGLM_6b_onGPU.md            # ChatGLM on single GPU
│   ├── 20230422_gpt4all_on_laptop.md           # GPT4All local LLM
│   └── 241129_localLLM_productGuide.md         # Production LLM deployment
│
└── tools/               (8 guides)
    ├── 20200317_plantuml.md                    # PlantUML setup
    ├── 20191122_why_markdown.md                # Why Markdown?
    ├── 20230617_sphinx.md                      # Sphinx documentation
    ├── 241227_hugo.md                          # Hugo publishing
    └── (more tooling guides...)
```

**How to use technical guides:**
- Browse by topic in the `docs/` directory
- Each guide is **self-contained** with examples and troubleshooting
- Image references and diagrams included
- Dates in filenames indicate when the guide was written (useful for version context)

---

## 📋 Content by Topic

| Topic | Handbook | Technical Guides |
|---|---|---|
| **Kubernetes** | `en/infrastructure/kubernetes.md` | 16 guides in `docs/kubernetes/` |
| **Containers** | `en/tools/containers.md` | 3 guides in `docs/containers/` |
| **CI/CD** | `en/tools/cicd.md` | 4 guides in `docs/cicd/` |
| **Networking** | `en/infrastructure/networking.md` | 3 guides in `docs/networking/` |
| **Security** | `en/security/devsecops.md` | 14 guides in `docs/security/` |
| **Databases** | (covered across handbook) | 7 guides in `docs/databases/` |
| **Monitoring** | `en/tools/monitoring.md` | 4 guides in `docs/monitoring/` |
| **IaC** | `en/infrastructure/iac.md` | Ansible guide in `docs/cicd/` |
| **Linux/OS** | (philosophy & culture) | 8 guides in `docs/linux/` |
| **AI/LLM** | (emerging topic) | 3 guides in `docs/ai/` |

---

## ✨ Features

✅ **Two-tier knowledge base** — Handbook (conceptual) + Guides (hands-on)  
✅ **70+ practical guides** with real configurations and troubleshooting  
✅ **Bilingual** — English and Chinese handbook sections  
✅ **Well-organized** — Topic-based directory structure  
✅ **Images & diagrams** — Architecture diagrams and screenshots included  
✅ **Configuration files** — Ready-to-use Docker Compose, GitLab, Grafana configs in `conf/`  
✅ **No build required** — Pure Markdown, directly readable on GitHub  

---

## 📁 Additional Resources

### Configuration Files
Ready-to-use configs in `conf/`:
- **Docker Compose** — GitLab, Gerrit, Grafana, MongoDB, MySQL, OpenProject, Portainer, Registry, RocketChat, Tomcat, Zabbix
- **OpenVPN** — LDAP authentication configs
- **Grafana** — INI configs + LDAP integration
- **System** — APT sources, kernel tuning

### Images & Diagrams
Architecture diagrams and screenshots in `img/`:
- K8s architecture diagrams
- Istio/Knative topology
- Network topology and ansible flow
- Performance test results
- Database cluster setups

---

## 🤝 Contributing

This is an open-source knowledge base. Contributions are welcome!

### To the Handbook:
1. Fork the repository
2. Edit files in `en/` (and mirror in `zh/` for bilingual consistency)
3. Submit a pull request

### To Technical Guides:
1. Add new guides to the appropriate `docs/` subdirectory
2. Use clear filenames with dates (e.g., `YYYYMMDD_topic.md`)
3. Include images in the `img/` directory and reference them correctly
4. Ensure image paths use relative URLs: `../../img/filename.png`

No build process needed — just edit the markdown files.

---

## 🎯 For First-Time Visitors

**Are you new to DevOps?**
1. Start with the **Handbook** → [Philosophy](en/philosophy.md)
2. Read about your area of interest (Tools, Infrastructure, or Security)

**Do you need to solve a specific problem?**
1. Browse the **Technical Guides** → `docs/` directory
2. Find your topic (Kubernetes, Networking, Security, etc.)
3. Each guide includes setup, examples, and troubleshooting

**Want to learn from real-world setups?**
1. Check `docs/kubernetes/` for production K8s deployment patterns
2. Browse `docs/security/` for networking & VPN configurations
3. Review `conf/` for ready-to-use Docker Compose and service configs

---

## 📄 License

Open source — see LICENSE file for details.

---

## 👤 About

Created as a comprehensive DevOps knowledge base combining:
- Open-source community best practices
- Linux Foundation standards
- Real-world DevOps experience (2017–2025)
- Production deployment patterns and troubleshooting guides

**Maintained by:** [j3ffyang](https://github.com/j3ffyang)

---

## 🔗 Quick Links

- **Start with Handbook:** [English](en/README.md) | [中文](zh/README.md)
- **Browse Technical Guides:** [docs/](docs/)
- **View Configurations:** [conf/](conf/)
- **See Diagrams & Images:** [img/](img/)
