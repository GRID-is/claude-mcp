import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

import { type QueryWorkbookInputSchema } from "../../schemas/queryWorkbookInputSchema.js";
import { fetchJSON } from "../../utils/fetch/fetchJSON.js";

export async function handleQueryWorkbook({
  workbookId,
  read,
  apply,
}: QueryWorkbookInputSchema): Promise<CallToolResult> {
  try {
    const response = await fetchJSON(`/v1/workbooks/${workbookId}/query`, {
      method: "POST",
      body: JSON.stringify({
        read,
        apply,
        options: {
          structure: "table",
          values: "formatted",
        },
      }),
    });

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
