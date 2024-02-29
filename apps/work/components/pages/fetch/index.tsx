import { UserCardList } from "../../../features/user/components/user-card-list";

export function FetchPage(): JSX.Element {
  return (
    <main className="flex flex-col w-screen h-screen gap-4 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48 bg-red-500 bg-gradient-to-b from-blue-100 to-red-100">
      <h1 className="font-bold text-2xl text-center">fetch page</h1>
      <h2 className="font-semibold">User List</h2>
      <UserCardList />
    </main>
  );
}
