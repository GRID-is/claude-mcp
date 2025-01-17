import { zodToJsonSchema } from "zod-to-json-schema";
import { workbookChartInputSchema } from "../../schemas/workbookChartInputSchema.js";

export const getWorkbookChart = {
  name: "get_workbook_chart",
  description: "Render a chart using workbook data",
  inputSchema: zodToJsonSchema(workbookChartInputSchema),
  examples: [
    {
      input: {
        id: "abc123",
        type: "line",
        data: "=C2:C142",
        labels: "=B2:B142",
        title: "=A1",
      },
    },
  ],
} as const;
