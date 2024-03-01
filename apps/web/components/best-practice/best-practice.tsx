"use client";

import { Button, Stack, Textarea, Text } from "@mantine/core";
import { ReactNode, useState } from "react";

export function BestPractice() {
  const [userId, setUserId] = useState(1);
  return (
    <Stack>
      <Profile userId={userId} key={userId} />
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
  const [comment, setComment] = useState("");

  return (
    <Stack>
      {children}
      <Text>Current UserID: {userId}</Text>
      <Textarea value={comment} onChange={(e) => setComment(e.target.value)} />
    </Stack>
  );
}
