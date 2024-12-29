const mongoose = require("mongoose");
require('dotenv').config();
const mongoURI = process.env.DB_URL;
// Connect to MongoDB
const connectToDatabase = async () => {
    try {
        await mongoose.connect(mongoURI)
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => console.error('Error connecting to MongoDB:', err));
        
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1); 
    }
};

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    username: String,
    password: String,
});

const TodoSchema = new Schema({
    userId: ObjectId,
    title: String,
    completed: Boolean,
});

const User = mongoose.model('User', UserSchema);
const Todo = mongoose.model('Todo', TodoSchema);

module.exports = {
    connectToDatabase,
    User,
    Todo,
};
