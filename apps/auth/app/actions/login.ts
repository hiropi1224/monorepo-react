"use server";

import { AuthError } from "next-auth";
import { z } from "zod";
import { signIn } from "~/auth";
import { getUserByEmail } from "~/data/user";
import { sendVerificationEmail } from "~/lib/mail";
import { generateVerificationToken } from "~/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "~/routes";
import { LoginSchema } from "~/schemas";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedField = LoginSchema.safeParse(values);
  if (!validatedField.success) {
    return { error: "Invalid fields" };
  }

  const { email, password } = validatedField.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: "Confirmation email sent!" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    // TODO
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };

        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
};