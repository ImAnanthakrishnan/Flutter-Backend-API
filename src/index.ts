import express,{Express} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

//cors configuration -> preflight options
const corsOption = {
    origin: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  };
  
app.use(cors(corsOption)); 

//parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

import productRouter from './routes/product';

app.use(`${process.env.BASE_URL}/products`,productRouter); //product in memory crud

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
  