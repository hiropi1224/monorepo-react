import { Stack, Title } from "@mantine/core";
import { AboutUseState } from "../../features/use-state/components/about-use-state/about-use-state";

export default function UseStatePage(): JSX.Element {
  return (
    <Stack>
      <Title order={1}>About useState</Title>
      <AboutUseState />
    </Stack>
  );
}
