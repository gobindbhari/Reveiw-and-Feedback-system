const { mongoose } = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',

    },
    comment: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        enum:[1,2,3,4,5]
    },
    approved: {
        type: Boolean,
        default: false
    }
},{
    timestamps:true
})

const Feedback = mongoose.model('Feedback', FeedbackSchema)

module.exports = Feedback