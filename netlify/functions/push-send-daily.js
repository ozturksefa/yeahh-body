// Weekday push sender — runs at 07:00 Istanbul (04:00 UTC), Mon–Fri.
// The shared pipeline lives in ../lib/pushDaily.js; this file's only
// job is to declare the cron and invoke the sweep in "weekday" mode.
//
// Paired with push-send-weekend.js (Sat–Sun at 09:00 Istanbul). Two
// schedules mean we can ping the user earlier on workdays and let
// Cumartesi/Pazar start slower, without threading a time-of-day
// mapping through the message logic.

import { runDailyPush } from "../lib/pushDaily.js";

export default async () => runDailyPush({ mode: "weekday" });

export const config = {
  // 07:00 Istanbul (UTC+3) == 04:00 UTC, weekdays only
  schedule: "0 4 * * 1-5",
  includedFiles: ["netlify/lib/pushDaily.js"],
};
