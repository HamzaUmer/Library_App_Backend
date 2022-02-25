//Connection between database and Server
const dotenv = require('dotenv');
const pool = require('pg').Pool;
dotenv.config();

const Pool = new pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT ,
    database: process.env.DB_NAME,
});

module.exports = Pool;