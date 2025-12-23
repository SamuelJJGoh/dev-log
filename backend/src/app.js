import express from "express"

const app = express();

app.use(express.json());

import sessionRouter from "./routes/session.route.js";
import resourceRouter from "./routes/resource.route.js";

app.use("/api/v1/sessions", sessionRouter);
app.use("/api/v1/resources", resourceRouter);

export default app;