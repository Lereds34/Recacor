import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { checkMarketingSources } from "@/inngest/marketing-source-health";

export const maxDuration = 60;

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [checkMarketingSources],
});
