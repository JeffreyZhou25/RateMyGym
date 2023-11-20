const mongoose = require("mongoose")

const Schema = mongoose.Schema

const gymSchema = new Schema({
    gymName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    numRatings: {
        type: Number,
        required: true
    },
    diversityRating: {
        type: Number,
        required: true
    },
    dedicateRating: {
        type: Number,
        required: true
    },
    communityRating: {
        type: Number,
        required: true
    }

})

module.exports = mongoose.model('Gym', gymSchema)