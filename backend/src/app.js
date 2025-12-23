import express from "express"

const app = express();

app.use(express.json());

import sessionRouter from "./routes/session.route.js";

app.use("/api/v1/sessions", sessionRouter);

export default app;