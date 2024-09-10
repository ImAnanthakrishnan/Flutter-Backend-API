import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import {dbConnect} from "./helpers/dbConnection";
import { notFound } from "./middlewares/errors/errorMiddleware";
import { errorHandler } from "./middlewares/products/productErrorHandler";
import morgan from 'morgan';
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5001;
const mongoUri = process.env.MONGO_URL;

const morganFormat = ":method :url :status :response-time ms";

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

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
import socketRouter from "./routes/socket";
import logger from "./helpers/logger";

app.use(`${process.env.BASE_URL}/products`, productRouter); //product crud
app.use(`${process.env.BASE_URL}/weather`, weatherRouter); //external api cache
app.use(`${process.env.BASE_URL}/auth`, authRouter); //authentication and authorization,database connection
app.use(`${process.env.BASE_URL}/notification`,socketRouter); //for realtime message



app.use(notFound);
app.use(errorHandler)

const appServer = app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
