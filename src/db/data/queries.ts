import db from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * 通过用户名获取用户
 */
export async function getUserByUsername(username: string) {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.username, username),
    });
    return user;
  } catch (error) {
    console.error('Error getting user by username:', error);
    return null;
  }
}
