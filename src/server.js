const app = require('./app');
const db = require('./db/database');
const ebRouter = require('./routes/ebRouter');
const hbs = require('express-handlebars');
const express = require('express');
const path = require('path')


// Template engine
app.engine('handlebars', hbs.engine());
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/exercito', ebRouter) ;

app.listen(3000, () => {
    console.log('Servidor Online na Porta 4000');
});

