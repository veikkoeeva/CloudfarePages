export interface Env {
	ASSETS: Fetcher; // This is the Pages built-in Fetcher for static assets
  }

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
	  const url = new URL(request.url);
	  const pathname = url.pathname;

	  console.log(`Requesting ${pathname}`);

	  // Custom logic for handling routes or assets
	  if (pathname === "/" || pathname === "/index.html") {

		// Serve index.html from the static assets
		console.log(`Fetching ${pathname}...`);
		return env.ASSETS.fetch(new Request(request));
	  }


	  // Default: fallback to static asset serving via env.ASSETS
	  return env.ASSETS.fetch(request);
	}
  } satisfies ExportedHandler<Env>;

