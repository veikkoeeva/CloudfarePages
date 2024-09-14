import { defineWorkersConfig } from '@cloudflare/vitest-pool-workers/config';

export default defineWorkersConfig({
	test: {
		globals: true,
		poolOptions: {
			workers: {
				wrangler: { configPath: './wrangler.toml' },
				miniflare: {
					compatibilityDate: '2024-09-09',
					compatibilityFlags: ['nodejs_compat']
				  }
			}
		}
	}
});
