const mongoose = require('mongoose');
 const HEIGHT = ['1.40 - 1.60', '1.61 - 1.80', '+1.80'];
 

 const jobSchema = new mongoose.Schema (
     {
         description: {
             type: String,
             required: [true, 'Description is required'],
             maxLength: [400, 'Description must have max 400 characters']
         },
         age: {
             type: Number,
             required: [true, 'Age is required'],
         },
         height: {
             type: String,
             required: [true, 'Height is required'],
             validate: {
               validator: (height) => HEIGHT.includes(height),
               message: "Height is required"
             },
             enum: HEIGHT
         },
     }
 );

 const Job = mongoose.model('Job', jobSchema);


 module.exports = Job;