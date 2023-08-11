const { v4: uuidv4 } = require('uuid');
const Job = require("../model/jobModel");

async function GetAllJobs() {
    const jobs = await Job.find({});

    if (jobs.length === 0) {
        return {
            statusCode: 200,
            message: "now jobs yet",
            jobs
        }
    }

    return {
        statusCode: 200,
        message: "jobs found",
        jobs
    }
}

async function GetJob(jobId) {
    const job = await Job.findOne({ jobId });

    if (job === null) {
        return {
            statusCode: 400,
            message: "job does not exist",
        }
    }

    return {
        statusCode: 200,
        message: "job found",
        job
    }
}

async function CreateJob(userId, title, amount, description, workPlaceType, companyInfo, salary, companyLogo, isAddToCart) {
    const jobId = uuidv4();

    const newJob = new Job({
        jobId,
        userId,
        title,
        amount,
        description,
        workPlaceType,
        companyInfo,
        salary,
        companyLogo,
        isAddToCart,
    });

    const job = await newJob.save();

    return {
        statusCode: 201,
        message: "jobCreated",
        job
    }
}

async function DeleteJob(jobId) {
    const job = await Job.findOneAndDelete({ jobId });

    if (job === null) {
        return {
            statusCode: 400,
            message: "job does not exist"
        }
    } else {

        return {
            statusCode: 200,
            message: "job has been deleted",
            job
        }
    }
}

module.exports = {
    GetAllJobs,
    GetJob,
    CreateJob,
    DeleteJob,
}