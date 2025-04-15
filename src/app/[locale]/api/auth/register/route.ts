import db from '@/db';
import { getUserByUsername } from '@/db/data/queries';
import { users } from '@/db/schema';
import { logger } from '@/lib/logger';
import { hash } from '@node-rs/argon2';
import { NextResponse } from 'next/server';
import { z } from 'zod';

// 注册表单验证
const registerSchema = z.object({
  username: z.string().min(3, '用户名至少需要3个字符'),
  password: z.string().min(6, '密码至少需要6个字符'),
});

export async function POST(request: Request) {
  try {
    // 解析请求体
    const body = await request.json();

    // 验证请求数据
    const validationResult = registerSchema.safeParse(body);
    if (!validationResult.success) {
      logger.warn({ errors: validationResult.error.errors }, '注册验证失败');
      return NextResponse.json(
        { message: '输入数据无效', errors: validationResult.error.errors },
        { status: 400 },
      );
    }

    const { username, password } = validationResult.data;

    // 检查用户名是否已存在
    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      logger.info({ username }, '注册失败: 用户名已存在');
      return NextResponse.json(
        { message: '用户名已被使用' },
        { status: 409 },
      );
    }

    // 哈希密码
    const hashedPassword = await hash(password);

    // 创建新用户
    const result = await db.insert(users).values({
      username,
      password: hashedPassword,
      name: username, // 默认设置name为username
      isActive: true,
      isAdmin: false,
    }).returning({ id: users.id });

    // 确保有返回结果
    if (!result || result.length === 0) {
      logger.error('创建用户失败: 没有返回数据');
      throw new Error('创建用户失败，没有返回数据');
    }

    const userId = result[0]?.id;
    if (!userId) {
      logger.error('创建用户失败: 未返回用户ID');
      throw new Error('创建用户成功但未返回用户ID');
    }

    logger.info({ userId, username }, '用户注册成功');
    return NextResponse.json(
      { message: '注册成功', userId },
      { status: 201 },
    );
  } catch (error) {
    logger.error('注册过程发生错误', error);
    return NextResponse.json(
      { message: '注册过程中发生错误' },
      { status: 500 },
    );
  }
}
