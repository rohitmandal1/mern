const mongoose = require("mongoose");

const comment_schema = new mongoose.Schema({
    content: {
        type:String,
        require: "Content is reqired"
    },
    post: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: "Post is Required Field"

    }
});

module.exports = mongoose.model("Comment", comment_schema);