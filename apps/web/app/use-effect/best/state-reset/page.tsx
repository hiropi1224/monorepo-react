import { CodeHighlight } from "@mantine/code-highlight";
import { Title } from "@mantine/core";
import { StateResetWithKey } from "../../../../features/use-effect/components/state-reset";

export default function StateResetWithKeyPage(): JSX.Element {
  return (
    <div>
      <Title order={2}>stateResetWithKey Example</Title>

      <StateResetWithKey />
      <CodeHighlight code={stateReset} language="tsx" withCopyButton={false} />
    </div>
  );
}

const stateReset = `
export function StateResetWithKey() {
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
`;
