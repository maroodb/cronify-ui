const path = require('path');


const Cronify = (props) => {

    const JobService = require('./src/services/JobService');
    if(!props) {
        props = {};
    }

    const cronUrl = props.url || '/cron';
    if(props.httpServer) {


    } else {

        const express = require('express');
        const bodyParser = require('body-parser');
        const cors = require('cors');
        const http = require('http');
        const app = express();
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.set('views', path.join(__dirname, 'src/views'));
        app.set('view engine', 'ejs');
        app.engine('html', require('ejs').renderFile);
        const port = props.port || 9090;
        app.use(cronUrl, require('./src/routes'));


        const Server = http.Server(app);


        Server.listen(port, () => {

            console.log(`start bct-api on port: ${Server.address().port}`);

        });

    }



    return {

        schedule: (name, cronex, callback) => {
            JobService.scheduleJob(name, cronex, callback);
        },

        cancel: (jobId) => {
            JobService.cancel(jobId);
        },

        cancelNext: (jobId) => {
            JobService.cancel(jobId);
        },

        reschedule: (jobId, spec) => {

        },

        restart: (jobId) => {
            JobService.restart(jobId)
        }




    }
};

const cronify = Cronify({url: '/cronitor'});

const cronex1 = '*/1 * * * *';
const cronex2 = '5 0 * 8 *';

const obj = {i: 0};

cronify.schedule('First Task', cronex1, () => {
    obj.i = Math.random()*10;
    console.log(`VALUE: ${new Date().toISOString()}`);
});

cronify.schedule('Second Task', cronex2, () => {
    console.log("Hellolalala");
});

setTimeout(() => {cronify.cancel(0);
console.log(`CANCEL: ${new Date().toISOString()}`)}, 1000 * 60 *2);

setTimeout(() => {cronify.restart(0);
    console.log(`RESTART: ${new Date().toISOString()}`)}, 1000 * 60 *3 );
