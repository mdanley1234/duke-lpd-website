// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  // Needed for the absolute URLs that og:image and og:url require
  site: "https://lpd.dukerocketry.com",
  // The site is fully static, so there is no worker to serve the runtime
  // /_image endpoint the default Cloudflare Images service points at.
  adapter: cloudflare({ imageService: "compile" }),
  vite: {
    plugins: [tailwindcss()],
  },
});
