// requiring mongoose firstly
const mongoose = require("mongoose");


// then next is creating schema

const userSchema = mongoose.Schema({
    name : {type: 'string', required: true},
    email: {type: 'string', required: true, unique: true},
    password: {type: 'string', required: true}
})


// Later in this we will use middleware in this which is .presave() like this, usse aap koi bhi data save krne se pehle kuch kaam perform kr skte ho, pre method hai userSchema mei aur pre ke andr hm save se pehle kuch kaam krwa skte h, mtlb ek naya data create hone se pehle ya kuch save krne se pehle hm kuch kaam krwa skte h


module.exports = mongoose.model("user", userSchema)
































// const userSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     role: {
//         type: String,
//         enum: ["admin", "user"],
//         default: "user"
//     },
//     isActive: {
//         type: Boolean,
//         default: true
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// });