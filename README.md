# GRID MCP Server

A [Model Context Protocol](https://modelcontextprotocol.io/introduction) server for using [GRID API](https://grid.is/spreadsheet-api) directly from [Claude for Desktop](https://claude.ai/download).

## How to use the server

> [!IMPORTANT]
> To run this server, there are some prerequisites:
>
> - Install [Claude for Desktop](https://claude.ai/download), [Node.js](https://nodejs.org/en/download/), and [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
> - [Sign up for GRID](https://app.grid.is/), [upload a spreadsheet](https://app.grid.is/new), and save a copy of [your API key](https://app.grid.is/account/api-key)

1. Clone this repo:

   ```sh
   git clone https://github.com/GRID-is/claude-mcp.git
   ```

2. Once that's complete, move into the new directory:

   ```sh
   cd claude-mcp
   ```

3. Next, set the project up using [npm](https://docs.npmjs.com/cli/v11/commands/npm):

   ```sh
   npm install
   ```

4. Now we need to configure Claude for Desktop to use this MCP server.

   To do this, open Claude's app configuration file (or create if it doesn't exist).

   On MacOS:

   ```
   ~/Library/Application\ Support/Claude/claude_desktop_config.json
   ```

   On Windows:

   ```
   %APPDATA%\Claude\claude_desktop_config.json
   ```

5. Add your server in the `mcpServers` key:

   ```jsonc
   {
     "mcpServers": {
       "grid": {
         "command": "node",
         "args": ["/ABSOLUTE/PATH/TO/claude-mcp/dist/index.js"],
         "env": {
           "GRID_API_KEY": "YOUR_API_KEY"
         }
       }
     }
   }
   ```

   Make sure to change `/ABSOLUTE/PATH/TO/claude-mcp` to the real location of the repo directory, and `YOUR_API_KEY` to your GRID API key.

6. Quit Claude for Desktop and reopen it. Now you can ask Claude questions about your spreadsheet:

   > Using the workbook with id xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx, give me the sum of cells A1:C10

## Development

If you want to hack on the server code locally:

1. Install dependencies:

   ```bash
   npm install
   ```

2. Build the server:

   ```bash
   npm run build
   ```

3. For development with auto-rebuild:

   ```bash
   npm run watch
   ```

### Debugging

Since MCP servers communicate over `stdio`, debugging can be a challenge. It's recommended to use the [MCP Inspector](https://github.com/modelcontextprotocol/inspector), available as a package script:

```bash
npm run inspector
```

MCP Inspector will provide a URL to access debugging tools in your browser.
