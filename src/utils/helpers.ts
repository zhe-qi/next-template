import { parseISO } from 'date-fns';
import { toZonedTime, format as tzFormat } from 'date-fns-tz';
import { zhCN } from 'date-fns/locale';

/**
 * 格式化日期，默认使用上海时区
 * 请勿用在数据库插入数据上，插入之前确保日期是UTC
 */
export const formatDate = (
  date: Date | string,
  config?: {
    formatString?: string;
    timeZone?: string;
  },
) => {
  const { formatString = 'yyyy-MM-dd HH:mm:ss', timeZone = 'Asia/Shanghai' } = config ?? {};
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  const zonedDate = toZonedTime(parsedDate, timeZone);
  return tzFormat(zonedDate, formatString, { timeZone, locale: zhCN });
};

export const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength)}...`;
};
