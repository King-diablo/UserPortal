const { v4: uuidv4 } = require('uuid');
const Job = require("../model/jobModel");
const { faker } = require('@faker-js/faker');

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

async function PopulateJobDatabase() {
    const jobs = [];

    const data = await GetAllJobs();

    if (data.jobs.length > 0) {
        return {
            statusCode: 400,
            message: "database is already populated"
        }
    }

    for (let i = 0; i < 100; i++) {
        const job = {
            jobId: faker.string.uuid(),
            userId: faker.string.uuid(),
            title: faker.person.jobTitle(),
            amount: faker.string.numeric(6),
            description: faker.lorem.paragraph(),
            workPlaceType: faker.person.jobType(),
            companyInfo: faker.person.jobDescriptor(),
            salary: faker.string.numeric(4),
            companyLogo: faker.image.avatar(),
            isAddToCart: faker.datatype.boolean(),
        }
        jobs.push(job)
    }

    try {
        const result = await Job.insertMany(jobs);
        return {
            statusCode: 201,
            message: "database is successfuly populated",
            result
        }
    } catch (error) {
        return {
            statusCode: 409,
            message: error.message,
            error
        }
    }
}

module.exports = {
    GetAllJobs,
    GetJob,
    CreateJob,
    DeleteJob,
    PopulateJobDatabase
}