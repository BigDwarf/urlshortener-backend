const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27012/url-shortener";
const connectOptions = {
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE
};

mongoose.Promise = global.Promise;
mongoose.connect(mongoURI, connectOptions, (err, db) => {
    if (err) {
        console.log("Error", err);
    }
    console.log("Connected");
});