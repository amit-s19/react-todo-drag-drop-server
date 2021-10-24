const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const todoUserSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    }
});

// userSchema.pre('save', function (next) {
//     const user = this;
//     if (!user.isModified('password')) {
//         return next();
//     }
//     bcrypt.genSalt(16, (err, salt) => {
//         if (err) {
//             return next(err);
//         }
//         bcrypt.hash(user.password, salt, (err, hash) => {
//             if (err) {
//                 return next(err);
//             }
//             user.password = hash;
//             next();
//         })
//     })
// });

// userSchema.methods.comparePassword = function (candidatePassword) {
//     const user = this;
//     return new Promise((resolve, reject) => {
//         bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
//             if (err) {
//                 return reject(err);
//             }
//             if (!isMatch) {
//                 return reject(err);
//             }
//             resolve(true);
//         });
//     });
// }

module.exports = mongoose.model('TodoUsers', todoUserSchema);