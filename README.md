# Vite Watch Mode Programmatic Access Issue

This repository demonstrates a bug in Vite's programmatic API when trying to access build results in watch mode.

## Issue Description

When using Vite programmatically with watch mode enabled and `write: false` (to prevent writing files to disk), the recommended approach for accessing build outputs is to listen for the `BUNDLE_END` event and use `ev.result.generate({})` to obtain the generated files. This pattern works correctly in Rollup, but fails in Vite.

## Expected Behavior

The code should successfully generate and access the build output programmatically without writing files to disk, similar to how it works in Rollup.

## Actual Behavior

The `ev.result.generate({})` call fails with the following error:

```
Bundle is already closed, no more calls to "generate" or "write" are allowed.
```

## Reproduction Steps

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the watch script:
   ```bash
   npm run watch
   ```
4. Observe the error when the bundle generation is attempted

## Code Structure

- **`src/main.ts`** - A minimal TypeScript file that serves as the entry point for the build
- **`watch.ts`** - The main script that demonstrates the issue by:
  - Setting up Vite in watch mode with `write: false`
  - Listening for `BUNDLE_END` events
  - Attempting to call `ev.result.generate({})` to access build outputs

## Technical Details

The issue occurs because Vite closes the bundle before the `BUNDLE_END` event handler can access it via `generate()`. This prevents programmatic access to build results in watch mode, which is a common use case for build tools that need to process the output without writing to disk.

## Use Case

This functionality is essential for tools that need to:
- Programmatically access build outputs without disk I/O
- Implement custom output processing in watch mode
- Build development tools that consume Vite builds in memory

## Environment

- **Vite version**: ^7.0.4
- **Node.js**: Tested with Node.js 18+
- **TypeScript**: ~5.8.3

## Related Documentation

- [Vite Programmatic API](https://vitejs.dev/guide/api-javascript.html)
- [Rollup Watch API](https://rollupjs.org/javascript-api/#rollupwatch)

---

This repository serves as a minimal reproduction case for filing a bug report with the Vite team. 
