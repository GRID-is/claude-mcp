import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { queryWorkbookInputSchema } from "../schemas/queryWorkbookInputSchema.js";
import { workbookChartInputSchema } from "../schemas/workbookChartInputSchema.js";
import {
  handleGetWorkbookChart,
  handleListWorkbooks,
  handleQueryWorkbook,
} from "../server/handlers/index.js";

/**
 * MCP server for the GRID API.
 *
 * <https://modelcontextprotocol.io/docs/concepts/architecture>
 */
export const gridServer = new McpServer({
  name: "grid-server",
  version: "1.0.0",
});

// Add tool to query data within an Excel workbook.
gridServer.tool(
  "list_workbooks",
  "List the Excel workbooks and spreadsheets linked your GRID account",
  { title: "List workbooks" },
  handleListWorkbooks,
);

// Add tool to query data within an Excel workbook.
gridServer.tool(
  "query_workbook",
  "Interact with a spreadsheet. Optionally, apply (update) values to cells. Read values from cells and formulas.",
  queryWorkbookInputSchema,
  { title: "Query spreadsheet cells" },
  handleQueryWorkbook,
);

// Add tool to produce a chart from Excel workbook data.
gridServer.tool(
  "get_workbook_chart",
  "Render a chart using workbook data",
  workbookChartInputSchema,
  { title: "Render chart" },
  handleGetWorkbookChart,
);
