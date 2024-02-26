import { useSuspenseQueryUser } from "../../hooks/useQueryUser";
import { UserCard } from "../user-card";

export function SuspenseUser({ userId }: { userId: number }) {
  const { data: user } = useSuspenseQueryUser(userId);

  return user ? (
    <UserCard
      name={user.name}
      username={user.username}
      id={user.id}
      company={user.company}
    />
  ) : null;
}
