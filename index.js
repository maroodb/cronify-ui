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


    }
};

const cronify = Cronify({url: '/cronitor'});

const cronex1 = '*/3 * * * *';
const cronex2 = '5 0 * 8 *';

const obj = {i: 0};

cronify.schedule('First Task', cronex1, () => {
    obj.i = Math.random()*10;
    console.log("Hello:"+JSON.stringify(obj));
});

cronify.schedule('Second Task', cronex2, () => {
    console.log("Hellolalala");
});