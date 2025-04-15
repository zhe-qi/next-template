import { formatDate, truncateText } from './helpers';

describe('helpers', () => {
  describe('formatDate 函数', () => {
    it('应该正确格式化日期字符串', () => {
      const date = '2023-12-25T10:30:00Z';

      // 使用正则表达式匹配格式而不是具体时间，因为时区会影响结果
      expect(formatDate(date)).toMatch(/2023-12-25 \d{2}:\d{2}:\d{2}/);
    });

    it('应该使用自定义格式字符串', () => {
      const date = '2023-12-25T10:30:00Z';

      expect(formatDate(date, { formatString: 'yyyy年MM月dd日' })).toBe('2023年12月25日');
    });

    it('应该根据指定时区正确格式化UTC时间', () => {
      const date = '2023-12-25T10:30:00Z';

      // 明确指定UTC时区，确保输出的是10:30
      expect(formatDate(date, { timeZone: 'UTC' })).toBe('2023-12-25 10:30:00');

      // 明确指定上海时区，确保输出的是18:30（UTC+8）
      expect(formatDate(date, { timeZone: 'Asia/Shanghai' })).toBe('2023-12-25 18:30:00');
    });
  });

  describe('truncateText 函数', () => {
    it('当文本长度小于最大长度时不应截断', () => {
      const text = '你好世界';

      expect(truncateText(text, 5)).toBe('你好世界');
    });

    it('当文本长度大于最大长度时应截断并添加省略号', () => {
      const text = '这是一段很长的文本';

      expect(truncateText(text, 4)).toBe('这是一段...');
    });
  });
});
