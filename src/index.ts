import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import {dbConnect} from "./helpers/dbConnection";
import { notFound } from "./middlewares/errors/errorMiddleware";
import { errorHandler } from "./middlewares/products/productErrorHandler";
import {Server} from 'socket.io';
import http from 'http';
import morgan from 'morgan';
import logger from "./helpers/logger";



dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5001;
const mongoUri = process.env.MONGO_URL;
const server = http.createServer(app);
const morganFormat = ":method :url :status :response-time ms";
console.log('mogouri:',mongoUri);
console.log('env:',process.env)
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
); //logger middleware

export const io = new Server(server,{
  pingTimeout:60000
});

io.on('connection', (socket) => {
  console.log(`New client connected: ${socket.id}`);

  // Broadcast message to all clients when a new message is posted
  socket.on('newMessage', (message) => {
    console.log(`Message received: ${message}`);
    // Notify all connected clients
    io.emit('receiveNotification', `New message: ${message}`);
  });

  // Handle client disconnection
  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

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


app.use(`${process.env.BASE_URL}/products`, productRouter); //product crud
app.use(`${process.env.BASE_URL}/weather`, weatherRouter); //external api cache
app.use(`${process.env.BASE_URL}/auth`, authRouter); //authentication and authorization,database connection
app.use(`${process.env.BASE_URL}/socket`,socketRouter)

app.use(notFound);
app.use(errorHandler)

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

