import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { z } from "zod";

const ZEROHEIGHT_MCP_URL =
  process.env.ZEROHEIGHT_MCP_URL ??
  "https://mcp.zeroheight.com/mcp/f85d75b16901457734ee6e134af3dafbeab5daa7";

async function createZeroHeightClient(): Promise<Client> {
  const client = new Client({ name: "doc-quality-eval", version: "0.1.0" }, { capabilities: {} });
  const transport = new StreamableHTTPClientTransport(new URL(ZEROHEIGHT_MCP_URL));
  await client.connect(transport);
  return client;
}

// Lazily initialised singleton — reused across tasks within the same scenario.
let _clientPromise: Promise<Client> | null = null;
function getClient(): Promise<Client> {
  if (!_clientPromise) _clientPromise = createZeroHeightClient();
  return _clientPromise;
}

export const zeroHeightTools = {
  list_pages: {
    description: "List all documentation pages in the ZeroHeight design system.",
    inputSchema: z.object({}),
    execute: async () => {
      const client = await getClient();
      const result = await client.callTool({ name: "list-pages", arguments: {} });
      return result;
    },
  },

  get_page: {
    description: "Fetch the content of a specific ZeroHeight documentation page by its page ID.",
    inputSchema: z.object({
      pageId: z
        .number()
        .describe("The numeric ID of the page to fetch, as returned by list_pages."),
    }),
    execute: async ({ pageId }: { pageId: number }) => {
      const client = await getClient();
      const result = await client.callTool({
        name: "get-page",
        arguments: { pageId },
      });
      return result;
    },
  },
};
