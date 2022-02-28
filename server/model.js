const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userModel = new schema({
  userName: {
    type: String,
    required: true,
  },
});

const userSchema = mongoose.model("user", userModel);
module.exports = userSchema;
