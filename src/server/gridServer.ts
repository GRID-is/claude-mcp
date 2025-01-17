import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import {
  handleGetWorkbookChart,
  handleGetWorkbookChartURL,
  handleQueryWorkbook,
} from "./handlers/index.js";
import { getWorkbookChart, getWorkbookChartURL, queryWorkbook } from "./tools/index.js";

/**
 * MCP server for the GRID API.
 *
 * <https://modelcontextprotocol.io/docs/concepts/architecture>
 */
export class GridServer {
  private server: Server;

  constructor() {
    this.server = new Server(
      {
        name: "grid-server",
        version: "1.0.0",
      },
      {
        capabilities: {
          tools: {},
          resources: {},
        },
      },
    );

    this.setupHandlers();
  }

  private setupHandlers() {
    // List available tools.
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [queryWorkbook, getWorkbookChart, getWorkbookChartURL],
      };
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      switch (name) {
        case "query_workbook":
          return await handleQueryWorkbook(args);
        case "get_workbook_chart":
          return await handleGetWorkbookChart(args);
        case "get_workbook_chart_url":
          return await handleGetWorkbookChartURL(args);
      }

      throw new Error(`Unknown tool: ${name}`);
    });
  }

  async start() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("GRID MCP Server running on stdio");
  }
}
