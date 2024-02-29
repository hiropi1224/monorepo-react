import { z } from "zod";

export const zGeo = z.object({
  lat: z.string(),
  lng: z.string(),
});

export const zAddress = z.object({
  street: z.string(),
  suite: z.string(),
  city: z.string(),
  zipcode: z.string(),
  geo: zGeo,
});

export const zCompany = z.object({
  name: z.string(),
  catchPhrase: z.string(),
  bs: z.string(),
});

export const zUser = z.object({
  id: z.number().int(),
  name: z.string(),
  username: z.string(),
  email: z.string(),
  address: zAddress,
  phone: z.string(),
  website: z.string(),
  company: zCompany,
});

export const zUsers = z.array(zUser);

export type Geo = z.infer<typeof zGeo>;
export type Address = z.infer<typeof zAddress>;
export type Company = z.infer<typeof zCompany>;
export type User = z.infer<typeof zUser>;
export type Users = z.infer<typeof zUsers>;
