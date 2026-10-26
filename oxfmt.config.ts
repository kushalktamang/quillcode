import shared from "@quillcode/oxc/oxfmt";
import { defineConfig } from "oxfmt";

export default defineConfig({
  ...shared,
  ignorePatterns: ["dist", "build", "node_modules", "**/dist/**", "**/build/**", "bun.lock"],
});
