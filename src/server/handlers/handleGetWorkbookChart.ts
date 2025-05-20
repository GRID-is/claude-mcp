import Grid from "@grid-is/api";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

import type { WorkbookChartInputSchema } from "../../schemas/workbookChartInputSchema.js";

export async function handleGetWorkbookChart({
  id,
  chart,
}: WorkbookChartInputSchema): Promise<CallToolResult> {
  const client = new Grid();
  try {
    const response = await client.workbooks.renderChart(id, { chart });
    const data = Buffer.from(await response.arrayBuffer()).toString("base64");
    return {
      content: [
        {
          type: "image",
          data,
          mimeType: "image/png",
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
          text: `Error rendering chart: ${typedError.message}`,
        },
      ],
    };
  }
}
