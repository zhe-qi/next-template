#!/bin/sh

echo "开始执行数据库迁移..."
cd /app/migrate && pnpm db:migrate
migration_exit_code=$?

if [ $migration_exit_code -ne 0 ]; then
  echo "迁移失败，退出代码 $migration_exit_code"

  # 如果环境变量设置为忽略迁移错误，则继续运行
  if [ "$IGNORE_MIGRATION_ERRORS" = "true" ]; then
    echo "IGNORE_MIGRATION_ERRORS=true，忽略迁移错误并继续..."
  else
    echo "退出应用，如需忽略迁移错误并强制启动应用，请设置环境变量 IGNORE_MIGRATION_ERRORS=true"
    exit $migration_exit_code
  fi
fi

echo "迁移完成，正在启动应用服务器..."
cd /app && node server.js
