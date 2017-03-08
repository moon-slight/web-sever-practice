var express = require('express');
var path = require('path');
var app = express();

//use cmd  "npm install body-parser --save" to install
// set body-parser to catch form
var bodyParser = require('body-parser');
app.set('views engine', 'pug');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

var Sequelize = require('sequelize');
var db = new Sequelize('node', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        charset: 'utf8'
    }
});

var Comments = db.define('comments', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true  
    },
    name: {
        type: Sequelize.STRING,
        defaultValue: null,
        allowNull: true
    },
    message: {
        type: Sequelize.TEXT
    }
});

Comments.sync({ force: true }).then(function() {
    Comments.create({
        name: 'MoonSlight',
        message: '123456789'
    })
})

app.get('/', function(req, res) {
    Comments.all().then(function(commentArr) {
        console.log(commentArr);
        // show all comments
        res.render('index.pug', { 
            test: 'Hello World', 
            commentArr: commentArr 
        })
    })
});

app.post('/addComment', function(req, res) {
    Comments.create(req.body).then(function() {
        res.redirect('/');
    })
}); //.then() means latter work will execute after the former has done  

app.use(function(req, res, next) {
    res.sendFile(path.resolve(__dirname, './404.html'))
})


app.listen(8080, function() {
    console.log('listen http://localhost:8080')
})
