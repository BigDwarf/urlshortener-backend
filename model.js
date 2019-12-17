const mongoose = require("mongoose");
const {
    Schema
} = mongoose;

const UrlSchema = new Schema({
    originalUrl: {
        type: String
    },
    urlCode: {
        type: String
    },
    shortUrl: {
        type: String
    },
    creator: {
        type: Number
    },
    visitCount: {
        type: Number,
        default: 0
    }
});

UrlSchema.statics = {

    getByCode: async function(urlCode) {
        let item = await this.findOne({
            "urlCode": urlCode
        });
        if (item)
            await item.updateOne({
                "visitCount": item.visitCount + 1
            })
        return item;
    },

    getByLongUrl: function(originalUrl) {
        return this.findOne({
            "originalUrl": originalUrl
        });
    }
}
mongoose.model("urlid", UrlSchema);