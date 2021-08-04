const express = require("express");

const swaggerUi = require("swagger-ui-express");

const swaggerDocs = require("../swagger.json");

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const partner = require("./routes/partner.routes");

app.get("/", (req, res) => {
  res.status(200).send({ message: "Hello World!!" });
});

app.use("/partners", partner);

module.exports = app;
