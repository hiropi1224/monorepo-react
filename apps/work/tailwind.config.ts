// tailwind config is required for editor support

import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";

const config = {
  content: ["./pages/**/*.tsx", "./components/**/*.tsx"],
  presets: [sharedConfig],
} satisfies Pick<Config, "content" | "presets">;

export default config;
