import { NextPageWithLayout } from "../_app";
import { FetchLayout } from "../../components/layout/fetch-layout";
import { NumberInput, Stack, Text, Title } from "@mantine/core";
import { CodeHighlight } from "@mantine/code-highlight";
import { useEffect, useState } from "react";
import { User } from "../../types";

const exampleCode = `
useEffect(() => {
    let ignore = false;
    const abortController = new AbortController();
    if (!ignore) {
      fetch("https://jsonplaceholder.typicode.com/users/:userId", {
      signal: abortController.signal
      })
      .then(res => res.json())
      .then(user => setUser(user))
      .catch(reportError);
    }
    return () => {
      ignore = true;
      abortController.abort();
    };
  }, [userId]);
`;

const UseEffectPage: NextPageWithLayout = () => {
  const [userId, setUserId] = useState(1);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let ignore = false;
    const abortController = new AbortController();

    if (!ignore) {
      fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
        signal: abortController.signal,
      })
        .then((res) => res.json())
        .then((user) => setUser(user))
        .catch(reportError);
    }

    return () => {
      ignore = true;
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
          <Stack>
            <Text>{`id: ${user.id}`}</Text>
            <Text>{`name: ${user.name}`}</Text>
            <Text>{`username: ${user.username}`}</Text>
            <Text>{`email: ${user.email}`}</Text>
          </Stack>
        )}
      </Stack>
    </main>
  );
};

UseEffectPage.getLayout = (page) => {
  return <FetchLayout>{page}</FetchLayout>;
};

export default UseEffectPage;
