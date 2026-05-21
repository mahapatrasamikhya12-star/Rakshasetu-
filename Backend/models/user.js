import mongoose from "mongoose";

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

    // SUPPORTS MULTIPLE CONTACTS (up to 5)
    emergencyContacts: [
        {
            name: { type: String },
            phone: { type: String },
            relation: { type: String }
        }
    ]

});

export default mongoose.model("User", userSchema);