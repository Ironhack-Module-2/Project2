const mongoose = require("mongoose");
const HEIGHT = ["-1.40", "1.40 - 1.60", "1.61 - 1.80", "+1.80"];
const GENDER = ["female", "male", "non-binary"];
const AGE = [
  "0 - 3",
  "4 - 12",
  "13 - 17",
  "18 - 25",
  "26 - 35",
  "36 - 42",
  "43 - 49",
  "50 - 55",
  "56 - 60",
  "61 - 65",
  "66 - 72",
  "73 - 80",
  "+80",
];
const GENRE = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "Horror",
  "Music",
  "Mystery",
  "Romance",
  "Science fiction",
  "Thriller",
  "War",
  "Western",
];

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxLength: [400, "Description must have max 400 characters"],
    },

    gender: {
      type: String,
      required: [true, "Gender is required"],
      validate: {
        validator: (gender) => GENDER.includes(gender),
        message: "Invalid gender",
      },
      enum: GENDER,
    },

    minAge: {
      type: Number,
      required: [true, "minAge is required"],
      validate: {
        validator: (minAge) => AGE.includes(`${minAge} -`),
        message: "Invalid minAge",
      },
      enum: AGE,
    },
    maxAge: {
      type: Number,
      required: [true, "maxAge is required"],
      validate: {
        validator: (maxAge) => AGE.includes(`- ${maxAge}`),
        message: "Invalid maxAge",
      },
      enum: AGE,
    },
    height: {
      type: String,
      required: [true, "Height is required"],
      validate: {
        validator: (height) => HEIGHT.includes(height),
        message: "Height is required",
      },
      enum: HEIGHT,
    },

    skills: {
      type: String,
      //required: [true, 'Skills are required'],
    },

    location: {
      type: String,
      //required: [true, 'Location is required'],
    },

    genre: {
            type: String,
             enum: GENRE,
          },

    publicationDate: {
      type: Date,
      default: Date.now,
    },

    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "A job must have an owner"],
    },
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
    },
  }
);

/*  jobSchema.virtual('application', {
    ref: 'Application',
    foreignField: 'job',
    localField: '_id',
    justOne: false
  }) */

jobSchema.virtual("apps", {
  ref: "Application",
  foreignField: "job",
  localField: "_id",
  justOne: false,
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
