import React, { useState, useCallback } from 'react'
import Layout from '../view/layout.jsx'
import Button from '../view/button.jsx'

const Monitor = (props) => {
  const [value, setValue] = useState(null)
  const [message, setMessage] = useState("Loading")

  const launchExperiment = useCallback(async () => {
    const res = await fetch("/api/launch", {method: 'POST'});
    const data = await res.json();
    setValue(data.value);
    setMessage(data.message);
  });

  const stopExperiment = useCallback(async () => {
    const res = await fetch("/api/stop", {method: 'POST'});
    const data = await res.json();
    setValue(data.value);
    setMessage(data.message);
  });

  const pauseExperiment = useCallback(async () => {
    const res = await fetch("/api/pause", {method: 'POST'});
    const data = await res.json();
    setValue(data.value);
    setMessage(data.message);
  });

  const resumeExperiment = useCallback(async () => {
    const res = await fetch("/api/resume", {method: 'POST'});
    const data = await res.json();
    setValue(data.value);
    setMessage(data.message);
  });

  return (
    <Layout>
      <div>
        <p>Value: {value}</p>
        <p>Message: {message}</p>
      </div>
      <div>
        <Button onClick={launchExperiment}>Launch</Button>
        <Button onClick={stopExperiment}>Stop</Button>
        <Button onClick={pauseExperiment}>Pause</Button>
        <Button onClick={resumeExperiment}>Resume</Button>
      </div>
    </Layout>
  )
}

export default Monitor