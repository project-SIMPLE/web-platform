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
            const updateButton1 = document.getElementById("update-button-1");
            updateButton1.addEventListener("click", function(event) {
                // Update JSON data with predefined values for button 1
                json_settings.model_file_path = "/Users/patricktaillandier/Documents/GitHub/gaml.extension.unity/gaml.extension.unity/models/LinkToUnity/Models/Code Examples/User Interaction.gaml";
                json_settings.experiment_name = "vr_xp";
                console.log(json_settings);
                // Display JSON data
                socket.send(JSON.stringify(json_settings))
                
                // Redirigez l'utilisateur vers la page /settings
                window.location.href = "/waiting"; 
            });

            const updateButton2 = document.getElementById("update-button-2");
            updateButton2.addEventListener("click", function(event) {
                // Update JSON data with predefined values for button 2
                json_settings.model_file_path = "/Users/patricktaillandier/Documents/GitHub/Rac-VR/RAC_GAMA/BHH-Waste/models/Experiments/UI_full_VR_Game.gaml";
                json_settings.experiment_name = "VR_GAME";
                console.log(json_settings);
                // Display JSON data
                socket.send(JSON.stringify(json_settings
                    
                ))
                // Redirigez l'utilisateur vers la page /settings
                window.location.href = "/waiting";
            });
        }
    }
}