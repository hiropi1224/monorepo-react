"use client";

import { Input, Stack, Text } from "@mantine/core";
import { useState, useEffect } from "react";

export function BadForm() {
  console.count("--- Bad Form render ---");
  const [firstName, setFirstName] = useState("Taylor");
  const [lastName, setLastName] = useState("Swift");

  // 🔴 Avoid: redundant state and unnecessary Effect
  const [fullName, setFullName] = useState("");
  useEffect(() => {
    console.count("--- setFullName ---");
    setFullName(firstName + " " + lastName);
  }, [firstName, lastName]);
  return (
    <Stack>
      <form>
        <Input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </form>
      <Text>{fullName}</Text>
    </Stack>
  );
}

export function BestForm() {
  console.count("--- Good Form render ---");
  const [firstName, setFirstName] = useState("Taylor");
  const [lastName, setLastName] = useState("Swift");

  const fullName = `${firstName} ${lastName}`;

  return (
    <Stack>
      <form>
        <Input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </form>
      <Text>{fullName}</Text>
    </Stack>
  );
}
