// const data = require("../data/integer_memory_store.js")
// // const MonitorServer = require("../data/monitor_server.js")
// // let controller = require('../controller.js');

// // let monitorServer = new MonitorServer();

// const Controller = require('../controller.js');
// const Model = require('../model.js'); // assuming model.js exports the Model class
// const monitor = require('../data/monitor_server.js');

// const modelInstance = new Model();
// new Controller(modelInstance);

// class Api {
//   constructor(express) {
//     this.express = express
   

//   }
//   // monitor_server = new monitor();

//   init() {
//     this.express.get("/api/get", (req, res) => {
//       res.send({  i: data.value })
//     })

//     this.express.post("/api/increment", (req, res) => {
//       data.incr()
//       res.send({ i: data.value })
//     })

 
//     this.express.get("/api/monitor", (req, res) => {
//       monitor_server.sendMonitorJsonState()
//       res.send({  })
//       console.log('Monitor JSON state sent');
//     })
//   }

  


// }

// module.exports = Api
const data = require("../data/integer_memory_store.js")
const MonitorServer = require("../data/monitor_server.js")
const Controller = require('../controller.js');
const Model = require('../model.js');

const modelInstance = new Model();
const controllerInstance = new Controller(modelInstance);
const monitorServer = new MonitorServer(controllerInstance);

class Api {
  constructor(express) {
    this.express = express
  }

  init() {
    this.express.get("/api/get", (req, res) => {
      res.send({  i: data.value })
    })

    this.express.post("/api/increment", (req, res) => {
      data.incr()
      res.send({ i: data.value })
    })

    this.express.get("/api/monitor", (req, res) => {
      monitorServer.sendMonitorJsonState();
      const state = monitorServer.controller.model.getAll();
      res.send(state);
      console.log('Monitor JSON state sent');
    });

    this.express.get("/api/monitor/settings", (req, res) => {
      monitorServer.sendMonitorJsonSettings();
      const settings = monitorServer.controller.model.getJsonSettings();
      res.send(settings);
      console.log('Monitor JSON settings sent');
    });

    this.express.post("/api/launch", (req, res) => {
      controllerInstance.launchExperiment();
      res.send({ status: 'Experiment launched' });
    });

    this.express.post("/api/stop", (req, res) => {
      controllerInstance.stopExperiment();
      res.send({ status: 'Experiment stopped' });
    });

    this.express.post("/api/pause", (req, res) => {
      controllerInstance.pauseExperiment();
      res.send({ status: 'Experiment paused' });
    });

    this.express.post("/api/resume", (req, res) => {
      controllerInstance.resumeExperiment();
      res.send({ status: 'Experiment resumed' });
    });

    

  }
}

module.exports = Api