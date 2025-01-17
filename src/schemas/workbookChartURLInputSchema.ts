import { z } from "zod";

const SupportedChartFormats = z.enum(["png", "svg"]);
const SupportedChartTypes = z.enum(["line", "column"]);

export const workbookChartURLInputSchema = z.object({
  // Required path parameter
  id: z.string().describe("Unique workbook id"),

  // Required query parameters
  imageType: SupportedChartFormats.describe("File format to use for the chart image"),
  type: SupportedChartTypes.describe("Type of chart to render"),
  data: z.string().startsWith("=").describe("Chart data range, prefixed with an equals sign"),

  // Optional query parameters
  labels: z
    .string()
    .startsWith("=")
    .optional()
    .describe("Range of cells to use as the chart's x-axis labels, prefixed with an equals sign"),
  title: z
    .string()
    .optional()
    .describe("Cell reference to use as the chart's title. Can also be plain text."),
});
