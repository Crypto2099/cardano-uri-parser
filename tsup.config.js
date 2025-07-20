import {defineConfig} from "tsup";

export default defineConfig({
    entry: ["src/index.ts"],
    format: [
        "cjs",
        "esm"
    ],
    dts: true,
    minify: false,
    sourcemap: true,
    clean: true,
    outDir: "dist"
});
