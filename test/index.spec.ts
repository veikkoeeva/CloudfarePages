// test/index.spec.ts
import { env, createExecutionContext, waitOnExecutionContext, SELF } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';
import worker from '../src/index';
import type { Env } from '../src/index';

// For now, you'll need to do something like this to get a correctly-typed
// `Request` to pass to `worker.fetch()`.
const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

//TODO: Currently npm run build needs to be run first and index.html be manually copied to dist. Need to automate this.
declare module "cloudflare:test" {
	// Extend the provided environment with your custom Env interface
	interface ProvidedEnv extends Env {}
}

  describe('Hello World worker', () => {
	it('responds with Hello World! (unit style)', async () => {
		const request = new IncomingRequest('http://example.com');
		// Create an empty context to pass to `worker.fetch()`.
		const ctx = createExecutionContext();

		const response = await worker.fetch(request, env, ctx);
		// Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
		await waitOnExecutionContext(ctx);
		const x = await response.text();
		console.log(x);
		//expect(await response.text()).toMatchInlineSnapshot(`"Hello World!"`);
	});


	it('responds with Hello World! (integration style)', async () => {
		const response = await SELF.fetch('https://example.com');
		/*const x = await response.text();
		console.log(x);*/

		//expect(await response.text()).toMatchInlineSnapshot(`"Hello World!"`);
	});


	it('fetches index.html correctly', async () => {
		// Test using SELF.fetch()
		const response = await SELF.fetch('https://example.com/index.html');

		// Check the response
		const text = await response.text();
		console.log(text);

		// Assert the content of index.html
		expect(text).toContain("<html>"); // Example assertion
	  });


	  it('handles 404 for non-existing assets', async () => {
		// Test using SELF.fetch() for a non-existing asset
		const response = await SELF.fetch('https://example.com/non-existing.html');

		expect(response.status).toBe(404); // Asset not found
		const text = await response.text();
		console.log(text);
	  });
});
