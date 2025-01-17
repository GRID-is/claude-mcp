import { zodToJsonSchema } from "zod-to-json-schema";
import { QueryWorkbookInputSchema } from "../../schemas/queryWorkbookInputSchema.js";

export const queryWorkbook = {
  name: "query_workbook",
  description:
    "Interact with a spreadsheet. Optionally, apply (update) values to cells. Read values from " +
    "cells and formulas.",
  inputSchema: zodToJsonSchema(QueryWorkbookInputSchema),
} as const;
