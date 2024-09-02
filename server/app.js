import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import errorMiddleware from "./middlewares/error.middleware.js";

// Load environment variables from .env file
config();

const app = express();

// Built-In Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Third-Party Middlewares
const corsOptions = {
  origin: "http://localhost:3000", // Allow only this origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allowed methods
  credentials: true, // Allow cookies to be sent
  optionsSuccessStatus: 204, // For legacy browser support
};
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(cookieParser());

// Server Status Check Route
app.get("/ping", (_req, res) => {
  res.send("Pong");
});

// Import all routes
import userRoutes from "./routes/user.routes.js";
import courseRoutes from "./routes/course.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import miscRoutes from "./routes/miscellaneous.routes.js";

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/courses", courseRoutes);
app.use("/api/v1/payments", paymentRoutes);
app.use("/api/v1", miscRoutes);

// Default catch-all route - 404
app.all("*", (_req, res) => {
  res.status(404).send("OOPS!!! 404 Page Not Found");
});

// Custom error handling middleware
app.use(errorMiddleware);

export default app;
