import { createProxyMiddleware } from "http-proxy-middleware";

export default function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:4000", // Replace with your backend server's address
      changeOrigin: true,
    })
  );
}
