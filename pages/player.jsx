import React, { useState, useEffect } from 'react'
import Layout from '../view/layout.jsx'
import Button from '../view/button.jsx'

const Monitor = (props) => {
  const [players, setPlayers] = useState({});

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');

    socket.onopen = () => {
      console.log('WebSocket is open now.');
    };

    socket.onerror = (event) => {
      console.error('WebSocket error observed:', event);
    };

    socket.onclose = () => {
      console.log('WebSocket is closed now.');
    };

    // socket.onmessage = (event) => {
    //   console.log('Received data:');
    //   const data = JSON.parse(event.data);
    //   if (data.type === 'json_state') {
    //     setPlayers(data.player);
    //   }
    // };

    // In player.jsx
socket.onmessage = (event) => {
  try {
    console.log('Received data:');
    const data = JSON.parse(event.data);
    console.log(`Received message for player ${data.id_player}: ${JSON.stringify(data)}`);
    if (data.type === 'json_state') {
      setPlayers(data.player);
    }
  } catch (error) {
    console.error('Error in message event handler:', error);
  }
};

    return () => {
      socket.close();
    };
  }, []);

  return (
    <Layout>
      <h2>PLAYER CONNECTION</h2>
      {Object.entries(players).map(([id, player]) => (
        <div key={id}>
          <h3>Player ID: {id}</h3>
          <p>Status: {player.in_game ? 'In game' : 'Not in game'}</p>
          <p>Connected: {player.connected ? 'Yes' : 'No'}</p>
          <p>Last connection at: {player.date_connection}</p>
        </div>
      ))}
    </Layout>
  )
}

export default Monitor