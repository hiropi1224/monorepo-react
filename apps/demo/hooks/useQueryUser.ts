import {
  UseQueryResult,
  UseSuspenseQueryResult,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { User } from "../types";

export const useQueryUser = (userId: number): UseQueryResult<User, Error> => {
  return useQuery<User, Error>({
    queryKey: ["user", userId],
    queryFn: () => fetchUser(userId),
    staleTime: 0,
    gcTime: 0,
  });
};

export const useSuspenseQueryUser = (
  userId: number
): UseSuspenseQueryResult<User, Error> => {
  return useSuspenseQuery<User, Error>({
    queryKey: ["user", userId],
    queryFn: () => fetchUser(userId),
    staleTime: Infinity,
  });
};

const fetchUser = async (userId: number): Promise<User> => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  const data = res.json();
  return data;
};
