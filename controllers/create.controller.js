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
