// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  // Needed for the absolute URLs that og:image and og:url require
  site: "https://lpd.dukerocketry.com",
  // The site is fully static, so there is no worker to serve the runtime
  // /_image endpoint the default Cloudflare Images service points at.
  adapter: cloudflare({ imageService: "compile" }),
  // Scoped to the two project detail pages, which need long-form authored
  // narrative rather than the structured-array model the rest of the site
  // uses — not a general move to a content-collection/CMS layer.
  integrations: [mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
});
