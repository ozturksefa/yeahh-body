// Weekend push sender — runs at 09:00 Istanbul (06:00 UTC), Sat + Sun.
// Later than the weekday sender so the morning is less rushed on
// off-work days. Shared pipeline in ../lib/pushDaily.js.

import { runDailyPush } from "../lib/pushDaily.js";

export default async () => runDailyPush({ mode: "weekend" });

export const config = {
  // 09:00 Istanbul (UTC+3) == 06:00 UTC, Saturday + Sunday
  schedule: "0 6 * * 6,0",
  includedFiles: ["netlify/lib/pushDaily.js"],
};
