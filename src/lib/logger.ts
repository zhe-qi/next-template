import pino from 'pino';
import pretty from 'pino-pretty';
import 'server-only';

// 你也可以同时接入阿里云的日志服务
const stream = pretty({
  colorize: true,
});

export const logger = pino({ base: undefined }, stream);
