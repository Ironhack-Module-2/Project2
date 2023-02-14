const mongoose = require('mongoose');
const ROLES = ['yes', 'no'];

const hunterSchema = new mongoose.Schema (
    {
        height: {
            type: Number  
        },
        weight: {
            type: Number
        },
        age: {
            type: Number
        },
        eyeColor: {
            type: String,
        },
        role: {
            type: String,
            required: [true, 'role is required'],
            validate: {
              validator: (role) => ROLES.includes(role),
              message: "Role is required"
            },
            enum: ROLES 
        },
        km: {
            type: Number
        }
    }
);

const Hunter = mongoose.model('Hunter', hunterSchema);


module.exports = Hunter;