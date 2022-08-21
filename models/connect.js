module.exports = (app) => {
    require('dotenv').config();
    const {MONGODB_URI} = process.env;
    const mongoose = new require('mongoose');

    mongoose.connect(MONGODB_URI)
    .then(() => { console.log('MongoDB Connected successfully') })
    .catch(err => console.log(err));
}
