import { Stack, Title } from "@mantine/core";
import { AboutUseEffect } from "../../features/use-effect/components/about-use-effect";

export default function UseEffectPage(): JSX.Element {
  return (
    <Stack>
      <Title order={1}>About useEffect</Title>
      <AboutUseEffect />
    </Stack>
  );
}
