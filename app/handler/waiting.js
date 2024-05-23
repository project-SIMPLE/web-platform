const hostname = window.location.hostname;
// const os = require('os');
// const hostname = os.hostname();



fetch('/getWsMonitorPort')
      .then(response => response.json()) 
      .then(data => {
        createWebSocket(data.monitor_ws_port)
      });