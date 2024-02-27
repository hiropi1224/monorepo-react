import { Flex } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

  return (
    <Flex gap="xl" align="center" justify="center">
      <Link href="/">Default Layout Demo</Link>
      <Link href="/nav">Nav Layout Demo</Link>
      {pathname.includes("state") && (
        <>
          <Link href="/state/zustand">Zustand Demo</Link>
          <Link href="/state/context">Context Demo</Link>
        </>
      )}
      {pathname.includes("fetch") && (
        <>
          <Link href="/fetch/reactquery">React Query Demo</Link>
          <Link href="/fetch/useeffect">useEffect Demo</Link>
        </>
      )}
    </Flex>
  );
}
