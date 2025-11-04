import {configureHttpApp} from "./app.ts";
import {configureMcpHandler} from "./mcp.ts";


function main() {
    const port = parseInt(process.env.PORT || '3000');

    const mcpHandler = configureMcpHandler();
    const app = configureHttpApp(mcpHandler)
    app.listen(port, () => {
        console.log(`MCP Server running on http://localhost:${port}/mcp`);
    }).on('error', error => {
        console.error('Server error:', error);
        process.exit(1);
    });
}

main();