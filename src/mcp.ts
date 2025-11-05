import {McpServer, ResourceTemplate} from '@modelcontextprotocol/sdk/server/mcp.js';
import {z} from 'zod';
import type {Request} from "express";

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
        'software-books',
        new ResourceTemplate('software-books://{service}', {
            list: async () => ({
                resources: [{
                    uri: 'software-books://names',
                    name: 'software-book-names',
                    title: 'Names of important software books',
                    description: 'Provides software book names to use'
                }]
            })
        }),
        {
            title: 'Software Books', // Display name for UI
            description: 'Provides software book resources'
        },
        async (uri, { service }) => ({
            contents: [
                {
                    uri: uri.href,
                    mimeType: 'text/plain',
                    text: `Implementation Patterns
                    Tidy First
                    Refactoring`
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

export function prettyFormatCall(req: Request): string {
    const method = req.body?.method ?? "Unknown"
    let result = `Request: ${method}`

    if(method == "tools/call")
        result += `->${req.body?.params?.name ?? "Unknown"}`
    if(method == "resources/read")
        result += `->${req.body?.params?.uri ?? "Unknown"}`
    if(method == "prompts/get")
        result += `->${req.body?.params?.name ?? "Unknown"}`

    return result;
}
