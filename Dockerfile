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
ARG NEXT_PUBLIC_APP_URL
ARG SENTRY_AUTH_TOKEN
ARG NEXT_PUBLIC_SENTRY_DSN
ARG AUTH_SECRET

ENV DATABASE_URL=${DATABASE_URL}
ENV NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}
ENV SENTRY_AUTH_TOKEN=${SENTRY_AUTH_TOKEN}
ENV NEXT_PUBLIC_SENTRY_DSN=${NEXT_PUBLIC_SENTRY_DSN}
ENV AUTH_SECRET=${AUTH_SECRET}
ENV SKIP_ENV_VALIDATION=true

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm install -g pnpm
RUN SKIP_ENV_VALIDATION=1 pnpm run build

# 生产镜像，复制所有文件并运行 next
FROM base AS runner
WORKDIR /app

ARG PORT=3000

ARG DATABASE_URL
ARG NEXT_PUBLIC_APP_URL
ARG SENTRY_AUTH_TOKEN
ARG NEXT_PUBLIC_SENTRY_DSN
ARG AUTH_SECRET

ENV DATABASE_URL=${DATABASE_URL}
ENV NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}
ENV SENTRY_AUTH_TOKEN=${SENTRY_AUTH_TOKEN}
ENV NEXT_PUBLIC_SENTRY_DSN=${NEXT_PUBLIC_SENTRY_DSN}
ENV AUTH_SECRET=${AUTH_SECRET}
ENV SKIP_ENV_VALIDATION=true

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN apk add --no-cache wget curl

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Move the drizzle directory to the runtime image
COPY --from=builder /app/drizzle ./drizzle

# 复制运行脚本
COPY --from=builder /app/scripts/run.sh ./scripts/run.sh
RUN chmod +x ./scripts/run.sh

# 安装迁移依赖
COPY --from=builder /app/drizzle/migrate ./migrate
COPY --from=builder /app/tsconfig.json ./migrate/tsconfig.json

# 备份应用的node_modules
RUN mv node_modules _node_modules

# 安装迁移所需的依赖
WORKDIR /app/migrate
RUN npm install -g pnpm
COPY --from=builder /app/drizzle/migrate/package.json ./package.json
RUN pnpm install

# 恢复应用的node_modules
WORKDIR /app
RUN mv _node_modules node_modules

# 设置所有文件的权限
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE $PORT
ENV PORT=${PORT}
ENV HOSTNAME="0.0.0.0"

HEALTHCHECK --interval=10s --timeout=5s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:${PORT} || exit 1

ENTRYPOINT ["sh", "./scripts/run.sh"]
