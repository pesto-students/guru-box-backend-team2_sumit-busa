const mongoose = require('mongoose');
const express = require('express');
const url = 'mongodb://chacha:chacha1998@localhost:27017/venus';
const PORT = process.env.PORT || '9000';
const app = express();

mongoose.connect(url);
const con = mongoose.connection;

con.on('open', () => {
    console.log('connected....');
})

app.use(express.json());

const userRoutes = require('./routes/user');

app.use('/users', userRoutes);

app.listen(PORT, () => {
    console.log('Listeing to', PORT);
})