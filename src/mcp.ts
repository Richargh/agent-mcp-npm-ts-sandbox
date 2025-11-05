import {McpServer, ResourceTemplate} from '@modelcontextprotocol/sdk/server/mcp.js';
import {z} from 'zod';

export function configureMcpHandler(): McpServer {
    const handler = new McpServer({
        name: 'demo-server',
        version: '1.0.0'
    });

    handler.registerTool(
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

    handler.registerResource(
        'names',
        new ResourceTemplate('names://', {list: undefined}),
        {
            title: 'Some Names', // Display name for UI
            description: 'Provides some names to use'
        },
        async (uri, {name}) => ({
            contents: [
                {
                    uri: uri.href,
                    content: ['Alex', 'Taylor', 'Michael']
                }
            ]
        }));

    handler.registerPrompt(
        'write-a-poem',
        {
            title: 'Write a poem',
            description: 'Writes a simple poem for given name',
            argsSchema: { name: z.string() }
        },
        ({ name }) => ({
            messages: [
                {
                    role: 'user',
                    content: {
                        type: 'text',
                        text: `Roses are read, violets are blue and so are you ${name}`
                    }
                }
            ]
        })
    );

    return handler;
}
