import { Title } from "@mantine/core";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>;
}
