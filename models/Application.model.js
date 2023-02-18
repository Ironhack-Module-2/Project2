const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'An app must have an owner']
    },
    applicant: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'An app must have an applicant']
      },
    job: {
      type: mongoose.Types.ObjectId,
      ref: 'Job',
      required: [true, 'An app must have a job']
    }
  },
 /*  {
    timestamps: true,
    toObject: {
      virtuals: true
    }
  } */
)

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;