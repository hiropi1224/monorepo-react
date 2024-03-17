"use client";

import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";

type LoginButtonProps = {
  mode?: "modal" | "redirect";
  asChild?: boolean;
};

export function LoginButton({ mode = "redirect", asChild }: LoginButtonProps) {
  const router = useRouter();
  const onClick = () => {
    router.push("/auth/login");
  };

  if (mode === "modal") {
    return <span>Implement mode</span>;
  }

  return (
    <Button variant="secondary" size="lg" onClick={onClick}>
      Sign in
    </Button>
  );
}
