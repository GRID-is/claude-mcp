import { z } from "zod";

/** Raw Zod shape for `query_workbook` request input. Used with `server.tool()`. */
export const queryWorkbookInputSchema = {
  workbookId: z.string(),
  read: z.array(z.string()),
  apply: z
    .array(
      z.object({
        target: z.string(),
        value: z.union([z.number(), z.string(), z.boolean(), z.null()]),
      }),
    )
    .nullish()
    .default(null),
};

const queryWorkbookInputSchemaZodObject = z.object(queryWorkbookInputSchema);
/**
 * Complete Zod object for `query_workbook` request input. Used as a type for server tool callback
 * functions.
 */
export type QueryWorkbookInputSchema = z.infer<typeof queryWorkbookInputSchemaZodObject>;
