const Job = require("../models/Job.model");
const mongoose = require("mongoose");

module.exports.create = (req, res, next) => {
  res.render("jobs/create");
};

module.exports.doCreate = (req, res, next) => {
  const range = req.body.range;
  req.body.minAge = Number(range.split(" - ")[0]);
  req.body.maxAge = Number(range.split(" - ")[1]);
  const newJob = {
    ...req.body,
    owner: req.user.id,
  };
  console.log("********* ", newJob);

  Job.create(newJob)
    .then((job) => {
      res.redirect("/home");
    })
    .catch((err) => console.log(err));
};

module.exports.delete = (req, res, next) => {
  Job.findByIdAndDelete(req.params.id)
    .then((job) => {
      res.redirect("/home");
    })
    .catch((err) => console.log(err));
};

module.exports.edit = (req, res, next) => {
  Job.findById(req.params.id)
    .then((job) => {
      res.render("jobs/edit", { job });
    })
    .catch((err) => res.send(err));
};

module.exports.doEdit = (req, res, next) => {
  const range = req.body.range;
  req.body.minAge = Number(range.split(" - ")[0]);
  req.body.maxAge = Number(range.split(" - ")[1]);
  const updatedJob = {
    ...req.body,
  };

  Job.findByIdAndUpdate(req.params.id, updatedJob)
    .then((job) => {
      console.log(req.body);
      res.redirect("/home");
    })
    .catch((err) => res.send(err));
};
