//use cmd  "npm install express --save" to install
var express = require('express'); // load express model
var path = require('path');
var app = express(); // build express

//use cmd  "npm install sequelize --save" to install
var Sequelize = require('sequelize');  // load sequelize

// set connection
var db = new Sequelize('node', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        charset: 'utf8'
    }
});

//define table
var Comments = db.define('comments', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true  
    },
    Name: {
        type: Sequelize.STRING,
        defaultValue: null,
        allowNull: true
    },
    message: {
        type: Sequelize.TEXT
    }
});

// synchronize table
Comments.sync({ force: true }).then(function() {
    console.log('success') // check if it work
})


// if the end of url is '/' symbol, send "Hello" message
app.get('/', function(req, res) {
    res.send('Hello')
})

// if the end of url is not '/', send error message
// app.use usually use to 404 page, Log, file compression
app.use(function(req, res, next) {
    res.sendFile(path.resolve(__dirname, './404.html'))
})

// listen to http://localhost:8080
app.listen(8080, function() {
    console.log('listen http://localhost:8080')
})
