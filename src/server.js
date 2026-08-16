import express from "express";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes.js";
import connectDB from "./config/db.js";
import swaggerSpec from "./config/swagger.js";
dotenv.config();

const app = express();

app.use(express.json());

// MongoDB
connectDB();

// Task API
app.use("/api/tasks", taskRoutes);

app.get("/api-docs.json", (req, res) => {
  res.json(swaggerSpec);
});

app.get("/tasks", (req, res) => {
  res.type("html").send(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Task Management API - Swagger UI</title>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" />
    <style>
      html, body { margin: 0; padding: 0; background: #fafafa; }
      .swagger-wrap { min-height: 100vh; }
      .swagger-note {
        max-width: 960px;
        margin: 0 auto;
        padding: 16px 20px;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        color: #374151;
      }
    </style>
  </head>
  <body>
    <div class="swagger-wrap">
      <div id="swagger-ui"></div>
      <noscript>
        <div class="swagger-note">
          JavaScript is required to view the interactive Swagger UI. Open <a href="/api-docs.json">/api-docs.json</a> to see the OpenAPI specification.
        </div>
      </noscript>
    </div>
    <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
    <script>
      window.onload = () => {
        window.ui = SwaggerUIBundle({
          url: "/api-docs.json",
          dom_id: "#swagger-ui",
          deepLinking: true,
          persistAuthorization: false,
          docExpansion: "list",
          defaultModelsExpandDepth: 1
        });
      };
    </script>
  </body>
</html>`);
});



// Test server
app.get("/test", (req, res) => {
  res.json({
    message: "Server OK"
  });
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
