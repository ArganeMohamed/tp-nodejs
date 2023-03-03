const express = require("express");
const mysql = require("mysql");
const app = express();

const database = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:  "",
    database:"node",
});

database.connect((err) => { 
    if (err) throw err;
    console.log("Connected !");
});

app.post('/sign',(req, res) => {
    const { firstname, lastname } = req.body
    const sql = "INSERT INTO users (firstname, lastname) VALUES (?, ?)"
    database.query(sql, [firstname, lastname], (err, res) => {
        if (err) throw err
        res.send({
            state: true,
            message : "Done !"
        })
    })
});

app.get('/login',(req, res) => {
    const { firstname, lastname } = req.body
    const sql = "select * from users where firstname = ? && lastname = ? "
    database.query(sql, [firstname, lastname], (err, data) => {
        if (err) throw err
        if (data.length) 
            return res.send({
            state: true,
            user: {...data}
        })
        console.log("Error !")
    }
    )
});


app.listen(8000);