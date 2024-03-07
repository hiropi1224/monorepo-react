import { CodeHighlight } from "@mantine/code-highlight";
import { Title } from "@mantine/core";
import { DepsCounter } from "../../../../features/use-effect/components/counter";

export default function DepsPage(): JSX.Element {
  return (
    <div>
      <Title order={2}>Deps Example</Title>
      <DepsCounter />
      <CodeHighlight code={deps} language="tsx" withCopyButton={false} />
    </div>
  );
}

const deps = `
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return <h1>{count}</h1>;
}
`;
