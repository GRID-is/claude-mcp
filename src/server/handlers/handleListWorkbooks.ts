import Grid from "@grid-is/api";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

export async function handleListWorkbooks(): Promise<CallToolResult> {
  const client = new Grid();
  try {
    const response = await client.workbooks.list();
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
          text: `Error listing workbooks: ${typedError.message}`,
        },
      ],
    };
  }
}
