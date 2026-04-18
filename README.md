# DevOps Handbook

A comprehensive, bilingual guide to DevOps practices, tools, culture, and infrastructure. This handbook covers everything from open-source philosophy to containerization, CI/CD pipelines, infrastructure as code, and modern DevSecOps practices.

**Available in English & Chinese (中文)**

## Quick Start

### Installation

```bash
cd opensource_devops
pnpm install
```

### Run Development Server

```bash
pnpm run docs:dev
```

Visit `http://localhost:5173` in your browser.

### Build for Production

```bash
pnpm run docs:build
```

The static site will be generated in the `.vitepress/dist` directory.

### Preview Production Build

```bash
pnpm run docs:preview
```

## Table of Contents

### Philosophy & Mindset
- Open source culture and community
- DevOps principles and transformation
- Team collaboration and communication

### Tools & Platforms
- **Version Control**: Git workflows, GitHub, branching strategies
- **Collaboration**: Slack, GitHub Issues, project management
- **CI/CD**: GitHub Actions, Jenkins, GitLab CI
- **Containers**: Docker, image best practices, registries
- **Monitoring**: Prometheus, Grafana, observability

### Infrastructure
- **Infrastructure as Code**: Terraform, Ansible, CloudFormation
- **Kubernetes**: Concepts, deployments, networking, scaling
- **Cloud Platforms**: AWS, GCP, Azure, multi-cloud strategies

### Security
- **DevSecOps**: Shift-left security, SAST, DAST, secrets management
- **Container Security**: Image scanning, runtime security
- **Compliance**: CIS benchmarks, audit logging

## Content Structure

```
.
├── en/                    # English content
│   ├── index.md          # Home page
│   ├── philosophy.md     # Open source mindset
│   └── tools/
│       ├── version-control.md
│       ├── collaboration.md
│       ├── cicd.md
│       ├── containers.md
│       └── monitoring.md
│   └── infrastructure/
│       ├── iac.md
│       ├── kubernetes.md
│       └── cloud.md
│   └── security/
│       └── devsecops.md
├── zh/                    # Chinese (Simplified) content
│   ├── index.md
│   └── [same structure as en/]
├── .vitepress/
│   └── config.ts         # VitePress configuration with i18n
├── package.json
└── img/                  # Images and assets
```

## Language Toggle

A language switcher is automatically available in the top navigation bar. Click the language option to switch between English and Chinese (中文).

## Features

✅ **Bilingual Support** - Complete English and Chinese content with language switcher
✅ **Modern Documentation** - Built with VitePress for fast, beautiful documentation
✅ **Comprehensive Coverage** - 10 detailed sections covering modern DevOps
✅ **Practical Examples** - Real-world code examples and configurations
✅ **Best Practices** - Industry-standard patterns and recommendations
✅ **Version Controlled** - All content stored in Git for easy collaboration
✅ **Responsive Design** - Works on desktop, tablet, and mobile devices

## Development

### Adding Content

1. Create a new markdown file in the appropriate language directory
2. Update `.vitepress/config.ts` to add the new page to navigation
3. Use markdown syntax with code blocks, tables, and formatting

### Editing Existing Pages

Simply edit the corresponding `.md` file in the `en/` or `zh/` directory and save. Changes will hot-reload in development mode.

### Building & Deployment

To generate a static HTML site for hosting:

```bash
pnpm run docs:build
```

The output will be in `.vitepress/dist/` ready for deployment to GitHub Pages, Netlify, Vercel, or any static hosting service.

## Technology Stack

- **VitePress**: Modern, fast documentation site generator
- **Vue 3**: Reactive UI components
- **Markdown**: Simple, version-controllable content format
- **i18n**: Built-in internationalization support

## Contribution

This handbook is maintained as an open-source project. Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your improvements
4. Submit a pull request

## License

This project is open source and available under the MIT License.

## Author

Created as a comprehensive DevOps knowledge base combining best practices from the open-source community, Linux Foundation, and industry standards.

---

**Start reading**: Visit the [English version](/en/) or [中文版本](/zh/)

**Questions?** Check individual section READMEs or submit an issue on GitHub.
