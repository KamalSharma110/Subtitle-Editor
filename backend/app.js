const express = require('express');
const bodyParser = require('body-parser');

const subRoutes = require('./routes/subtitle');
const { mongoConnect } = require('./utils/database');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(subRoutes);

app.use((err, req, res, next) => {
    console.log(err);
    const error = {};
    error.message = err.message || 'Something went wrong';
    error.statusCode = err.statusCode || 500;

    res.status(error.statusCode).json({error: error.message});
});


mongoConnect(() => app.listen(8080));