// const mongoose = require("mongoose");

// const userSchemaCreater = require("./user.schema")
// const userSchema = userSchemaCreater(mongoose);
// const userModel = mongoose.model("User", userSchema);
// module.exports = {
//     mongoose,
//     userModel
// }


const userModel = require("./user.model");
module.exports = {
    userModel
};




