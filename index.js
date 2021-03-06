const express = require('express');
const path = require('path');
const pug = require('pug');
const cors = require('cors');
const config = require('config');

const routes = require('./routes');

const app = express();

const PORT = config.get('PORT' || 5000);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());
app.set('views', path.join(__dirname, 'templates')); // sets up view directory
app.set('view engine', 'pug');

app.use('/', routes);

app.use(express.static(path.join(__dirname, 'templates')));
// app.use(express.static(path.join(__dirname, 'dist')));
// app.use(express.static(path.join(__dirname, 'manager')));
app.use(express.static(path.join(__dirname, 'files')));

app.listen(PORT, _ => console.log(`Server started at port ${PORT}...`));