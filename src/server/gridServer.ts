import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { labelSearchInputSchema } from "../schemas/labelSearchInputSchema.js";
import { queryWorkbookInputSchema } from "../schemas/queryWorkbookInputSchema.js";
import { workbookChartInputSchema } from "../schemas/workbookChartInputSchema.js";
import {
  handleGetWorkbookChart,
  handleLabelSearch,
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
  version: "1.1.0",
});

// Add tool to query data within an Excel workbook.
gridServer.tool(
  "list_workbooks",
  "List the Excel workbooks and spreadsheets linked your GRID account",
  { title: "List workbooks", readOnlyHint: true },
  handleListWorkbooks,
);

// Add tool to query data within an Excel workbook.
gridServer.tool(
  "query_workbook",
  "Interact with a spreadsheet. Optionally, apply (update) values to cells. Read values from cells and formulas.",
  queryWorkbookInputSchema,
  { title: "Query spreadsheet cells", destructiveHint: false, idempotentHint: true },
  handleQueryWorkbook,
);

// Add tool to produce a chart from Excel workbook data.
gridServer.tool(
  "get_workbook_chart",
  "Render a chart using workbook data",
  workbookChartInputSchema,
  { title: "Render chart", readOnlyHint: true },
  handleGetWorkbookChart,
);

// Add tool that performs semantic search on labels identified within a user's workbooks.
gridServer.tool(
  "search_labels",
  "Search through a user's workbooks",
  labelSearchInputSchema,
  { title: "Search workbooks", readOnlyHint: true },
  handleLabelSearch,
);
