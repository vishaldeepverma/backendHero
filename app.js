const express = require("express");
const cors = require("cors");

const { interceptor } = require("./utility");

const app = express();
const helmet = require("helmet");
const item = require("./routes/itemRoutes");
const { sequelize } = require("./models");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Library API",
      version: "1.0.0",
    },
  },
  apis: ["routes/*.js"],
};
app.use(cors());

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// synchronize db
(async function () {
  await sequelize.sync({ force: false });
})();

const PORT = process.env.PORT || 3000;

app.use(helmet());
app.disable("x-powered-by");

// middlewares

// parse json
app.use(express.json());

app.use(interceptor);
app.get('/', (req, res, next) => {
  return res.send("I am ready");
})

// item routes
app.use("/api/item", item);

app.listen(PORT, () => console.log(`Listening on port number ${PORT}`));

module.exports = express;
