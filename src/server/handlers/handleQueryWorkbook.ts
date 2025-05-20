import Grid from "@grid-is/api";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

import { type QueryWorkbookInputSchema } from "../../schemas/queryWorkbookInputSchema.js";

export async function handleQueryWorkbook({
  workbookId,
  read,
  apply,
}: QueryWorkbookInputSchema): Promise<CallToolResult> {
  const client = new Grid();
  try {
    const response = await client.workbooks.query(workbookId, { read, apply });
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(response, null, 2),
        },
      ],
    };
  } catch (error) {
    const typedError = error as Error;
    return {
      isError: true,
      content: [
        {
          type: "text",
          text: `Error querying workbook: ${typedError.message}`,
        },
      ],
    };
  }
}
