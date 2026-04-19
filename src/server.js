import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import mongoconnect from "./config/mongoconnect.js";
import AuthRoutes from "./Route/auth.Route.js";
import env from "./config/env.js";
import foodRouter from "./Route/food.route.js";
import orderRouter from "./Route/order.Route.js";

const app = express();
const PORT = env.PORT;

/* Middlewares */

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Static Folder */

app.use("/uploads", express.static("uploads"));

/* Routes */

app.use("/api/auth", AuthRoutes);
app.use("/api/food", foodRouter);
app.use("/api/order", orderRouter);

/* Root Route */

app.get("/", async (req, res) => {
  try {
    return res.status(200).json({
      message: "Server started",
      success: true,
    });
  } catch (error) {
    console.log("error:", error.message);

    return res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
});

/* Start Server */

async function server() {
  try {
    await mongoconnect();

    app.listen(PORT, () => {
      console.log(
        `Server Started At http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.log(
      "Database connection failed:",
      error.message
    );
  }
}

server();