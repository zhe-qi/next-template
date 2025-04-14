// This file is used to migrate the database to the current version
// It is run when the docker container starts
const path = require('node:path');
const dotenv = require('dotenv');
const { drizzle } = require('drizzle-orm/postgres-js');
const { migrate } = require('drizzle-orm/postgres-js/migrator');
const postgres = require('postgres');

const migrationsFolder = process.argv[2] ?? '../drizzle';

// 加载环境变量
dotenv.config({ path: path.join(__dirname, '/../.env') });

if (!process.env.DATABASE_URL) {
  console.error('数据库URL未设置 - 请检查环境变量');
  process.exit(1);
}

// 创建Postgres客户端
const sql = postgres(process.env.DATABASE_URL, { max: 1 });
const db = drizzle(sql);

const migrateDatabase = async () => {
  console.log(`开始数据库迁移... 迁移文件夹: ${migrationsFolder}`);

  try {
    await migrate(db, { migrationsFolder });
    console.log('数据库迁移成功完成！');
  } catch (error) {
    console.error('数据库迁移失败:', error);
    process.exit(1);
  } finally {
    // 关闭数据库连接
    await sql.end();
  }
};

// 执行迁移
migrateDatabase();
