import {build} from "vite";

const watcher = await build({
	build: {
		// Don't write the output files to disk, we want to access them via the watcher API
		write: false,
		lib: {
			entry: "src/main.ts",
			formats: ["es"],
		},
		// Enable watch mode
		watch: {},
	},
});

if (Array.isArray(watcher) || "output" in watcher)
	throw new Error("Not a watcher");

watcher.on("event", async (ev) => {
	if (ev.code === "BUNDLE_END") {
		// This is an example that shows that `.generate` fails
		const output = await ev.result.generate({});
		console.log(`Generated ${output.output.length} files`);
	}
});
