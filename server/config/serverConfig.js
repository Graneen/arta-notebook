const express = require("express");
const morgan = require("morgan");
const CORS = require("cors");

const corsOptions = {
  origin: ["http://localhost:3000", "*"],
  optionsSuccessStatus: 200,
  credentials: true, // принимать куки от сторонних источников
}; 

const serverConfig = (app) => {
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static("public"));
  app.use(CORS(corsOptions));
};

module.exports = serverConfig;
