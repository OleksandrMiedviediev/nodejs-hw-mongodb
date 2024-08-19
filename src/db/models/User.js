import { Schema, model } from "mongoose";

import { mongooseSaveError, setUpdateSettings } from "./hooks.js";
import { emailRegexp } from "../constants/users-constants.js";

const userSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        match: emailRegexp,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    }


},
    {
        timestamps: true,
        versionKey: false,
    }
)


userSchema.post("save", mongooseSaveError);

userSchema.pre("findOneAndUpdate", setUpdateSettings);

userSchema.post("findOneAndUpdate", mongooseSaveError);

const User = model("user", userSchema);

export default User;