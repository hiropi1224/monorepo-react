import { Card, Text, Avatar, Group } from "@mantine/core";
import { Company } from "../../types";

export function UserCard({
  name,
  username,
  id,
  company,
}: {
  name: string;
  username: string;
  id: number;
  company: Company;
}) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Group p="md">
          <Avatar color="cyan" radius="xl">
            MK
          </Avatar>
          <Text fw={500}>{name}</Text>
        </Group>
      </Card.Section>

      <Text fw={500}>{`${id}: ${username}`}</Text>

      <Text size="sm" c="dimmed">
        {`company: ${company.name}`}
      </Text>
      <Text size="sm" c="dimmed">
        {`catchPhrase: ${company.catchPhrase}`}
      </Text>
    </Card>
  );
}
