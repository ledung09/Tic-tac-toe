import { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

export default function SubboardTop() {
  const [gameMode, setGameMode] = useState(-1)

  return (
    <>
      <Navbar expand="lg">
          <Nav>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title={
                gameMode === -1 ? 'Select gamemode' :
                gameMode === 0 ? 'Play vs AI' : '2 Players Mode'
              }
            >
              <NavDropdown.Item 
                href="#action/3.1"
                onClick={() => {setGameMode(0)}}
              >
                Play vs AI 
              </NavDropdown.Item>
              <NavDropdown.Item 
                href="#action/3.2"
                onClick={() => {setGameMode(1)}}
              >
                2 Players Mode                                                    
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
      </Navbar>


      <div className="player-turn">
        <Row className='turn-r'>
          <Col 
            className="turn-c turn-c1"
            xs={3}
          >
            <div className="turn-r-c">
              <i className="turn-r-c1 turnX fa-solid fa-xmark"></i>
              <p className="turn-r-c2">-</p>
            </div>
          </Col>
          <Col 
            className="turn-c turn-c1"
            xs={3}
          >
            <div className="turn-r-c">
              <i class="turn-r-c1 turnY fa-regular fa-o"></i>
              <p className="turn-r-c2">1</p>
            </div>
          </Col>
        </Row>							

      </div>
    </>
  )
}
