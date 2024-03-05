import { CodeHighlight } from "@mantine/code-highlight";
import { Title } from "@mantine/core";
import { StateResetWithUseEffect } from "../../../../features/use-effect/components/state-reset";

export default function StateResetPage(): JSX.Element {
  return (
    <div>
      <Title order={2}>state Example</Title>

      <StateResetWithUseEffect />
      <CodeHighlight code={form} language="tsx" withCopyButton={false} />
    </div>
  );
}

const form = `
export function StateResetWithUseEffect() {
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
`;
