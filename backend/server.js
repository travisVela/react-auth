import dotenv from "dotenv";
import express from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose, { mongo } from "mongoose";

import { logger } from "./middleware/logEvents.js";
import { errorHandler } from "./middleware/errorHandler.js";

import rootRoutes from "./routes/root.js";
import apiRoutes from "./routes/api/employees.js";
import registerRoutes from "./routes/api/register.js";
import authRoutes from "./routes/api/auth.js";
import refreshRoutes from "./routes/api/refresh.js";
import logoutRoutes from "./routes/api/logout.js";

import corsOptions from "./config/corsOptions.js";
import verifyJWT from "./middleware/verifyJWT.js";
import credentials from "./middleware/credentials.js";
import connectDB from "./config/dbConn.js";

connectDB();

const app = express();
dotenv.config({ path: "../env" });

const PORT = process.env.port || 3500;

// MIDDLEWARE
app.use(logger);

app.use(credentials);

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(import.meta.dirname, "/public")));

// ROUTES

app.use("/", rootRoutes);
app.use("/register", registerRoutes);
app.use("/auth", authRoutes);
app.use("/refresh", refreshRoutes);
app.use("/logout", logoutRoutes);

app.use(verifyJWT);
app.use("/employees", apiRoutes);

app.all("/{*splat}", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(import.meta.dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 not found" });
  } else {
    res.type("txt").send("404 not found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to mongoDB");
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
});
