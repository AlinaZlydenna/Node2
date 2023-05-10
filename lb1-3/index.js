import express from "express"
import config from "config"
import mongoose from "mongoose"
import authorizationRouter from "./controllers/AuthorizationController.js";
import cors from 'cors'
import {orderRouter} from "./controllers/OrderController.js";
import multer from "multer";
import {storage} from "./tools/tools.js";
import {orderStuffRouter} from "./controllers/OrderStuffController.js";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import {redisClient} from "./services/RedisUserService.js";

const app = express()

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}));
app.use(multer({storage: storage}).array("images", 10));

app.use('/authorization', authorizationRouter)

app.use('/orders', orderRouter)

app.use('/order', orderStuffRouter)

const PORT = config.get('port') || 8100

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(join(__dirname, "uploads")));

async function start() {
    try {
        await mongoose.connect(config.get('db_url'), {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })

        await redisClient.connect();

        app.listen(PORT, () => console.log("Successful", PORT))


    } catch (e) {
        console.log('Server error', e)
        process.exit(1)
    }
}

start()
