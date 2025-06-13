import express from "express";
import bodyParser from "body-parser";
import router from "./src/router/dataRoutes.js";
import errorhandelling from "./src/middleware/errorHandeller.js";
import createDB from "./src/config/dataConfig.js";
import cors from "cors";

const app = express();
await createDB();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.use("/", router);
//errorhandeling
app.use(errorhandelling);
//tableCreation
app.get("/", (req, res) => {
  res.send("ok");
});
app.listen(8000, () => console.log("sever running at port: 8000"));
