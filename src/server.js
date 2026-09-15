import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import taskRoutes from "./routes/taskRoutes.js";
import connectDB from "./config/db.js";
import swaggerSpec from "./config/swagger.js";

dotenv.config();

const app = express();

// =========================
// CORS Configuration
// =========================
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  "http://localhost:3001",
  "https://fe-task-management-ntyn.vercel.app",
  "https://fe-task-management-flame.vercel.app",
  "https://task-management-api-dgg7.onrender.com",
  "https://proactive-nature-production-c316.up.railway.app",
  "https://fe-task-management-hum3.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (e.g. Swagger UI, Postman, server-to-server)
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// =========================
// Global Middlewares
// =========================
app.use(express.json());

// =========================
// Database Connection
// =========================
connectDB();

// =========================
// API Documentation (Swagger)
// =========================
app.get("/api-docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

const swaggerUiOptions = {
  customCss: ".swagger-ui .topbar { display: none }",
  customSiteTitle: "Task Management API Docs",
};

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));

// Redirect root to /api-docs for easier discovery
app.get("/", (req, res) => {
  res.redirect("/api-docs");
});

// =========================
// API Routes
// =========================
app.use("/api/tasks", taskRoutes);

// =========================
// Health Check
// =========================
app.get("/test", (req, res) => {
  res.json({
    status: "success",
    message: "Server is running smoothly",
    timestamp: new Date().toISOString(),
  });
});

// =========================
// Start Server
// =========================
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`?? Server is running on port ${port}`);
  console.log(`?? Swagger UI: http://localhost:${port}/api-docs`);
});