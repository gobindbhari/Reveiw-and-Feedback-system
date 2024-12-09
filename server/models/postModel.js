const { mongoose } = require("mongoose");

const PostSchema = new mongoose.Schema({
    postName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    avgRating: {
        type: Number,
        default: 0
    },
    totalRating: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
        default: 'https://img.freepik.com/free-photo/sauteed-mushrooms-with-pumpkin-sweet-pepper_2829-10315.jpg?t=st=1733651565~exp=1733655165~hmac=33ef87569144a7d6fb65c92643a38a6816bb75af104379378722d1a1f25e759c&w=1380'
    },
    feedback:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Feedback'
    }]
},{
    timestamps:true
})

const Post = mongoose.model('Post', PostSchema)

module.exports = Post