"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { LoginForm } from "~/components/auth/login-form";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";

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
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
        <DialogContent className="p-0 w-auto bg-transparent border-none">
          <LoginForm />
        </DialogContent>
      </Dialog>
    );
  }

  return <span onClick={onClick}>{children}</span>;
}
