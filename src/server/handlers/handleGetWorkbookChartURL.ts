import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

import type { WorkbookChartURLInputSchema } from "../../schemas/workbookChartURLInputSchema.js";
import { fetchJSON } from "../../utils/fetch/fetchJSON.js";

interface chartURLResponse {
  url: string;
}

export async function handleGetWorkbookChartURL(
  args: WorkbookChartURLInputSchema,
): Promise<CallToolResult> {
  try {
    const params = new URLSearchParams({
      data: args.data,
      type: args.type,
      imageType: args.imageType,
    });
    if (args.title) {
      params.append("title", args.title);
    }
    if (args.labels) {
      params.append("labels", args.labels);
    }
    const url = `/v1/workbooks/${args.id}/chart?${params.toString()}`;
    const json = await fetchJSON<chartURLResponse>(url);

    return {
      content: [
        {
          type: "text",
          text: json.url,
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
