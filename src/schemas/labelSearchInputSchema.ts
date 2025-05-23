import { z } from "zod";

/** Raw Zod shape for `search_labels` request input. Used with `server.tool()`. */
export const labelSearchInputSchema = {
  query: z.string().describe("Search query"),
};

const labelSearchInputSchemaZodObject = z.object(labelSearchInputSchema);
/**
 * Complete Zod object for `search_labels` request input. Used as a type for server tool callback
 * functions.
 */
export type LabelSearchInputSchema = z.infer<typeof labelSearchInputSchemaZodObject>;
