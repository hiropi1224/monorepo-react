import { Poppins } from "next/font/google";
import { LoginButton } from "~/components/auth/login-button";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: "600",
});

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-gradient-to-r from-blue-800  via-sky-500 to-blue-800">
      <div className="space-y-6 text-center">
        <h1 className={cn("text-6xl font-semibold text-white", font.className)}>
          Auth
        </h1>
        <p className="text-white text-lg">A simple authentication service</p>
        <div>
          <LoginButton>
            <Button variant="secondary" size="lg">
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}