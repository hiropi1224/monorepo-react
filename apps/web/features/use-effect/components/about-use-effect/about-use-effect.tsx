import { Stack } from "@mantine/core";
import { About } from "./about";
import { Caution } from "./caution";
import { Fix } from "./fix";

export function AboutUseEffect() {
  return (
    <Stack>
      <About />
      <Caution />
      <Fix />
    </Stack>
  );
}
