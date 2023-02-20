const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const SALT_ROUNDS = 10;
const ROLES = ['hunter', 'artist'];
const HEIGHT = ['1.40 - 1.60', '1.61 - 1.80', '+1.80'];
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
            required: [true, 'role is required'],
            validate: {
              validator: (role) => ROLES.includes(role),
              message: "Role is required"
            },
            enum: ROLES,
        },
        image: {
          type: String,
        },

        description: {
          type: String,
          maxLength: [400, 'Description must have max 400 characters']
      },
      age: {
          type: String,
        
      },
      height: {
          type: String,
          validate: {
            validator: (height) => HEIGHT.includes(height),
            message: "Height is required"
          },
          enum: HEIGHT
      },
     
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

  userSchema.methods.checkPassword = function(passwordToCompare) {
    return bcrypt.compare(passwordToCompare, this.password);
  }

const User = mongoose.model('User', userSchema);


module.exports = User;