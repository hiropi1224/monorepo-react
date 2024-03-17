"use server";

import { AuthError } from "next-auth";
import { z } from "zod";
import { signIn } from "~/auth";
import { DEFAULT_LOGIN_REDIRECT } from "~/routes";
import { LoginSchema } from "~/schemas";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedField = LoginSchema.safeParse(values);
  if (!validatedField.success) {
    return { error: "Invalid fields" };
  }

  const { email, password } = validatedField.data;
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
