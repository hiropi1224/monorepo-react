"use client";
import { Button, Stack, Textarea, Text } from "@mantine/core";
import { ReactNode, useEffect, useState } from "react";

export function StateResetWithUseEffect() {
  console.count("--- render BadPractice ---");
  const [user, setUserId] = useState(1);
  return (
    <Stack>
      <BadProfile userId={user} />
      <Button onClick={() => setUserId((prev) => prev + 1)}>NextUser</Button>
      <Button onClick={() => setUserId((prev) => prev - 1)}>PrevUser</Button>
    </Stack>
  );
}

function BadProfile({
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

export function StateResetWithKey() {
  console.count("--- render BestPractice ---");
  const [userId, setUserId] = useState(1);
  return (
    <Stack key={userId}>
      <Profile userId={userId} key={userId} />
      <Button onClick={() => setUserId((prev) => prev + 1)}>NextUser</Button>
      <Button onClick={() => setUserId((prev) => prev - 1)}>PrevUser</Button>
    </Stack>
  );
}

const Profile = function Profile({
  userId,
  children,
}: {
  userId: number;
  children?: ReactNode;
}) {
  console.count("--- render Profile ---");
  const [comment, setComment] = useState("");

  return (
    <Stack>
      {children}
      <Text>Current UserID: {userId}</Text>
      <Textarea value={comment} onChange={(e) => setComment(e.target.value)} />
    </Stack>
  );
};
