import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'DevOps Handbook',
  description: 'A comprehensive guide to DevOps practices, tools, and culture',
  lang: 'en',

  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/' },
          {
            text: 'Guide',
            items: [
              { text: 'Philosophy', link: '/philosophy' },
              {
                text: 'Tools & Platforms',
                items: [
                  { text: 'Version Control', link: '/tools/version-control' },
                  { text: 'Collaboration', link: '/tools/collaboration' },
                  { text: 'CI/CD', link: '/tools/cicd' },
                  { text: 'Containers', link: '/tools/containers' },
                  { text: 'Monitoring', link: '/tools/monitoring' },
                ]
              },
              {
                text: 'Infrastructure',
                items: [
                  { text: 'Infrastructure as Code', link: '/infrastructure/iac' },
                  { text: 'Kubernetes', link: '/infrastructure/kubernetes' },
                  { text: 'Cloud Platforms', link: '/infrastructure/cloud' },
                ]
              },
              { text: 'DevSecOps', link: '/security/devsecops' },
            ]
          }
        ],
        sidebar: {
          '/': [
            {
              text: 'Getting Started',
              items: [
                { text: 'Philosophy', link: '/philosophy' }
              ]
            },
            {
              text: 'Tools & Platforms',
              items: [
                { text: 'Version Control', link: '/tools/version-control' },
                { text: 'Collaboration', link: '/tools/collaboration' },
                { text: 'CI/CD', link: '/tools/cicd' },
                { text: 'Containers', link: '/tools/containers' },
                { text: 'Monitoring', link: '/tools/monitoring' },
              ]
            },
            {
              text: 'Infrastructure',
              items: [
                { text: 'Infrastructure as Code', link: '/infrastructure/iac' },
                { text: 'Kubernetes', link: '/infrastructure/kubernetes' },
                { text: 'Cloud Platforms', link: '/infrastructure/cloud' },
              ]
            },
            {
              text: 'Security',
              items: [
                { text: 'DevSecOps', link: '/security/devsecops' }
              ]
            }
          ]
        },
        socialLinks: [
          { icon: 'github', link: 'https://github.com/j3ffyang/opensource_devops' }
        ]
      }
    },
    zh: {
      label: '中文',
      lang: 'zh-Hans',
      link: '/zh/',
      themeConfig: {
        nav: [
          { text: '首页', link: '/zh/' },
          {
            text: '指南',
            items: [
              { text: '理念', link: '/zh/philosophy' },
              {
                text: '工具与平台',
                items: [
                  { text: '版本控制', link: '/zh/tools/version-control' },
                  { text: '协作', link: '/zh/tools/collaboration' },
                  { text: 'CI/CD', link: '/zh/tools/cicd' },
                  { text: '容器化', link: '/zh/tools/containers' },
                  { text: '监控', link: '/zh/tools/monitoring' },
                ]
              },
              {
                text: '基础设施',
                items: [
                  { text: '基础设施即代码', link: '/zh/infrastructure/iac' },
                  { text: 'Kubernetes', link: '/zh/infrastructure/kubernetes' },
                  { text: '云平台', link: '/zh/infrastructure/cloud' },
                ]
              },
              { text: 'DevSecOps', link: '/zh/security/devsecops' },
            ]
          }
        ],
        sidebar: {
          '/zh/': [
            {
              text: '入门',
              items: [
                { text: '理念', link: '/zh/philosophy' }
              ]
            },
            {
              text: '工具与平台',
              items: [
                { text: '版本控制', link: '/zh/tools/version-control' },
                { text: '协作', link: '/zh/tools/collaboration' },
                { text: 'CI/CD', link: '/zh/tools/cicd' },
                { text: '容器化', link: '/zh/tools/containers' },
                { text: '监控', link: '/zh/tools/monitoring' },
              ]
            },
            {
              text: '基础设施',
              items: [
                { text: '基础设施即代码', link: '/zh/infrastructure/iac' },
                { text: 'Kubernetes', link: '/zh/infrastructure/kubernetes' },
                { text: '云平台', link: '/zh/infrastructure/cloud' },
              ]
            },
            {
              text: '安全',
              items: [
                { text: 'DevSecOps', link: '/zh/security/devsecops' }
              ]
            }
          ]
        },
        socialLinks: [
          { icon: 'github', link: 'https://github.com/j3ffyang/opensource_devops' }
        ]
      }
    }
  },

  themeConfig: {
    logo: '/devops-logo.svg',
    search: {
      provider: 'local'
    }
  }
})
