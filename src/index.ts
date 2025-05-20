import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { gridServer } from "./server/gridServer.js";

// Receive messages on stdin, send messages on stdout.
const transport = new StdioServerTransport();
await gridServer.connect(transport);
