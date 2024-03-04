import { CodeHighlight } from "@mantine/code-highlight";
import { BadToggleEffect } from "../../../../features/use-effect/components/toggle-effect/toggle-effect";
import { Title } from "@mantine/core";

export default function FormPage(): JSX.Element {
  return (
    <div>
      <Title order={2}>Toggle Example</Title>
      <BadToggleEffect />
      <CodeHighlight code={form} language="tsx" withCopyButton={false} />
    </div>
  );
}

const form = `
export function BadToggleEffect() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      alert("open!");
    } else {
      alert("close!");
    }
  }, [isOpen]);
  return (
    <Stack>
      <Text>{isOpen ? "Open" : "Close"}</Text>
      <Button onClick={() => setIsOpen(!isOpen)}>Toggle</Button>
    </Stack>
  );
}
`;
