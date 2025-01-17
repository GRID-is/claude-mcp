import { workbookChartInputSchema } from "../../schemas/workbookChartInputSchema.js";
import { fetchPNG } from "../../utils/fetch/fetchPNG.js";

export async function handleGetWorkbookChart(args: Record<string, unknown> | undefined) {
  const validated = workbookChartInputSchema.parse(args);

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
    const url = `/v1/workbooks/${validated.id}/chart.png?${params.toString()}`;
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
