"use client";

import { Button, Stack, Textarea, Text } from "@mantine/core";
import { ReactNode, useEffect, useState } from "react";

export function BadPractice() {
  console.count("--- render BadPractice ---");
  const [user, setUserId] = useState(1);
  return (
    <Stack>
      <Profile userId={user} />
      <Button onClick={() => setUserId((prev) => prev + 1)}>NextUser</Button>
      <Button onClick={() => setUserId((prev) => prev - 1)}>PrevUser</Button>
    </Stack>
  );
}

function Profile({
  userId,
  children,
}: {
  userId: number;
  children?: ReactNode;
}) {
  console.count("--- render Profile ---");
  const [comment, setComment] = useState("");

  useEffect(() => {
    setComment("");
  }, [userId]);

  return (
    <Stack>
      {children}
      <Text>Current UserID: {userId}</Text>
      <Textarea value={comment} onChange={(e) => setComment(e.target.value)} />
    </Stack>
  );
}
