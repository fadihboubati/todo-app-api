'use strict';
// We Did not use it --
const UserSchema = (mongoose) => new mongoose.Schema({
    username: {
        required: true,
        unique: true,
        type: String
        // allowNull: false
    },

    password: {
        type: String,
        required: true

    }
})

