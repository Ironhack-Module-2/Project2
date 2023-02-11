const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;
const ROLES = ['hunter', 'artist'];
const EMAIL_PATTERN =
   /^(([^<>()[\]\\.,;:\s@“]+(\.[^<>()[\]\\.,;:\s@“]+)*)|(“.+“))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const userSchema = new mongoose.Schema (
    {
        firstName: {
            type: String,
            required: [true, 'Name is required'],
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required'],
        },
        email: {
            type: String,
            match: EMAIL_PATTERN,
            required: [true, 'Email is required'],
            unique: [true, 'Email is already in use'],
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        role: {
            type: String,
            enum: ROLES,
            required: true,
        }
    }
);

userSchema.pre('save', function(next) {
    const rawPassword = this.password;
    if (this.isModified('password')) {
      bcrypt.hash(rawPassword, SALT_ROUNDS)
        .then(hash => {
          this.password = hash;
          next()
        })
        .catch(err => next(err))
    } else {
      next();
    }
  });

const User = mongoose.model('User', userSchema);


module.exports = User;