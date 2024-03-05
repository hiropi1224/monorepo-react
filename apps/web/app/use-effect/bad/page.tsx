import { CodeHighlight } from "@mantine/code-highlight";
import { BadForm } from "../../../features/use-effect/components/form";
import { Code, List, ListItem, Stack, Title } from "@mantine/core";

export default function BadFormPage(): JSX.Element {
  return (
    <Stack gap="md">
      <Title order={2}>Form Example</Title>
      <BadForm />
      <CodeHighlight code={form} language="tsx" withCopyButton={false} />
      <Title order={3}>処理の流れ</Title>
      <List type="ordered">
        <ListItem>
          <Code>input</Code>に文字入力で<Code>onChange</Code>発火
        </ListItem>
        <ListItem>
          setter関数(<Code>setFirstName</Code>or<Code>setLastName</Code>)
          により再レンダリングを要求
        </ListItem>
        <ListItem>
          更新したstateでレンダリング実行（この時点では<Code>fullName</Code>
          は更新されていない）
        </ListItem>
        <ListItem>レンダリング完了後、useEffect内の処理を実行</ListItem>
        <ListItem>
          setter関数(<Code>setFullName</Code>)が再レンダリングを要求
        </ListItem>
        <ListItem>更新したstateでレンダリング実行</ListItem>
      </List>
    </Stack>
  );
}

const form = `
export function BadForm() {
  console.count("--- Bad Form render ---");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [fullName, setFullName] = useState("");
  console.log(\`firstName: \${firstName}, lastName: \${lastName}\`);
  console.log(fullName, "fullName");
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
`;
