import shared from "@quillcode/oxc/oxlint";
import { defineConfig } from "oxlint";

export default defineConfig({
  extends: [shared],
  ignorePatterns: ["dist", "build", "node_modules"],
});
