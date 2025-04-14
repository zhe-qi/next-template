import type { User } from '@/db';
import type { DefaultSession, NextAuthConfig } from 'next-auth';
import db from '@/db';
import { DrizzleAdapter } from '@auth/drizzle-adapter';

declare module 'next-auth' {
  // eslint-disable-next-line ts/consistent-type-definitions
  interface Session extends DefaultSession {
    user: {
      userId: string;
      isActive: boolean;
      role: 'admin' | 'user';
    } & DefaultSession['user'];
  }
}

export const authConfig = {
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
    error: '/auth/error',
    newUser: '/auth/register',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // 这里可以验证邮箱注册或者其他的什么
      console.log('signIn', user, account, profile);
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        const authUser = user as User;
        token.userId = authUser.id;
        token.isActive = authUser.isActive;
        token.role = authUser.isAdmin ? 'admin' : 'user';
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.userId = token.userId as string;
        session.user.isActive = token.isActive as boolean;
        session.user.role = token.role as 'admin' | 'user';
      }
      return session;
    },
  },
  adapter: DrizzleAdapter(db),
  providers: [],
} satisfies NextAuthConfig;
