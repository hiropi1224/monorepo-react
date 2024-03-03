import { Stack } from "@mantine/core";
import { About } from "./about";
import { Caution } from "./caution";

export function AboutUseEffect() {
  return (
    <Stack>
      <About />
      <Caution />
    </Stack>
  );
}
