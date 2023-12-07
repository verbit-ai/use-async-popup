import * as path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		setupFiles: ['./test/setupTests.ts'],
		environment: 'jsdom',
		environmentOptions: {
			jsdom: {
				resources: 'usable',
			},
		},
	},
	resolve: {
		alias: {
			src: path.resolve(__dirname, './src'),
			test: path.resolve(__dirname, './test'),
		},
	},
})
