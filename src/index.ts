import { GridServer } from "./server/gridServer.js";

const server = new GridServer();
server.start().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
