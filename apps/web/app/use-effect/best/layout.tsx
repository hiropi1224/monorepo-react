import { Flex, Title } from "@mantine/core";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Flex gap={10}>
        <Link href="/use-effect/best">form</Link>
        <Link href="/use-effect/best/toggle">toggle</Link>
        <Link href="/use-effect/best/state-reset">state-reset</Link>
        <Link href="/use-effect/best/deps">deps</Link>
      </Flex>
      <Title>useEffect Best</Title>
      {children}
    </div>
  );
}
