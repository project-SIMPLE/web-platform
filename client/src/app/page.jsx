"use client"
import React from "react";
import { useState,  useEffect} from "react";
import {
  Navbar,
  NavbarBrand,
  UncontrolledTooltip
} from 'reactstrap';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { DefaultEditor } from 'react-simple-wysiwyg';
import Avatar from 'react-avatar';
import PlayerServer from './api/route';

// fecthing the data from the server
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(url);
      const data = await response.json();
      const [latest] = data;
      setData(latest);
      setLoading(false);
    }
    fetchData();
  }, [url]);

  return { data, loading }; 
};

const App = () => {
return (
  <div>
    <h2>INDEX PAGE</h2>
  </div>
)
}

export default App;
