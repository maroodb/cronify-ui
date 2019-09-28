const schedule = require('node-schedule');
const {Job, JobInfo} = require('../lib');


class JobService {

    constructor() {
        this.jobs = [];
    }

    scheduleJob(name, cronexpression, callback) {

        const jobId = this.jobs.length;
        const jschedule = schedule.scheduleJob(cronexpression, () => {
            const executionDatetime = new Date().toISOString();
            if(this.jobs[jobId]) {
                this.jobs[jobId].updateLastExecution(executionDatetime);
            }
            callback();
        });

        const job = new Job(name, cronexpression, jschedule);
        job._id = jobId;
        this.jobs.push(job);
    }


    getAllJobs() {

        this.jobs.forEach(job => {
            job.nextInvocation();
        });

        return this.jobs.map(job => new JobInfo(job));
    }


    cancel(jobId) {
       const job = this.jobs.find(job => job._id === jobId);

       if(job) {
           job.cancel();
       }
    }

    reschedule(jobId, spec) {
        const job = this.jobs.find(job => job._id === jobId);

        if(job) {
            job.reschedule(spec);
        }
    }

    restart(jobId) {
        const job = this.jobs.find(job => job._id === jobId);

        if(job) {
            job.cancelNext(true);
        }
    }



}


const jobServiceInstance = new JobService();

module.exports = jobServiceInstance;