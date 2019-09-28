# cronify-ui

Cronify UI is a simple tool allows you to monitor
your cron-job tasks using a simple UI, you can also cancel, restart 
cron-job by single clicks
## Usage

### Installation
You can install using npm.<br/>

```
npm install cronify-ui
```


### Overview

Cronify UI is based on node-schedule module, that allows
You define cron-like and not-cron-like job scheduler for Node.js
In cronify UI actually only standard cron expression is supported.

Cronify UI will use an express instance to serve UI dashboard,
If no instance is given at module importing cronify UI will create a default 
http Server instance.
### Example

```

var cronifyUi = require('cronify-ui')();

cronifyUi.schedule('my Task', '*/1 * * * *', () => {
   console.log('Hello Cronify! This is will be executed every minute.');
});

```

#### Custom definition 


```

var cronifyUi = require('cronify-ui')({
 url: 'my-crons',
 port: 8080,
 httpServer: app
});

cronifyUi.schedule('my Task', '*/1 * * * *', () => {
   console.log('Hello Cronify! This is will be executed every minute.');
});

```

