import { formatDate } from '@/utils/helpers';
import { timestamp } from 'drizzle-orm/pg-core';

export const baseTime = {
  createdAt: timestamp('created_at', {
    mode: 'string',
  }).notNull().default(formatDate(new Date())),
  updatedAt: timestamp('updated_at', {
    mode: 'string',
  }).notNull().default(formatDate(new Date())).$onUpdate(() => formatDate(new Date())),
};
