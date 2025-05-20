import { z } from "zod";

const supportedChartTypes = ["line", "column"] as const;

/** Raw Zod shape for `get_workbook_chart` request input. Used with `server.tool()`. */
export const workbookChartInputSchema = {
  id: z.string().describe("Unique workbook id"),
  type: z.enum(supportedChartTypes).describe("Type of chart to render"),
  data: z
    .string()
    // .startsWith("=")
    .describe("Chart data range, prefixed with an equals sign"),
  labels: z
    .string()
    // .startsWith("=")
    .optional()
    .describe("Range of cells to use as the chart's x-axis labels, prefixed with an equals sign")
    .default(""),
  title: z
    .string()
    .optional()
    .describe("Cell reference to use as the chart's title. Can also be plain text.")
    .default(""),
};

const workbookChartInputSchemaZodObject = z.object(workbookChartInputSchema);
/**
 * Complete Zod object for `get_workbook_chart` request input. Used as a type for server tool
 * callback functions.
 */
export type WorkbookChartInputSchema = z.infer<typeof workbookChartInputSchemaZodObject>;
