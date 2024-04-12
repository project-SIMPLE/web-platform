import React, { useEffect, useState } from "react";

export default function Index() {
  const [message, setMessage] = useState("Loading");
  const [people, setPeople] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/home")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMessage(data.message); // set message to the response from the server
        setPeople(data.people); // set people to the response from the server
      });
  }, []);

  return (
    <div>
      <div>{message}</div>

      {people.map((person, index) => (
        <div key={index}>{person}</div>
      ))}
    </div>
  );
}
