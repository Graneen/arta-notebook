const express = require("express");
const serverConfig = require("./config/serverConfig");
const mainRouter = require("./routes/api/main.router");


const app = express();
const PORT = 3001;
serverConfig(app);

app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`Server started port: ${PORT}`);
});
