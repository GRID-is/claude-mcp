import { zodToJsonSchema } from "zod-to-json-schema";
import { workbookChartURLInputSchema } from "../../schemas/workbookChartURLInputSchema.js";

export const getWorkbookChartURL = {
  name: "get_workbook_chart_url",
  description: "Get a URL that returns a chart image of workbook data",
  inputSchema: zodToJsonSchema(workbookChartURLInputSchema),
} as const;
