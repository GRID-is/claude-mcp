# GRID MCP Server

A [Model Context Protocol](https://modelcontextprotocol.io/introduction) server for using [GRID API](https://grid.is/spreadsheet-api) directly from [Claude Desktop](https://claude.ai/download).

## How to use the server

1. Make sure you have [Node.js](https://nodejs.org/) installed
2. If you haven't already, clone this repo
3. Build the project by running `npm install`
4. To use with Claude Desktop, open the app's settings file.

   - On MacOS: `~/Library/Application Support/Claude/claude_desktop_config.json`.
   - On Windows: `%APPDATA%/Claude/claude_desktop_config.json`.

   And add the following:

   ```json
   {
     "mcpServers": {
       "grid": {
         "command": "node",
         "args": ["/path/to/grid-mcp/dist/index.js"],
         "env": {
           "GRID_API_KEY": "YOUR_API_KEY"
         }
       }
     }
   }
   ```

## Development

Install dependencies:

```bash
npm install
```

Build the server:

```bash
npm run build
```

For development with auto-rebuild:

```bash
npm run watch
```

### Debugging

Since MCP servers communicate over `stdio`, debugging can be a challenge. It's recommended to use the [MCP Inspector](https://github.com/modelcontextprotocol/inspector), available as a package script:

```bash
npm run inspector
```

MCP Inspector will provide a URL to access debugging tools in your browser.
