const express = require("express");
const { TokenVerfication, JobValidation } = require("../middleware/validation");
const jobRoute = express.Router();

const { GetAllJobs, GetJob, DeleteJob, CreateJob } = require("../controller/jobController");

jobRoute.get("/find", TokenVerfication, async (req, res) => {
    const jobs = await GetAllJobs();

    res.status(jobs.statusCode).json({ jobs });
});

jobRoute.get("/find/:jobId", TokenVerfication, async (req, res) => {
    const jobId = req.params.jobId;

    const job = await GetJob(jobId);

    res.status(job.statusCode).json({
        job
    });
});

jobRoute.post("/create", TokenVerfication, JobValidation, async (req, res) => {
    const { title, amount, description, workPlaceType, companyInfo, salary, companyLogo, } = req.body;

    const user = req.user;

    const response = await CreateJob(user.userId, title, amount, description, workPlaceType, companyInfo, salary, companyLogo);

    res.status(response.statusCode).json({
        response
    })
})

jobRoute.delete("/delete/:jobId", TokenVerfication, async (req, res) => {
    const jobId = req.params.jobId;

    const job = await DeleteJob(jobId);

    res.status(job.statusCode).json({
        job
    })
});

module.exports = jobRoute;