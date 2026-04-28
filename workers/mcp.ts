import { createStorybookMcpHandler } from '@storybook/mcp'

interface Env {
  ASSETS: { fetch: (request: Request) => Promise<Response> }
}

const mcpHandler = await createStorybookMcpHandler()

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url)
    if (pathname === '/mcp' || pathname.startsWith('/mcp/')) {
      return mcpHandler(request)
    }
    return env.ASSETS.fetch(request)
  },
}
