import * as path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		setupFiles: ['./test/setupTests.ts'],
		environment: 'jsdom',
		threads: false,
		environmentOptions: {
			jsdom: {
				resources: 'usable',
			},
		},
		globals: true, // so RTL cleanup will work
		coverage: {
			lines: 78,
			branches: 79,
			functions: 61,
			statements: 78,
		},
	},
	resolve: {
		alias: {
			src: path.resolve(__dirname, './src'),
			test: path.resolve(__dirname, './test'),
		},
	},
})
