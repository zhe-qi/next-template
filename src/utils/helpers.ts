import { toZonedTime, format as tzFormat } from 'date-fns-tz';

export const formatDate = (
  date: Date | string,
  config: { formatString?: string; timeZone?: string } = {},
) => {
  const { formatString = 'yyyy-MM-dd HH:mm:ss', timeZone = 'Asia/Shanghai' } = config;
  return tzFormat(toZonedTime(date, timeZone), formatString);
};

export const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength)}...`;
};
