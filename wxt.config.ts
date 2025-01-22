import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
	extensionApi: "chrome",
	modules: ["@wxt-dev/module-react"],
	manifest: {
		permissions: ["externally_connectable"],
		name: "Translate Page",
		description: "Translate page to different levels of Chinese",
	},
	vite: () => ({
		legacy: {
			skipWebSocketTokenCheck: true, // lets content scripts run in dev environment
		},
	}),
});
