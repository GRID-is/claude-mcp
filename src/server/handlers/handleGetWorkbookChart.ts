import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

import type { WorkbookChartInputSchema } from "../../schemas/workbookChartInputSchema.js";
import { fetchPNG } from "../../utils/fetch/fetchPNG.js";

export async function handleGetWorkbookChart(
  args: WorkbookChartInputSchema,
): Promise<CallToolResult> {
  try {
    const params = new URLSearchParams({
      data: args.data,
      type: args.type,
    });
    if (args.title) {
      params.append("title", args.title);
    }
    if (args.labels) {
      params.append("labels", args.labels);
    }
    const url = `/v1/workbooks/${args.id}/chart.png?${params.toString()}`;
    const base64Image = await fetchPNG(url);

    return {
      content: [
        {
          type: "image",
          data: base64Image,
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
