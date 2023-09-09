import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


export default function BoardLayout() {
  const [allowChangeP, setAllowChangeP] = useState(1)

  const [gameMode, setGameMode] = useState(0)
  

  const [turn, setTurn] = useState(1);
  const [board, setBoard] = useState([-1, -1, -1, -1, -1, -1, -1, -1, -1]);

  const pieceHover = (piece_idx) => {
    const pieces = document.querySelectorAll(".piece");
    pieces.forEach((piece) => {
      piece.style.cursor = "default";
    });
    if (board[piece_idx] === -1) pieces[piece_idx].style.cursor = "pointer";
  };

  const setPos = (piece_idx) => {
    setAllowChangeP(0);

    const piece = document.querySelectorAll(".piece");
    const board_cpy = [...board];

    if (board_cpy[piece_idx] !== -1) return;
    board_cpy[piece_idx] = turn;
    setBoard(board_cpy);

    const iTag = document.createElement("i");
    iTag.classList.add(
      'piece-txt',
      turn === 1 ? "playerX" : "playerY",
      turn === 1 ? "fa-solid" : "fa-regular",
      turn === 1 ? "fa-xmark" : "fa-o",
      "show-up"
    );

    piece[piece_idx].appendChild(iTag);

    setTurn(1 - turn);
  };


  const resetBoard = () => {
    setBoard(
      [-1, -1, -1, -1, -1, -1, -1, -1, -1]
    )
    const board = document.querySelector('.board')
    board.classList.remove('zoomIn');
    setTimeout(() => {
      board.classList.add('zoomIn');
    }, 0);


    const pieces = document.querySelectorAll('.piece');

    // Iterate through each "par" element
    pieces.forEach(piece => {
      const childElement = piece.querySelector('.piece-txt');
      if (childElement) {
        childElement.parentNode.removeChild(childElement);
      }
    });

  }

  const changP = (piece_type) => {
    console.log(allowChangeP)
    if (!allowChangeP) return;
    alert('Work!!')
    if (piece_type !== 1) setTurn(1)


    setAllowChangeP(0)
  }



  return (
    <>
      <Row className='cont-r1'>
        <Col 
          className="wrapper wrapper1"
          xs={8}
        >
          <Navbar expand="lg">
            <Nav>
              <NavDropdown
                id="nav-dropdown-dark-example"
                title={
                  gameMode === 0 ? 
                  "Play vs Dũng's AI " : '2 Players Mode '
                }
              >
                <NavDropdown.Item 
                  // href="#action/3.1"
                  onClick={() => {
                    setGameMode((prevState)=>{
                      if (prevState !== 0) {
                        resetBoard();
                        setTurn(1);
                        setAllowChangeP(1);
                      }
                      return 0;
                    });
                  }}
                >
                  Play vs Dũng's AI 
                </NavDropdown.Item>
                <NavDropdown.Item 
                  // href="#action/3.2"
                  onClick={() => {
                    setAllowChangeP(0);
                    setGameMode((prevState)=>{
                      if (prevState !== 1) {
                        resetBoard();
                        setTurn(1)
                      }
                      return 1;
                    });
                  }}
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
                onClick={()=>changP(1)}
              >
                <div className="turn-r-c">
                  <i className="turn-r-c1 turnX fa-solid fa-xmark"></i>
                  <p className="turn-r-c2">-</p>
                </div>
              </Col>
              <Col 
                className="turn-c turn-c1"
                xs={3}
                onClick={()=>changP(0)}
              >
                <div className="turn-r-c">
                  <i className="turn-r-c1 turnY fa-regular fa-o"></i>
                  <p className="turn-r-c2">-</p>
                </div>
              </Col>
            </Row>							

          </div>
        </Col>
      </Row>
       <Row className='cont-r2'>
        <Col 
          className="wrapper wrapper2"
          xs={8}
        >
          <div className="board zoomIn">
            <div
              className="piece"
              onClick={() => {
                setPos(0);
              }}
              onMouseOver={() => {
                pieceHover(0);
              }}
            ></div>
            <div
              className="piece"
              onClick={() => {
                setPos(1);
              }}
              onMouseOver={() => {
                pieceHover(1);
              }}
            ></div>
            <div
              className="piece"
              onClick={() => {
                setPos(2);
              }}
              onMouseOver={() => {
                pieceHover(2);
              }}
            ></div>
            <div
              className="piece"
              onClick={() => {
                setPos(3);
              }}
              onMouseOver={() => {
                pieceHover(3);
              }}
            ></div>
            <div
              className="piece"
              onClick={() => {
                setPos(4);
              }}
              onMouseOver={() => {
                pieceHover(4);
              }}
            ></div>
            <div
              className="piece"
              onClick={() => {
                setPos(5);
              }}
              onMouseOver={() => {
                pieceHover(5);
              }}
            ></div>
            <div
              className="piece"
              onClick={() => {
                setPos(6);
              }}
              onMouseOver={() => {
                pieceHover(6);
              }}
            ></div>
            <div
              className="piece"
              onClick={() => {
                setPos(7);
              }}
              onMouseOver={() => {
                pieceHover(7);
              }}
            ></div>
            <div
              className="piece"
              onClick={() => {
                setPos(8);
              }}
              onMouseOver={() => {
                pieceHover(8);
              }}
            ></div>
          </div>
        </Col>
      </Row>
    </>
  )
}
