# Next.js 启动模板

这是一个专为中国开发者打造的现代化 Next.js 启动模板，采用最新技术栈，既支持 Vercel 部署，也优化了自托管场景。自托管优先，让你的应用不受限于国际网络访问限制。

## 📋 特性

- ✅ **认证系统** - 基于 Next-Auth v5 的完整用户认证系统
- 🌐 **国际化** - 使用 next-intl 实现的多语言支持
- 🎨 **现代 UI** - 基于 Shadcn UI 和 Tailwind CSS 的美观界面
- 📊 **数据库集成** - 使用 Drizzle ORM 实现类型安全的数据库操作
- 🔄 **请求状态管理** - 基于 TanStack Query 的高效数据获取与缓存
- 🔄 **状态管理** - 使用 Zustand 实现轻量级且高性能的状态管理
- 🧪 **测试工具** - 集成 Vitest 单元测试和 Playwright E2E 测试
- 📦 **Docker 支持** - 优化的 Docker 配置，便于容器化部署
- 📝 **类型安全** - 完全使用 TypeScript 开发，提供卓越的开发体验
- 🔍 **日志系统** - 基于 Pino 的结构化日志，方便调试和监控
- 🚀 **自动化部署** - 支持 CI/CD 流程，快速上线应用
- 🔒 **安全增强** - 集成 Sentry 错误监控（可选自托管）

## 🛠️ 技术栈

- **前端框架**: [Next.js 15](https://nextjs.org)、[React 19](https://react.dev)
- **样式方案**: [Tailwind CSS](https://tailwindcss.com)、[Shadcn UI](https://ui.shadcn.com)
- **请求状态管理**: [TanStack Query v5](https://tanstack.com/query/latest)
- **认证**: [Next-Auth v5](https://authjs.dev)
- **数据库**: [Drizzle ORM](https://orm.drizzle.team)、[PostgreSQL](https://www.postgresql.org)
- **国际化**: [next-intl](https://next-intl-docs.vercel.app)
- **表单处理**: [React Hook Form](https://react-hook-form.com)、[Zod](https://zod.dev)
- **测试**: [Vitest](https://vitest.dev)、[Playwright](https://playwright.dev)
- **日志**: [Pino](https://getpino.io)
- **容器化**: [Docker](https://www.docker.com)
- **错误监控**: [Sentry](https://sentry.io)

## 🚀 快速开始

### 前置要求

- Node.js 18+ (推荐使用 [nvm](https://github.com/nvm-sh/nvm) 管理版本)
- PostgreSQL 数据库
- pnpm 包管理器

### 安装

1. 克隆仓库:

```bash
git clone https://github.com/your-username/next-template.git
cd next-template
```

2. 安装依赖:

```bash
pnpm install
```

3. 环境配置:

复制 `.env.example` 到 `.env.local` 并填入必要的环境变量:

```bash
cp .env.example .env.local
```

4. 数据库迁移:

**开发环境**:
```bash
pnpm migrate
```

**生产环境**:
```bash
pnpm dlx drizzle-kit migrate
```

### 开发

启动开发服务器:

```bash
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建与部署

构建生产版本:

```bash
pnpm build
```

运行生产版本:

```bash
pnpm start
```

### Docker 部署

使用 Docker Compose 快速部署:

```bash
docker-compose up -d
```

## 📋 可用命令

- `pnpm dev` - 启动开发服务器
- `pnpm build` - 构建生产版本
- `pnpm start` - 运行生产版本
- `pnpm test` - 运行单元测试
- `pnpm test:e2e` - 运行端到端测试
- `pnpm migrate` - 运行数据库迁移（开发环境）
- `pnpm dlx drizzle-kit migrate` - 运行数据库迁移（生产环境）
- `pnpm lint` - 检查代码风格
- `pnpm lint:fix` - 自动修复代码风格问题
- `pnpm analyze` - 分析构建包大小

## 📚 项目结构

```
├── src/
│   ├── app/                 # Next.js 应用代码
│   │   ├── [locale]/        # 国际化路由
│   │   │   ├── auth/        # 认证相关页面
│   │   │   ├── api/         # API 路由
│   │   │   ├── dashboard/   # 仪表盘页面
│   ├── components/          # React 组件
│   │   ├── ui/              # 基础 UI 组件
│   │   ├── providers.tsx    # React Context Providers
│   ├── db/                  # 数据库相关
│   │   ├── schema/          # Drizzle Schema
│   │   ├── data/            # 查询函数
│   ├── lib/                 # 工具库
│   │   ├── utils.ts         # 通用工具函数
│   │   ├── logger.ts        # 日志工具
│   ├── styles/              # 全局样式
│   ├── utils/               # 辅助函数
├── tests/                   # 测试文件
├── public/                  # 静态资源
├── .env.example             # 环境变量示例
├── next.config.js           # Next.js 配置
├── tailwind.config.js       # Tailwind CSS 配置
├── Dockerfile               # Docker 配置
└── docker-compose.yml       # Docker Compose 配置
```

## ⚙️ 配置选项

### 数据库配置

项目使用 PostgreSQL 和 Drizzle ORM。配置数据库连接参数在 `.env.local` 文件中:

```
DATABASE_URL=postgres://user:password@localhost:5432/db_name
```

### 认证配置

认证系统基于 Next-Auth v5。在 `.env.local` 中配置:

```
AUTH_SECRET=your-secret-key
```

### 国际化配置

国际化支持由 next-intl 提供。编辑 `src/lib/i18n-navigation.ts` 更改支持的语言。

## 📦 部署指南

### Vercel 部署

虽然本模板支持 Vercel 部署，但请注意：

- Vercel 在国内访问可能较慢，影响用户体验
- 部署到 Vercel 需要对 Next.js 工程化有深入了解
- 可能需要针对 Vercel 环境进行额外配置和优化

本模板不提供详细的 Vercel 改造教程，如有需要请参考 [Vercel 官方文档](https://vercel.com/docs/frameworks/nextjs)。

### 自托管部署

自托管是本模板的推荐部署方式，特别适合中国用户：

- 开箱即用，无需复杂改造
- 使用 Docker 容器化简化部署流程
- 支持各种云服务商和自有服务器
- 完全控制应用与数据，无需担心国际网络波动

## 🔍 Sentry 集成

项目集成了 Sentry 错误监控，你可以:

1. 使用 Sentry 的云服务
2. [自托管 Sentry](https://develop.sentry.dev/self-hosted/)（推荐中国用户选择）

在 `.env.local` 中配置 Sentry:

```
SENTRY_DSN=your-sentry-dsn
```

## 🤝 贡献

欢迎提交 Pull Request 或创建 Issue 来改进这个模板。

## 📜 许可

[MIT](LICENSE)
