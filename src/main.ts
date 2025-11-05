import {configureHttpApp} from "./app.ts";
import {configureMcpHandler} from "./mcp.ts";


function main() {
    const port = parseInt(process.env.PORT || '3000');

    const mcpHandler = configureMcpHandler();
    const app = configureHttpApp(mcpHandler)
    app.listen(port, () => {
        console.log(`MCP Server running on http://localhost:${port}/mcp`);
        console.log(``);
        console.log(`Claude Code specifics:`);
        console.log(`* Add: claude mcp add --transport http richargh http://localhost:${port}/mcp`);
        console.log(`* Check status: claude mcp get richargh`);
        console.log(`* Check status in claude: /mcp`);
        console.log(`* Remove mcp, once you have tried it: claude mcp remove richargh`);
        console.log(``);
        console.log(`Codex specifics:`);
        console.log(`* Add: codex mcp add richargh --url http://localhost:${port}/mcp`);
        console.log(`* Check status: codex mcp get richargh`);
        console.log(`* Check status in codex: /mcp`);
        console.log(`* Remove mcp once you have tried it: codex mcp remove richargh`);
        console.log(``);
        console.log(`Try some of the actions:`);
        console.log(`* Ask it to 'Multiply 5 and 7'`);
        console.log(`* Use the prompt by calling slash command (prompts only work in Claude): /grade-generated-poem`);
        console.log(`* Ask it to 'Check your resources for important book names (resources only work in Claude)'`);
        console.log(`---------Interactions---------`);
    }).on('error', error => {
        console.error('Server error:', error);
        process.exit(1);
    });
}

main();