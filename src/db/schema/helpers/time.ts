import { formatDate } from '@/utils/helpers';
import { timestamp } from 'drizzle-orm/pg-core';

export const baseTime = {
  createdAt: timestamp({
    mode: 'string',
  }).notNull().default(formatDate(new Date())),
  updatedAt: timestamp({
    mode: 'string',
  }).notNull().default(formatDate(new Date())).$onUpdate(() => formatDate(new Date())),
};
