import './gameboard/board.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


function App() {
  return (
    <div className="container">
      <Row className='cont-r1'>
        <Col 
          className="wrapper wrapper1"
          xs={8}
        >
          <Navbar expand="lg">
            <Navbar.Collapse id="navbar-dark-example">
              <Nav>
                <NavDropdown
                  id="nav-dropdown-dark-example"
                  title="Select play mode "
                >
                  <NavDropdown.Item href="#action/3.1">Play vs AI</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">2 Player Mode</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

        </Col>
      </Row>
       <Row className='cont-r2'>
        <Col 
          className="wrapper wrapper2"
          xs={8}
        ></Col>
      </Row>
    </div>
  );
}

export default App;
