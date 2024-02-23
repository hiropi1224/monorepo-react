import type { Config } from "tailwindcss";

// contentは各ワークスペースで設定するため、ここでは除外する
export default {
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Omit<Config, "content">;
