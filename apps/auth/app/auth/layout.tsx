import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-r from-blue-800  via-sky-500 to-blue-800">
      {children}
    </div>
  );
}
