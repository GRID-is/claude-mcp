import { z } from "zod";

const supportedChartTypes = ["line", "column"] as const;
/** Excel formula string. */
const formula = z.string().startsWith("=").min(2);

/** Raw Zod shape for `get_workbook_chart` request input. Used with `server.tool()`. */
export const workbookChartInputSchema = {
  id: z.string().describe("Unique workbook id"),
  chart: z.object({
    type: z.enum(supportedChartTypes).describe("Type of chart to render"),
    data: formula.describe("Chart data range, prefixed with an equals sign"),
    labels: formula
      .describe("Range of cells to use as the chart's x-axis labels, prefixed with an equals sign")
      .optional()
      .default(""),
    title: z
      .string()
      .nullish()
      .default(null)
      .describe("Cell reference to use as the chart's title. Can also be plain text."),
  }),
};

const workbookChartInputSchemaZodObject = z.object(workbookChartInputSchema);
/**
 * Complete Zod object for `get_workbook_chart` request input. Used as a type for server tool
 * callback functions.
 */
export type WorkbookChartInputSchema = z.infer<typeof workbookChartInputSchemaZodObject>;
