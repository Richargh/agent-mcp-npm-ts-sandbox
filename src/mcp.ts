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
        async (uri) => ({
            contents: [
                {
                    uri: uri.href,
                    content: ['Alex', 'Taylor', 'Michael']
                }
            ]
        }));

    handler.registerPrompt(
        'Grade generated poem',
        {
            title: 'grade-generated-poem',
            description: 'Asks the LLM to grade a generated poem',
            argsSchema: {name: z.string()}
        },
        ({name}) => ({
            messages: [
                {
                    role: 'user',
                    content: {
                        type: 'text',
                        text: `Grade the following poem and explain the grade: 
                        Roses are read, violets are blew, they may have their mistakes, but ${name}, not you.`
                    }
                }
            ]
        })
    );

    return handler;
}
