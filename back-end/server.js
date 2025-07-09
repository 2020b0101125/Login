import express from "express";
import bodyParser from "body-parser";
import router from "./src/router/dataRoutes.js";
import errorhandelling from "./src/middleware/errorHandeller.js";
import createDB from "./src/config/dataConfig.js";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const app = express();
await createDB();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
// app.use(
//   cors({
//     origin: "http://localhost:3000", // frontend URL
//     credentials: true, // allows cookies/auth headers
//     optionsSuccessStatus: 200,
//   })
// );

// ✅ Helmet: Sets security HTTP headers
app.use(helmet());

// ✅ Rate Limiting: 100 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    status: 429,
    error: "Too many requests, please try again later.",
  },
});

app.use(limiter);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
/*Now, any uploaded photo can be accessed via: http://localhost:8000/uploads/members/<filename> */
app.use(
  "/uploads/members",
  express.static(path.join(__dirname, "src/uploads/members"))
);
//routes
app.use("/", router);
//errorhandeling
app.use(errorhandelling);
//tableCreation
app.get("/", (req, res) => {
  res.send("ok");
});
app.listen(8000, () => console.log("sever running at port: 8000"));
