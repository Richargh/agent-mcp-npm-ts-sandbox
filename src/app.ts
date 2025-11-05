import {StreamableHTTPServerTransport} from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import express, {type Express, type Request} from 'express';
import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {prettyFormatCall} from "./mcp.ts";

export function configureHttpApp(mcpHandler: McpServer): Express {
    const app = express();
    app.use(express.json());

    app.post('/mcp', async (req: Request, res) => {
        console.log(prettyFormatCall(req));

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

    app.get('/mcp', async (_, res) => {
        console.log("Request: Server was asked but denied session management");
        res.status(405).send('Server does not support session management');
    });

    return app;
}
