import { CodeHighlight } from "@mantine/code-highlight";
import { BestToggleEffect } from "../../../../features/use-effect/components/toggle-effect";
import { Title } from "@mantine/core";

export default function TogglePage(): JSX.Element {
  return (
    <div>
      <Title order={2}>Toggle Example</Title>
      <BestToggleEffect />

      <CodeHighlight code={form} language="tsx" withCopyButton={false} />
    </div>
  );
}

const form = `
export function BestToggleEffect() {
    const { isOpen, toggle } = useToggle();
  
    return (
      <Stack>
        <Text>{isOpen ? "Open" : "Close"}</Text>
        <Button onClick={toggle}>Toggle</Button>
      </Stack>
    );
  }
  
  const useToggle = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    function toggle() {
      const nextIsOpen = !isOpen;
      setIsOpen(nextIsOpen);
      if (nextIsOpen) {
        alert("open!");
      } else {
        alert("close!");
      }
    }
    return { isOpen, toggle };
  };
`;
