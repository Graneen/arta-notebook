const express = require("express");
const serverConfig = require("./config/serverConfig");



const app = express();
const PORT = 3001;
serverConfig(app);


app.listen(PORT, () => {
  console.log(`Server started port: ${PORT}`);
});
