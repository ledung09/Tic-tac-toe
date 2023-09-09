import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { CheckWin } from "../solver/CheckWin";

export default function BoardLayout() {
  const [gameTurn, setGameTurn] = useState(1)

  const [allowChangeP, setAllowChangeP] = useState(1);
  const [gameStop, setGameStop] = useState(false);

  const [gameMode, setGameMode] = useState(0);

  const [turn, setTurn] = useState(-2);
  const [board, setBoard] = useState([-1, -1, -1, -1, -1, -1, -1, -1, -1]);

  const [score, setScore] = useState([0,0]);

  const pieceHover = (piece_idx) => {
    if (gameStop) return;

    const pieces = document.querySelectorAll(".piece");
    pieces.forEach((piece) => {
      piece.style.cursor = "default";
    });
    if (board[piece_idx] === -1) pieces[piece_idx].style.cursor = "pointer";
  };

  const setPos = (piece_idx) => {
    let turn_cpy;
    if (turn === -2) turn_cpy = 1; else turn_cpy = turn;
    if (gameStop) return;
    setAllowChangeP(0);

    const piece = document.querySelectorAll(".piece");
    const board_cpy = [...board];

    if (board_cpy[piece_idx] !== -1) return;
    board_cpy[piece_idx] = turn_cpy;
    setBoard(board_cpy);

    const iTag = document.createElement("i");
    iTag.classList.add(
      "piece-txt",
      turn_cpy === 1 ? "playerX" : "playerY",
      turn_cpy === 1 ? "fa-solid" : "fa-regular",
      turn_cpy === 1 ? "fa-xmark" : "fa-o",
      "show-up"
    );
    piece[piece_idx].appendChild(iTag);


    const turnCs = document.querySelectorAll('.turn-c')
    turnCs.forEach((turnC) => {
      turnC.style.border = '1px solid #DADCE0'
      turnC.style.boxShadow = 'none'
    })

    turnCs[turn_cpy].style.borderBottom = '2px solid #14bdac'
    turnCs[turn_cpy].style.boxShadow = '2px 2px 6px 2px rgba(0,0,0,0.1)'

    setTurn(1 - turn_cpy);


    if (
      CheckWin(board_cpy)[0] === 0 ||
      CheckWin(board_cpy)[0] === 1 ||
      CheckWin(board_cpy)[0] === 2
    ) {
      setGameStop(true);
      setTurn(-1)
      annouWinner(CheckWin(board_cpy));
    }

    // Evaluate board_cpy here!!
    // May be try delay to check
  };

  const resetBoard = (resetTurn) => {
    const turnCs = document.querySelectorAll('.turn-c')
    turnCs.forEach((turnC) => {
      turnC.style.border = '1px solid #DADCE0'
      turnC.style.boxShadow = 'none'
    })

    if (resetTurn) {
      setGameTurn(1-gameTurn)
      setTurn(1-gameTurn) 
      turnCs[gameTurn].style.borderBottom = '2px solid #14bdac'
      turnCs[gameTurn].style.boxShadow = '2px 2px 6px 2px rgba(0,0,0,0.1)'
    } else {
      setScore([0, 0])
      turnCs[0].style.borderBottom = '2px solid #14bdac'
      turnCs[0].style.boxShadow = '2px 2px 6px 2px rgba(0,0,0,0.1)' 
    }

    setGameStop(false);
    setBoard([-1, -1, -1, -1, -1, -1, -1, -1, -1]);
    const board = document.querySelector(".board");
    const winnerAnns = document.querySelectorAll('.winnerAnn')


    winnerAnns.forEach((anna) => {
      anna.style.display = 'none'
    })

    board.style.display = 'grid' 
    board.style.animation = 'none'

    board.classList.remove("zoomIn");
    setTimeout(() => {
      board.classList.add("zoomIn");
    }, 1000);

    const pieces = document.querySelectorAll(".piece");

    // Iterate through each "par" element
    pieces.forEach((piece) => {
      const childElement = piece.querySelector(".piece-txt");
      if (childElement) {
        childElement.parentNode.removeChild(childElement);
      }
    });

    if (gameMode === 0) {
      setTurn(-2)
      const turnCs = document.querySelectorAll('.turn-c')
      turnCs.forEach((turnC) => {
        turnC.style.border = '1px solid #DADCE0'
        turnC.style.boxShadow = 'none'
      })
      turnCs[0].style.borderBottom = '2px solid #14bdac'
      turnCs[0].style.boxShadow = '2px 2px 6px 2px rgba(0,0,0,0.1)'
      setAllowChangeP(1)
    }
  };

  const changP = (piece_type) => {
    if (!allowChangeP) return;
    // alert("Work!!");
    setTurn(piece_type)
    if (piece_type === 0) {
      const turnCs = document.querySelectorAll('.turn-c')
      turnCs.forEach((turnC) => {
        turnC.style.border = '1px solid #DADCE0'
        turnC.style.boxShadow = 'none'
      })
      turnCs[1].style.borderBottom = '2px solid #14bdac'
      turnCs[1].style.boxShadow = '2px 2px 6px 2px rgba(0,0,0,0.1)'
    }

    setAllowChangeP(0);
  };

  const annouWinner = (info) => {
    // 0 - 1 - 2 (Draw)
    const validMove = ["r1", "r2", "r3", "c1", "c2", "c3", "d1", "d2"];
    const [piece_type, move] = info;

    const board = document.querySelector(".board");
    const winAnnounce = document.querySelectorAll(".winnerAnn");

    let moveID = validMove.indexOf(move);
    let winMove;
    let delay;

    if (piece_type === 2) delay = 600; else delay = 1200;

    
    if (piece_type === 0 || piece_type === 1) {
      winMove = document.querySelectorAll(".winMove")[moveID];

      if (piece_type === 0) winMove.style.backgroundColor = '#F2EBD3'
      else winMove.style.backgroundColor = '#545454';

      setTimeout(() => {
        winMove.style.display = "block";
        winMove.classList.add(`s-${move}`);
      }, 0);
  
      winMove.classList.add("fadeOut");
    }


    setTimeout(() => {
      board.classList.add('fadeOut')
      if (moveID !== -1) winMove.style.display = 'none'
      board.style.display = "none"
      winAnnounce[piece_type].style.display = 'flex'
    }, delay);

    setTimeout(() => {
      if (piece_type === 0 || piece_type === 1) {
        winMove.classList.remove(`s-${move}`);
        winMove.classList.remove("fadeOut");
      }
      board.classList.remove('fadeOut')
    }, 100);

   

    if (piece_type === 0 || piece_type === 1 ) {
      let scr_cpy = [...score];
      scr_cpy[piece_type]++;
      setScore(scr_cpy)
    }
  };

  return (
    <>
      <Row className="cont-r1">
        <Col className="wrapper wrapper1" xs={8}>
          <Navbar expand="lg">
            <Nav>
              <NavDropdown
                id="nav-dropdown-dark-example"
                title={
                  gameMode === 0 ? "Play vs Dũng's AI " : "2 Players Mode "
                }
              >
                <NavDropdown.Item
                  // href="#action/3.1"
                  onClick={() => {
                    setGameMode((prevState) => {
                      if (prevState !== 0) {
                        resetBoard(false);
                        setTurn(-2);
                        setAllowChangeP(1);
                        setScore([0,0])
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
                    setGameMode((prevState) => {
                      if (prevState !== 1) {
                        setScore([0,0])
                        resetBoard(false);
                        setTurn(1);
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
            <Row className="turn-r">
              <Col className="turn-c turn-c1" xs={3} onClick={() => changP(1)}>
                <div className="turn-r-c">
                  <i className="turn-r-c1 turnX fa-solid fa-xmark"></i>
                  <p className="turn-r-c2">
                    {
                      score[1] === 0 ? '-' : score[1] 
                    }
                  </p>
                </div>
              </Col>
              <Col className="turn-c turn-c2" xs={3} onClick={() => changP(0)}>
                <div className="turn-r-c">
                  <i className="turn-r-c1 turnY fa-regular fa-o"></i>
                  <p className="turn-r-c2">
                      {
                        score[0] === 0 ? '-' : score[0] 
                      }
                  </p>
                </div>
              </Col>
            </Row>
          </div>

          <div className="turn-display">
            {turn === 0 && <i className="fa-regular fa-o o-turn"></i>}
            {turn === 1 && <i className="fa-solid fa-xmark x-turn"></i> }
          
            
            {
              turn === -1 ? <p className="turn-txt">Game Over</p>:
              turn >= 0 ? <p className="turn-txt">Turn</p> :
              <p className="turn-txt">Start game or select player</p>             
              // Turn = -2 -> mode 0
            }
          </div>


        </Col>
      </Row>
      <Row className="cont-r2">
        <Col className="wrapper wrapper2" xs={8}>
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

          <div className="winMove show-r show-rc1"></div>
          <div className="winMove show-r show-rc2"></div>
          <div className="winMove show-r show-rc3"></div>
          <div className="winMove show-c show-rc1"></div>
          <div className="winMove show-c show-rc2"></div>
          <div className="winMove show-c show-rc3"></div>
          <div className="winMove show-d show-d1 show-rc2"></div>
          <div className="winMove show-d show-d2 show-rc2"></div>




          <div className="winnerAnn" onClick={() => resetBoard(true)}>
            <i className="Ywin-icon fa-regular fa-o"></i>
            <p className="win-txt">WINNER!</p>
          </div>

          <div className="winnerAnn" onClick={() => resetBoard(true)}>
            <i className="Xwin-icon fa-solid fa-xmark"></i>
            <p className="win-txt">WINNER!</p>
          </div>

          <div className="winnerAnn" onClick={() => resetBoard(true)}>
            <div className="winnerDraw-r1">
              <i className="Xwin-icon fa-solid fa-xmark"></i>
              <i className="Ywin-icon fa-regular fa-o"></i>
            </div>
            <p className="win-txt">DRAW!</p>
          </div>
        </Col>
      </Row>
    </>
  );
}
