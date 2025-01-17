import { workbookChartURLInputSchema } from "../../schemas/workbookChartURLInputSchema.js";
import { fetchJSON } from "../../utils/fetch/fetchJSON.js";

interface chartURLResponse {
  url: string;
}

export async function handleGetWorkbookChartURL(args: Record<string, unknown> | undefined) {
  const validated = workbookChartURLInputSchema.parse(args);

  try {
    const params = new URLSearchParams({
      data: validated.data,
      type: validated.type,
    });
    if (validated.title) {
      params.append("title", validated.title);
    }
    if (validated.labels) {
      params.append("labels", validated.labels);
    }
    const url = `/v1/workbooks/${validated.id}/chart?${params.toString()}`;
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
