import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import {dbConnect} from "./helpers/dbConnection";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5001;
const mongoUri = process.env.MONGO_URL;

//datbase connectivity
(async function(){
  await dbConnect(mongoUri)
})()
//cors configuration -> preflight options
const corsOption = {
  origin: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
};

app.use(cors(corsOption));

//parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

import productRouter from "./routes/product";
import weatherRouter from "./routes/weather";
import authRouter from "./routes/user";


app.use(`${process.env.BASE_URL}/products`, productRouter); //product crud
app.use(`${process.env.BASE_URL}/weather`, weatherRouter); //external api cache
app.use(`${process.env.BASE_URL}/auth`, authRouter); //authentication and authorization,database connection

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
