import type { Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: encodeURI(env.DATABASE_URL),
  },
  tablesFilter: ["five-dice_*"],
} satisfies Config;
