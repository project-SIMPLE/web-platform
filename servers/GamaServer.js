const WebSocket = require('ws');

const ws = new WebSocket("ws://localhost:8085");
ws.addEventListener("open", () =>{
  console.log("We are connected");
  ws.send("How are you?");
});
ws.addEventListener('message', function (event) {
//     console.log(event.data);
 
 // I want to parse event data and print it in a table
 let gama_message = JSON.parse(event.data);

 if(gama_message.type === "ConnectionSuccessful"){
    // \x1b[32m%s\x1b[0mm -> Green color
    console.info('\x1b[32m%s\x1b[0m',"<------ Connected Successfully to Gama ------>");
 }
   //  console.table(gama_message.type);
   //  console.table(gama_message.content);
   //  console.table(gama_message.message.exp_id);

    // Send instructions to Gama according to the following structure : {"type":"SimulationStatus","content":"RUNNING","exp_id":"0"}
    
    
    if(gama_message.type === "SimulationStatus" && gama_message.content === "NONE"){
      ws.send('{"type":"SimulationStatus","content":"NOTREADY","exp_id":"0"}');
      console.info('\x1b[35m%s\x1b[0m',"<------ Simulation is Launched  ------>");

   }
    
    function pauseSimulation(){
      if(gama_message.type === "SimulationStatus" && gama_message.content === "RUNNING"){
         ws.send('{"type":"SimulationStatus","content":"PAUSED","exp_id":"0"}');
         console.info('\x1b[35m%s\x1b[0m',"<------ Simulation is on PAUSE ------>");
  
      }
  
    }

    function playSimulation(){
      if(gama_message.type === "SimulationStatus" && gama_message.content === "PAUSED"){
         ws.send('{"type":"SimulationStatus","content":"RUNNING","exp_id":"0"}');
         console.info('\x1b[33m%s\x1b[0m',"<------ Simulation is on RUNNING ------>");

      }
  
    }
    
      function stopSimulation(){
         if(gama_message.type === "SimulationStatus" || gama_message.content === "PAUSED" || gama_message.content === "RUNNING"){
             ws.send('{"type":"SimulationStatus","content":"NONE","exp_id":"0"}');
             console.info('\x1b[31m%s\x1b[0m',"<------ Simulation is on STOPPED ------>");
   
         }
   
         }

      function launchSimulation(){
         if(gama_message.type === "SimulationStatus" && gama_message.content === "NONE"){
             ws.send('{"type":"SimulationStatus","content":"NOTREADY","exp_id":"0"}');
             console.info('\x1b[34m%s\x1b[0m',"<------ Launching the simulation ------>");

         }
   
         }

});

// we will send a json object
