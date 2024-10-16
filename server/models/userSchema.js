// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     password: { type: String, required: true },
//     profilePicture: { type: String }, // Optional field
//     isVerified: { type: Boolean, default: false },
//     isAdmin: { type: Boolean, default: false },
// }, {
//     timestamps: true, 
// });

// module.exports = mongoose.model("User", userSchema);

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true 
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: 'user',
    }
},

    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
