import { getUserByUsername } from '@/db/queries';
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
        try {
          const parsedCredentials = loginSchema.safeParse(credentials);
          if (parsedCredentials.success) {
            const { username, password } = parsedCredentials.data;
            const user = await getUserByUsername(username);
            if (!user || !user?.password) {
              return null;
            }
            const passwordsMatch = await verify(
              user.password,
              password,
            );
            if (passwordsMatch) {
              return user;
            }
          }
          return null;
        } catch {
          return null;
        }
      },
    }),
  ],
});
