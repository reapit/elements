import { createStorybookMcpHandler, type StorybookContext } from '@storybook/mcp'

interface Env {
  ASSETS: { fetch: (request: Request) => Promise<Response> }
}

let mcpHandler: Awaited<ReturnType<typeof createStorybookMcpHandler>> | undefined

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url)

    if (pathname === '/mcp' || pathname.startsWith('/mcp/')) {
      mcpHandler ??= await createStorybookMcpHandler()
      const context: StorybookContext = {
        manifestProvider: async (_request: Request | undefined, path: string) => {
          const url = new URL(path, request.url)
          const res = await env.ASSETS.fetch(new Request(url))
          if (!res.ok) {
            console.error(`Manifest fetch failed: ${res.status} ${path}`)
            throw new Error(`Manifest fetch failed: ${res.status}`)
          }
          return res.text()
        },
      }
      return mcpHandler(request, context)
    }

    return env.ASSETS.fetch(request)
  },
}
