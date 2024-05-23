import React from 'react'
import Layout from '../view/layout.jsx'

export default function Main(props) {
  return <Layout>
    <h1>MIDDLEWARE </h1>

    <div style={{marginBottom: "4vh"}}/>
    <ul className='large_li'>
      <li> <a href="/monitor">Gama Remote controller</a> </li>
      <li> <a href="/player"> Player  </a> </li>
      <li> <a href="/waiting_room_of_players"> Waiting Room </a> </li>
      </ul>
  </Layout>
}
