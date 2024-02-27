import express from "express";
import bodyparser from "body-parser"
import 'dotenv/config';
import cors from "cors";
import { Sequelize } from "sequelize";
import { garageModel } from "./model/garage";
import { garageRouter } from "./router/garage";

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT ? parseInt(process.env.PORT as string) : 3000
const database = process.env.POSTGRES_DB as string
const username = process.env.POSTGRES_USER as string
const password = process.env.POSTGRES_PASSWORD
const host = process.env.POSTGRES_HOST
const portPostgres = process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT as string) : 5432

let mySequelize: Sequelize

mySequelize = new Sequelize(database, username, password, {
    host: host,
    port: portPostgres,
    dialect: 'postgres',
    dialectOptions: {
      ssl: true,
        }
});

export const garage = garageModel(mySequelize);

mySequelize.sync({force: true})
// mySequelize.sync()

app.use("/", garageRouter)

app.listen(port, () => {
    console.log('serveur running on port : ' + port);
})