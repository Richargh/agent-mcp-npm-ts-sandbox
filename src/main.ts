import {configureHttpApp} from "./app.ts";
import {configureMcpHandler} from "./mcp.ts";


function main() {
    const port = parseInt(process.env.PORT || '3000');

    const mcpHandler = configureMcpHandler();
    const app = configureHttpApp(mcpHandler)
    app.listen(port, () => {
        console.log(`MCP Server running on http://localhost:${port}/mcp`);
        console.log(`Claude Code specifics:`);
        console.log(`* Add to claude code via: claude mcp add --transport http richargh http://localhost:${port}/mcp`);
        console.log(`* Check status in claude: /mcp`);
        console.log(`* Remove mcp once you have tried it: claude mcp remove richargh`);
        console.log(`* Try also some of the actions:`);
        console.log(`** Use the prompt by calling slash command /grade-generated-poem`);
        console.log(`** Ask it to 'Multiply 5 and 7'`);
        console.log(`---------Interactions---------`);

    }).on('error', error => {
        console.error('Server error:', error);
        process.exit(1);
    });
}

main();