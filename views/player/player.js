var json_state;
const id_unique = generateGuid();
document.querySelector("#id-view").innerHTML = id_unique;
const hostname = window.location.hostname;
var color;

function generateGuid() {
    return 'xxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

fetch('/getWsGamePort')
    .then(response => response.json())
        .then(data => {
            console.log(data);
            createWebSocket(data.player_ws_port)
});

function createWebSocket(player_ws_port) {
    const socket = new WebSocket('ws://'+hostname+':'+ player_ws_port);

    socket.onopen = function() {
        // &#10004; icon
        console.log("Sending message:");
        document.querySelector("#connection-state").innerHTML = " Connected to central Server"
        message = {type:"connection", id:id_unique, set_heartbeat: true}
        console.log(message);
        socket.send(JSON.stringify(message))
    };

    socket.onmessage = function(event) {

        var json = JSON.parse(event.data)
        console.log("Reception of message:");
        console.log(json);
        if (json.type == "ping") {
            console.log("Sending message:");
            console.log({type:"pong"});
            socket.send(JSON.stringify({type:"pong"}))
        }
        
        if (json.type == "json_state") {
            
            json_state = json;
            const in_game = json_state.in_game;
            // &#10004; icon
            // &#x274C; icon
            document.querySelector("#authentification-state").innerHTML = in_game ? " Authentified to Gama Server" : " Unauthentified to Gama Server, please wait"
            document.querySelector("#authentification-state").style = in_game ? "color:green;" : "color:red;";
        }
        else if (json.type == "json_output") {
            const json_simulation = json;
            var position = json_simulation.contents.position
            var x = position.x;
            var y = position.y;
            document.querySelector("#x-coordinate").innerHTML = x;
            document.querySelector("#y-coordinate").innerHTML = y;

            svg.selectAll(".temp-circles").remove();

            color = "rgb("+ json_simulation.contents.color.red + ", "+ json_simulation.contents.color.green + ", "+ json_simulation.contents.color.blue + ")"
            svg.append("circle")
                .attr("cx", x*graph_size/100)
                .attr("class", "temp-circles")
                .attr("cy", y*graph_size/100)
                .attr("r", 8) // Rayon du cercle
                .style("fill", color); // Couleur de remplissage du cercle
        }
    };
    
    socket.addEventListener('close', (event) => {
        // &#x274C; icon
        document.querySelector("#connection-state").innerHTML = " The middleware is disconnected ! Please refresh this page when the server came back to work"
        document.querySelector("#connection-state").style = "color:red;font-weight: bold;"
        if (event.wasClean) {
            console.log('The WebSocket connection with Gama Server was properly be closed');
        } else {
            console.error('The Websocket connection with Gama Server interruped suddenly');
        }
        console.log(`Closure id : ${event.code}, Reason : ${event.reason}`);

    })

    socket.addEventListener('error', (error) => {
        // &#x274C; icon
        document.querySelector("#connection-state").innerHTML = " The middleware is disconnected ! Please refresh this page when the server came back to work"
        document.querySelector("#connection-state").style = "color:red;font-weight: bold;"
    });
}