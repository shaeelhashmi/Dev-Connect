import database from "../Configuration/DB.js";
const {Schema}= database
const users= new Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
}, { timestamps: true });
const developerSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
}, { timestamps: true });
const Developer = database.model("Developer", developerSchema);
const User = database.model("User", users);
export { Developer, User };