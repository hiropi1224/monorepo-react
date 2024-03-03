"use client";
import { Button, Group, Stack, Text } from "@mantine/core";
import { useState } from "react";

export function AboutUseState() {
  const [count, setCount] = useState(0);

  function handleAlertClick() {
    setTimeout(() => {
      alert("You clicked on: " + count);
    }, 3000);
  }
  return (
    <Stack>
      <Text>You clicked {count} times</Text>
      <Group>
        <Button onClick={() => setCount(count + 1)}>Click</Button>
        <Button onClick={handleAlertClick}>Show Alert</Button>
      </Group>
    </Stack>
  );
}
