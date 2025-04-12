# syntax=docker.io/docker/dockerfile:1

FROM node:22-alpine AS base

# 仅在需要时安装依赖
FROM base AS deps
# 查看 https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine 了解为什么可能需要 libc6-compat
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

RUN npm install -g pnpm

# 根据首选的包管理器安装依赖
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# 仅在需要时重新构建源代码
FROM base AS builder
WORKDIR /app

ARG DATABASE_URL

ENV DATABASE_URL=${DATABASE_URL}

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js 收集完全匿名的遥测数据用于一般使用情况
# 了解更多：https://nextjs.org/telemetry
# 如果要在构建期间禁用遥测，取消下面这行的注释
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm install -g pnpm
RUN SKIP_ENV_VALIDATION=1 pnpm run build

# 生产镜像，复制所有文件并运行 next
FROM base AS runner
WORKDIR /app

ARG DATABASE_URL


ENV DATABASE_URL=${DATABASE_URL}

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# 自动利用输出跟踪来减少镜像大小
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# server.js 由 next build 从独立输出创建
# https://nextjs.org/docs/pages/api-reference/config/next-config-js/output
CMD ["node", "server.js"]

