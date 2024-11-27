// Fichero para conectar con la base de datos

const mongoose = require ('mongoose');
const URI = 'mongodb+srv://aidarile:1234@aidarile.m3qm6.mongodb.net/?retryWrites=true&w=majority&appName=aidarile';

mongoose.connect(URI)
    .then(() => console.log('DB Connected'))
    .catch(err => console.error(err));

module.exports = mongoose;