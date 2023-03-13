require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || process.env.LOCAL_PORT;
const router = require("./router");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

//DATABASE CONNECTION
require('./Config/DBConnection');

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

app.listen(port, () => {
    console.log(`My app is listening on localhost:${port}`);
});