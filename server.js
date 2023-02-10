const express = require('express');
const mysql = require('mysql2');
const app = express();
const inquirer = require('inquirer');

app.use(express.json());

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
  );

  //connections