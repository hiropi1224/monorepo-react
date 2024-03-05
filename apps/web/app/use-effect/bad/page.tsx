import { CodeHighlight } from "@mantine/code-highlight";
import { BadForm } from "../../../features/use-effect/components/form";
import { Title } from "@mantine/core";

export default function BadFormPage(): JSX.Element {
  return (
    <div>
      <Title order={2}>Form Example</Title>
      <BadForm />
      <CodeHighlight code={form} language="tsx" withCopyButton={false} />
    </div>
  );
}

const form = `
export function BadForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
  
    const [fullName, setFullName] = useState("");
    useEffect(() => {
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
