const Job = require("../models/Job.model");
const User = require("../models/User.model");
const Application = require("../models/Application.model");
const mongoose = require("mongoose");

module.exports.createApp = (req, res, next) => {
  const applicantId = req.user.id;
  const jobId = req.params.id;

  Job.findById(jobId)
    .then((job) => {
      const application = {
        applicant: applicantId,
        job: jobId,
        owner: job.owner,
      };

      Application.create(application).then(() => {
        res.redirect("/home-artist");
      });
    })
    .catch((err) => next(err));
};

module.exports.delete = (req, res, next) => {
  Application.findByIdAndDelete(req.params.appId)
    .then((app) => {
      console.log(req.params.appId);
      res.redirect("/home");
    })
    .catch((err) => res.send(err));
};
