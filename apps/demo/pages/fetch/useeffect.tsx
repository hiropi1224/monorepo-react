import { NextPageWithLayout } from "../_app";
import { FetchLayout } from "../../components/layout/fetch-layout";
import { NumberInput, Stack, Text, Title } from "@mantine/core";
import { CodeHighlight } from "@mantine/code-highlight";
import { useEffect, useState } from "react";
import { User } from "../../types";
import { UserCard } from "../../components/user-card";

const exampleCode = `
useEffect(() => {
  const abortController = new AbortController();

  fetch('https://jsonplaceholder.typicode.com/users/:userId', {
    signal: abortController.signal,
  })
    .then((res) => res.json())
    .then((user) => setUser(user))
    .catch(reportError);

  return () => {
    abortController.abort();
  };
}, [userId]);
`;

const UseEffectPage: NextPageWithLayout = () => {
  const [userId, setUserId] = useState(1);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((user) => setUser(user))
      .catch(reportError);

    return () => {
      abortController.abort();
    };
  }, [userId]);

  return (
    <main>
      <Stack>
        <Title>useEffect Fetch</Title>
        <CodeHighlight code={exampleCode} language="tsx" />
        <Text>{`userId: ${userId}`}</Text>
        <NumberInput
          label="User ID"
          description="select userId"
          placeholder="userId"
          min={1}
          max={10}
          onChange={(value) => setUserId(Number(value))}
        />
        {user && (
          <UserCard
            name={user.name}
            username={user.username}
            id={user.id}
            company={user.company}
          />
        )}
      </Stack>
    </main>
  );
};

UseEffectPage.getLayout = (page) => {
  return <FetchLayout>{page}</FetchLayout>;
};

export default UseEffectPage;
