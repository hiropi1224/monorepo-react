import { useUserQuery } from "../../hook/useUserQuery";

export function UserCardList(): JSX.Element {
  const { data: users, status } = useUserQuery();
  if (status === "loading") return <>...loading</>;

  return users ? (
    <ul className="grid grid-cols-2 gap-4">
      {users.map(({ id, name, company }) => (
        <li className="grid grid-rows-subgrid" key={id}>
          <UserCard name={name} corp={company.name} />
        </li>
      ))}
    </ul>
  ) : (
    <div>
      <p>ユーザー情報はありません</p>
    </div>
  );
}

function UserCard({ name, corp }: { name: string; corp: string }): JSX.Element {
  return (
    <div className="flex flex-row bg-gray-50 gap-4 p-4 rounded-md">
      <div className="size-12 rounded-full bg-gray-200" />
      <div className="flex flex-col flex-1 gap-2">
        <p className="font-bold text-lg">{name}</p>
        <p className=" text-gray-700">{corp}</p>
      </div>
    </div>
  );
}
