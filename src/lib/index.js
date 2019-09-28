const parser = require('cron-parser');
const cronstrue = require('cronstrue');



exports.Job = class Job {

    constructor(name, cronexpression, jschedule){
        this._id = null;
        this.status = 1; // 1: actif, 2: canceled,
        this.name = name;
        this.cronexpression = cronexpression;
        this.jschedule = jschedule;
        this.lastExecution = null;
        this.cronreadable = cronstrue.toString(cronexpression);
        this.nextexecution = null;

    }


    nextInvocation(){
        this.nextexecution = this.jschedule.nextInvocation();
        if (this.nextexecution) {
            this.nextexecution = this.nextexecution.toString();
        }
    }

    updateLastExecution(date) {
        this.lastExecution = date;
        this.status = 1;
    }

    cancel(reschedule) {
        this.status = 2;
        const _reschedule = reschedule || false;
        this.jschedule.cancel(_reschedule);
    }

    cancelNext(reschedule) {
        this.jschedule.cancelNext(reschedule);
    }



    //todo implement reschedule process for edit
    reschedule(spec) {
        this.status = 1;
         return this.jschedule.reschedule(spec);
    }


};

exports.JobInfo = class JobInfo {

    constructor(props) {
        this._id = props._id;
        this.name = props.name;
        this.cronexpression = props.cronexpression;
        this.cronreadable = props.cronreadable;
        this.nextexecution = props.nextexecution;
        this.lastExecution = props.lastExecution;
        this.status = props.status;

        if(this.lastExecution) {
            const time = Date.now() - new Date(this.lastExecution);
            const time_s = time / 1000;
            if(time_s < 60) {
                this.lastExecution = Math.floor(time_s)+ ' Seconds ago';
            } else {
                const time_m = time_s/60;
                if(time_m < 60) {

                    this.lastExecution = Math.floor(time_m)+ ' Minutes ago';
                } else {
                    const time_h = time_m/60;

                    if(time_h < 24) {
                        this.lastExecution = Math.floor(time_h)+ ' Hours ago';
                    } else {
                        const time_d = time_h/24;

                        this.lastExecution = Math.floor(time_d)+ ' Days ago';
                    }
                }
            }

        } else {
            this.lastExecution = 'Never';
        }
    }

};