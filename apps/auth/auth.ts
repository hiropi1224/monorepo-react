import NextAuth from "next-auth";
import authConfig from "~/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "~/lib/db";
import { UserRole } from "@prisma/client";
import { getUserById } from "~/data/user";
import { getTwoFactorConfirmationByUserId } from "~/data/two-factor-confirmation";
import { getAccountByUserId } from "~/data/account";

declare module "next-auth" {
  interface User {
    role: UserRole;
    isTwoFactorEnabled: boolean;
    isOAuth: boolean;
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

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.isOAuth = token.isOAuth as boolean;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
