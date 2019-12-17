require('./model');

const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const PORT = 6502;
const mongoose = require("mongoose");
const Url = mongoose.model("urlid");

app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-type,Accept,x-access-token,X-Key"
    );
    if (req.method == "OPTIONS") {
        res.status(200).end();
    } else {
        next();
    }
});

app.listen(PORT, () => {
    console.log("Server started on port", PORT);
});

app.get("/api/url/:urlId", async (req, res) => {
    let urlCode = req.params.urlId;
    let url = await Url.getByCode(urlCode);

    if (url){
        res.status(200).json(url.originalUrl);
    }
    else{
        res.status(422).json("No such short URL");
    }
});

app.post("/api/url", async (req, res) => {
    let {
        longUrl
    } = req.body;
    
    if (longUrl) {
        let item = await Url.getByLongUrl(longUrl);

        if (!item) {
            let urlCode = Math.random().toString(36).substring(2, 15);
            let shortUrl = `http://localhost:${3000}/${urlCode}`;
            item = new Url({
                "originalUrl": longUrl,
                "urlCode": urlCode,
                "shortUrl": shortUrl
            });
            await item.save();
        }
        res.status(200).json(item);
    } else {
        res.status(422).json("No url in request");
    }
});