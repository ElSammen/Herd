import React from 'react'
import Nav from "react-bootstrap/Nav";
import Sequencer from '../Sequencer/Sequencer'

 function DrumMachine() {

    

  return (

<div className="home">
<div className="navLinks">

 

<Nav variant="tabs" defaultActiveKey="/home">
  
  <div className="nav01">
    <Nav.Item>
      <Nav.Link href="/home"><h1>Herd</h1></Nav.Link>
    </Nav.Item>
  </div>

  <div className="nav01">
    <Nav.Item>
      <Nav.Link href="/home"><img className="logo" src="../images/reindeer-white.svg"></img></Nav.Link>
    </Nav.Item>
  </div>
  <div className="nav01">
    <Nav.Item>
      <Nav.Link href="/home">Music Search</Nav.Link>
    </Nav.Item>
  </div>

  <div className="nav02">
    <Nav.Item>
      <Nav.Link href="/drum">Drum Machine</Nav.Link>
    </Nav.Item>
  </div>

  <div className="nav03">
    <Nav.Item>
      <Nav.Link href="/piano">Piano</Nav.Link>
    </Nav.Item>
  </div>
</Nav>
</div>




      <div className="drumMachineWrapper">
<div className="drumMachine">
<Sequencer/>
</div>

</div>

</div>
  )
}

export default DrumMachine