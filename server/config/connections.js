const {mongoose } = require("mongoose");
require('dotenv').config()

const db = async () => {
    try {
        // await mongoose.connect('mongodb://localhost:27017/feedback-Review')
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
}

const database = db()

module.exports = database
