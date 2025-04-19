import { getUserByUsername } from '@/db/data/queries';
import { verify } from '@node-rs/argon2';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { authConfig } from './auth.config';

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        username: { label: 'username', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials): Promise<any> {
        let user = null;

        // 1. 验证输入
        const parsedCredentials = loginSchema.safeParse(credentials);
        if (!parsedCredentials.success) {
          return null;
        }

        // 2. 获取用户
        const { username, password } = parsedCredentials.data;
        user = await getUserByUsername(username);
        if (!user || !user?.password) {
          return null;
        }

        // 3. 验证密码
        const passwordsMatch = await verify(
          user.password,
          password,
        );
        if (!passwordsMatch) {
          return null;
        }

        return user;
      },
    }),
  ],
});
