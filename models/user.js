const mongoose = require("mongoose");

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
        default: null
    },

    googleId: {
        type: String,
        default: null
    },

    picture: {
        type: String,
        default: null
    },

    provider: {
        type: String,
        enum: ["local", "google"],
        default: "local"
    },

    subscription: {
        type: Boolean,
        default: false
    },

    trialUsed: {
        type: Boolean,
        default: false
    },

    faceEmbedding: {
        type: [Number],
        default: []
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);