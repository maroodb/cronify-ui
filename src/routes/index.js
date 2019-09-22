const express = require('express');
const Router = express.Router();
const Services = require('../services/JobService');



Router.get('/', (req, res) => {

    const jobsList = Services.getAllJobs();
    //res.status(200).json(jobsList);

    res.render('pages/index', {jobsList: jobsList});
});












module.exports = Router;