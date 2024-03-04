"use client";
import { Button, Stack, Text } from "@mantine/core";
import { useEffect, useState } from "react";

export function BadToggleEffect() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      alert("open!");
    } else {
      alert("close!");
    }
  }, [isOpen]);
  return (
    <Stack>
      <Text>{isOpen ? "Open" : "Close"}</Text>
      <Button onClick={() => setIsOpen(!isOpen)}>Toggle</Button>
    </Stack>
  );
}

export function BestToggleEffect() {
  const { isOpen, toggle } = useToggle();

  return (
    <Stack>
      <Text>{isOpen ? "Open" : "Close"}</Text>
      <Button onClick={toggle}>Toggle</Button>
    </Stack>
  );
}

const useToggle = () => {
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    const nextIsOpen = !isOpen;
    setIsOpen(nextIsOpen);
    if (nextIsOpen) {
      alert("open!");
    } else {
      alert("close!");
    }
  }
  return { isOpen, toggle };
};
