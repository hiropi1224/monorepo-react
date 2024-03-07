import { Flex, Title } from "@mantine/core";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Flex gap={10}>
        <Link href="/use-effect/bad">form</Link>
        <Link href="/use-effect/bad/toggle">toggle</Link>
        <Link href="/use-effect/bad/state-reset">state-reset</Link>
        <Link href="/use-effect/bad/deps">deps</Link>
      </Flex>
      <Title>useEffect Bad</Title>
      {children}
    </div>
  );
}
