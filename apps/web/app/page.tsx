import { Text, Title } from "@mantine/core";

export default function Page(): JSX.Element {
  return (
    <main>
      <Title order={1}>This is h1 title</Title>

      <Text
        size="xl"
        fw={900}
        variant="gradient"
        gradient={{ from: "blue", to: "cyan", deg: 90 }}
      >
        Mantine UI
      </Text>
    </main>
  );
}
