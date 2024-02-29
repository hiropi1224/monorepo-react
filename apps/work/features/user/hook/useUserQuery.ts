import { useQuery } from "@tanstack/react-query";
import { Users, zUsers } from "../type";

export const useUserQuery = () => {
  return useQuery<Users, Error>({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      const users = zUsers.parse(data);

      return users;
    },
    staleTime: 0,
    cacheTime: 50000,
  });
};
