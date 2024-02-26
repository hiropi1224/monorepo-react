import { NextPageWithLayout } from "../_app";
import { FetchLayout } from "../../components/layout/fetch-layout";
import { NumberInput, Stack, Title, Text, Loader } from "@mantine/core";
import { CodeHighlight } from "@mantine/code-highlight";
import { Suspense, useState } from "react";
import { SuspenseUser } from "../../components/suspense-user/suspense-user";

const exampleCode = `
const { data: user } = useQueryUser(userId);
`;

const UseEffectPage: NextPageWithLayout = () => {
  const [userId, setUserId] = useState(1);

  return (
    <main>
      <Stack>
        <Title>ReactQuery Fetch</Title>
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
        <Suspense fallback={<Loader color="blue" />}>
          <SuspenseUser userId={userId} />
        </Suspense>
      </Stack>
    </main>
  );
};

UseEffectPage.getLayout = (page) => {
  return <FetchLayout>{page}</FetchLayout>;
};

export default UseEffectPage;
