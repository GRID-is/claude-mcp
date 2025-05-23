import Grid from "@grid-is/api";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

import { type LabelSearchInputSchema } from "../../schemas/labelSearchInputSchema.js";

export async function handleLabelSearch({
  query,
}: LabelSearchInputSchema): Promise<CallToolResult> {
  const client = new Grid();
  try {
    const response = await client.beta.searchLabels({ query });
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
          text: `Error searching workbook labels: ${typedError.message}`,
        },
      ],
    };
  }
}
