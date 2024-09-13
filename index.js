import { serve } from "bun";

serve({
  port: 3000,
  fetch(req) {
    // บริการไฟล์ index.html ของ React
    return new Response(Bun.file("./public/index.html"));
  },
});
