import { ReactNode } from "react";
import { NavBar } from "~/app/(protected)/_components/nav-bar";

interface ProtectedLayoutProps {
  children: ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return (
    <div className="h-full w-full flex flex-col gap-y-10 justify-center items-center bg-gradient-to-r from-blue-800  via-sky-500 to-blue-800">
      <NavBar />
      {children}
    </div>
  );
}
