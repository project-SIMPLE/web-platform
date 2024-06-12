const hostname = window.location.hostname;

document.addEventListener("DOMContentLoaded", function() {

    fetch('/getWsMonitorPort')
      .then(response => response.json())
      .then(data => {
        updateSpecificSettings(data.monitor_ws_port)
        console.log(data.monitor_ws_port)
      });

});

function updateSpecificSettings(monitor_ws_port) {
    const hostname = window.location.hostname;
    const socket = new WebSocket('ws://'+hostname+':'+monitor_ws_port);

    socket.onmessage = function(event){
        const json_settings = JSON.parse(event.data)
        if (json_settings.type == "json_settings") {

             // Set the placeholder attribute of the input fields to the current values
             document.getElementById("model-file-path").placeholder = json_settings.model_file_path;
             document.getElementById("experiment-name").placeholder = json_settings.experiment_name;
             
            const jsonForm = document.getElementById("json-form");
            jsonForm.addEventListener("submit", function(event) {
                event.preventDefault();

        
                // Update JSON data with user input
                json_settings.model_file_path = document.getElementById("model-file-path").value;
                json_settings.experiment_name = document.getElementById("experiment-name").value;
                console.log(json_settings);

                // Send the updated settings back to the server
                if (socket.readyState === WebSocket.OPEN) {
                    socket.send(JSON.stringify(json_settings))
                }

                // Redirect the user to the /settings page
                window.location.href = "/settings";
            });
        }
    }
}