import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Sequelize, DataTypes} from "sequelize";

import { UserModel} from "./model/User";
import { TokenBlackListModel } from "./model/TokenBlackList";

import { authRouter } from "./router/auth";
import { userRouter } from "./router/users";
import { createProxyMiddleware } from "http-proxy-middleware";

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db/database.sqlite'
});

export const User = UserModel(sequelize);
export const TokenBlackList = TokenBlackListModel(sequelize);

// sequelize.sync({ force: true });
sequelize.sync();

const app = express();
app.use(cors());

const voituresProxy = createProxyMiddleware(
  { 
    target: 'http://localhost:3000',
    changeOrigin: true,
    pathRewrite: {
      '^\/api\/voitures': '/'
    }
  }
)

const pythonProxy = createProxyMiddleware(
  { 
    target: 'http://localhost:7000',
    changeOrigin: true,
      pathRewrite: {
        '^\/api\/python': '/'
      }
  }
)
const apiRouter = express.Router();
apiRouter.use('/voitures', voituresProxy);
apiRouter.use('/python', pythonProxy)

apiRouter.use(express.json());

apiRouter.use('/auth', authRouter);
apiRouter.use('/users', userRouter);
app.use("/api", apiRouter);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`)
});
