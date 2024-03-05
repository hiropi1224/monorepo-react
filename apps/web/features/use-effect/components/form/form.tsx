"use client";

import { Input, Stack, Text } from "@mantine/core";
import { useState, useEffect } from "react";

export function BadForm() {
  console.count("--- Bad Form render ---");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // 🔴 Avoid: redundant state and unnecessary Effect
  const [fullName, setFullName] = useState("");
  console.log(`firstName: ${firstName}, lastName: ${lastName}`);
  console.log(fullName, "fullName");
  useEffect(() => {
    console.count("--- setFullName ---");
    setFullName(firstName + " " + lastName);
    return () => console.count("--- cleanup! ---");
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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const fullName = `${firstName} ${lastName}`;
  console.log(`firstName: ${firstName}, lastName: ${lastName}`);
  console.log(fullName, "fullName");

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
