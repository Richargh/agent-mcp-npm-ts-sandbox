import {StreamableHTTPServerTransport} from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import express, {type Express} from 'express';
import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';

export function configureHttpApp(mcpHandler: McpServer): Express {
    const app = express();
    app.use(express.json());

    app.post('/mcp', async (req, res) => {
        const transport = new StreamableHTTPServerTransport({
            sessionIdGenerator: undefined,
            enableJsonResponse: true
        });

        res.on('close', () => {
            transport.close();
        });

        await mcpHandler.connect(transport);
        await transport.handleRequest(req, res, req.body);
    });

    return app;
}
