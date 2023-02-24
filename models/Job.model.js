const mongoose = require('mongoose');
 const HEIGHT = ['1.40 - 1.60', '1.61 - 1.80', '+1.80'];
 

 const jobSchema = new mongoose.Schema (
     {

        title: {
             type: String,
             required: [true, 'title is required'],
         },
        description: {
             type: String,
             required: [true, 'Description is required'],
             maxLength: [400, 'Description must have max 400 characters']
         },
         age: {
             type: String,
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

        owner: {
           type: mongoose.Types.ObjectId,
           ref: 'User',
           required: [true, 'A job must have an owner']
         },
      },
      {
         timestamps: true,
       }
);


/*  jobSchema.virtual('application', {
    ref: 'Application',
    foreignField: 'job',
    localField: '_id',
    justOne: false
  }) */

  jobSchema.virtual('apps', {
    ref: 'Application',
    foreignField: 'job',
    localField: '_id',
    justOne: false
  })

 const Job = mongoose.model('Job', jobSchema);


 module.exports = Job;