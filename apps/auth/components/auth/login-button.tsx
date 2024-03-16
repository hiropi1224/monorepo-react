"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";

type LoginButtonProps = {
  children: ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
};

export function LoginButton({
  children,
  mode = "redirect",
  asChild,
}: LoginButtonProps) {
  const router = useRouter();
  const onClick = () => {
    router.push("/auth/login");
  };

  if (mode === "modal") {
    return <span>Implement mode</span>;
  }

  return <span onClick={onClick}>{children}</span>;
}
