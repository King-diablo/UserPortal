const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    jobId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    workPlaceType: {
        type: String,
        required: true,
    },
    companyInfo: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    companyLogo: {
        type: String,
        required: true,
    },
    isAddToCart: {
        type: String,
    }
});


const Job = new mongoose.model("job", jobSchema);

module.exports = Job;