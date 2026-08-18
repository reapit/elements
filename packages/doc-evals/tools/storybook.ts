import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { z } from "zod";

const STORYBOOK_MCP_URL = process.env.STORYBOOK_MCP_URL ?? "https://elements.reapit.cloud";

async function createStorybookClient(): Promise<Client> {
  const client = new Client({ name: "doc-quality-eval", version: "0.1.0" }, { capabilities: {} });
  const transport = new StreamableHTTPClientTransport(
    new URL(`${STORYBOOK_MCP_URL}/mcp`),
    // Request the docs toolset only — we don't need dev/test tools in evals.
    { requestInit: { headers: { "X-MCP-Toolsets": "docs" } } },
  );
  await client.connect(transport);
  return client;
}

// Lazily initialised singleton — reused across tasks within the same scenario.
let _clientPromise: Promise<Client> | null = null;
function getClient(): Promise<Client> {
  if (!_clientPromise) _clientPromise = createStorybookClient();
  return _clientPromise;
}

export const storybookTools = {
  list_components: {
    description: "List all available components and documentation entries from Storybook.",
    inputSchema: z.object({
      withStoryIds: z
        .boolean()
        .optional()
        .describe(
          "When true, includes story IDs under each component. Use when you need story IDs for get_story.",
        ),
    }),
    execute: async ({ withStoryIds }: { withStoryIds?: boolean }) => {
      const client = await getClient();
      const result = await client.callTool({
        name: "list-all-documentation",
        arguments: { withStoryIds: withStoryIds ?? false },
      });
      return result;
    },
  },

  get_component: {
    description:
      "Get full documentation for a component: TypeScript prop definitions, import path, and first 3 story code examples.",
    inputSchema: z.object({
      id: z.string().describe("The component ID as returned by list_components (e.g. 'button')."),
    }),
    execute: async ({ id }: { id: string }) => {
      const client = await getClient();
      const result = await client.callTool({
        name: "get-documentation",
        arguments: { id },
      });
      return result;
    },
  },

  get_story: {
    description:
      "Get detailed code for a specific story variant of a component. Use when you need to see a prop combination not shown in the first 3 stories from get_component.",
    inputSchema: z.object({
      componentId: z.string().describe("The component ID (e.g. 'button')."),
      storyName: z.string().describe("The story name (e.g. 'Primary', 'WithIcon')."),
    }),
    execute: async ({ componentId, storyName }: { componentId: string; storyName: string }) => {
      const client = await getClient();
      const result = await client.callTool({
        name: "get-documentation-for-story",
        arguments: { componentId, storyName },
      });
      return result;
    },
  },
};
