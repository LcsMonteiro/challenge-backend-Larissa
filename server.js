const app = require("./src/app");

const port = process.env.PORT || 5050;

const db = require("./src/data/database");

db.connect();

app.listen(port, () => console.log("Server connect."));
