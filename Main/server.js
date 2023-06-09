const express = require('express')

const mysql = require('mysql2');

const PORT = proces.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({extended: false}));

app.use(express.json());

const db = mysql.createConnection(
   {
    host: 'localhost',
    user: 'root',
    password: 'risa',
    database: 'employee_db'
   } 
)