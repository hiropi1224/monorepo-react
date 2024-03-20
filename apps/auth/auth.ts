import NextAuth from "next-auth";
import authConfig from "~/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "~/lib/db";
import { UserRole } from "@prisma/client";
import { getUserById } from "~/data/user";
import { getTwoFactorConfirmationByUserId } from "~/data/two-factor-confirmation";

declare module "next-auth" {
  interface User {
    role: UserRole;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  // 同じメールアドレスを使ったOAuth時のエラー画面を指定。指定がなければAuth.jsのデフォルト画面が表示される
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  // OAuthログイン時にemailVerifiedを設定
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // OAuthの場合はemail verificationは不要
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id ?? "");

      // ユーザー情報なし or メール認証未完の場合はログインをブロック
      if (!existingUser?.emailVerified) return false;

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );

        if (!twoFactorConfirmation) return false;

        // Delete two factor confirmation for next sign in
        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
