import {McpServer, ResourceTemplate} from '@modelcontextprotocol/sdk/server/mcp.js';
import {z} from 'zod';

export function configureMcpHandler(): McpServer {
    const server = new McpServer({
        name: 'demo-server',
        version: '1.0.0'
    });

    server.registerTool(
        'multiply',
        {
            title: 'Multiplication',
            description: 'Multiply two numbers',
            inputSchema: {x: z.number(), y: z.number()},
            outputSchema: {result: z.number()}
        },
        async ({x, y}) => {
            const output = {result: x * y};
            return {
                content: [{type: 'text', text: JSON.stringify(output)}],
                structuredContent: output
            };
        }
    );

    return server;
}
