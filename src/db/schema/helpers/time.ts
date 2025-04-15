import { timestamp } from 'drizzle-orm/pg-core';

/** 数据库使用以UTC时间存储，处理时或者前端获取时需要用到 Asia/Shanghai 时区的，自行用 date-fns-tz 转换 */
export const baseTime = {
  createdAt: timestamp('created_at', {
    withTimezone: true,
  }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', {
    withTimezone: true,
  }).notNull().defaultNow().$onUpdate(() => new Date()),
};
