import { z } from "zod";

export const QueryWorkbookInputSchema = z.object({
  workbookId: z.string(),
  read: z.array(z.string()),
  apply: z
    .array(
      z.object({
        target: z.string(),
        value: z.union([z.number(), z.string(), z.boolean(), z.null()]),
      }),
    )
    .optional(),
});
