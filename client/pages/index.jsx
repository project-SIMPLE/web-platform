// import React, { useEffect, useState } from "react";

// export default function Index() {
//   const [message, setMessage] = useState("Loading");
//   const [people, setPeople] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:8080/api/home")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setMessage(data.message); // set message to the response from the server
  //       setPeople(data.people); // set people to the response from the server
  //     });
  // }, []);


  // useEffect(() => {
  //   fetch("http://localhost:8080/api/monitor")
  //     .then((res) => res.json())
      
  // }, []);

  // return (
  //   <div>
  //     <div>{message}</div>

  //     {people.map((person, index) => (
  //       <div key={index}>{person}</div>
  //     ))}
  //   </div>
  // );

  import React, { useEffect, useState } from "react";
import io from "socket.io-client";

let socket = io();

const Home = () => {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  useEffect(() => {
    socketInitializer();

    return () => {
      socket.disconnect();
    };
  }, []);

  async function socketInitializer() {
    await fetch("/api/socket");

    socket = io();

    socket.on("receive-message", (data) => {
      setAllMessages((pre) => [...pre, data]);
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    console.log("emitted");

    socket.emit("send-message", {
      username,
      message
    });
    setMessage("");
  }

  return (
    <div>
      <h1>Chat app</h1>
      <h1>Enter a username</h1>

            
      <input className="border border-red-500"  value={username} onChange={(e) => setUsername(e.target.value)} />

      <br />
      <br />

      <div>
        {allMessages.map(({ username, message }, index) => (
          <div key={index}>
            {username}: {message}
          </div>
        ))}

        <br />

        <form onSubmit={handleSubmit}>
          <input
            name="message"
            placeholder="enter your message"
            className="border border-black"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            autoComplete={"off"}
          />
        </form>
      </div>
    </div>
  );
};

export default Home;


