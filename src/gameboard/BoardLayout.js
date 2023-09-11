import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { CheckWin } from "../solver/CheckWin";
import { bestMove } from "../solver/Bot";

export default function BoardLayout() {
  const [gameTurn, setGameTurn] = useState(1);
  const [allowChangeP, setAllowChangeP] = useState(1);
  const [gameStop, setGameStop] = useState(false);
  const [gameMode, setGameMode] = useState(0);
  const [game1Mode, setGame1Mode] = useState(0);
  const [turn, setTurn] = useState(-2);
  const [board, setBoard] = useState([-1, -1, -1, -1, -1, -1, -1, -1, -1]);
  const [score, setScore] = useState([0, 0]);

  const pieceHover = (piece_idx) => {
    if (gameStop) return;

    const pieces = document.querySelectorAll(".piece");
    pieces.forEach((piece) => {
      piece.style.cursor = "default";
    });
    if (board[piece_idx] === -1) pieces[piece_idx].style.cursor = "pointer";
  };

  const setPos = (piece_idx) => {
    const xMark = document.querySelector("#turn-X-dis");
    const yMark = document.querySelector("#turn-Y-dis");
    const piece = document.querySelectorAll(".piece");
    let turn_cpy;

    if (turn === -2) turn_cpy = 1;
    else turn_cpy = turn;
    if (gameStop) return;

    setAllowChangeP(0);

    const board_cpy = [...board];
    if (board_cpy[piece_idx] !== -1) return;
    board_cpy[piece_idx] = turn_cpy;

    const iTag = document.createElement("i");
    iTag.classList.add(
      "piece-txt",
      turn_cpy === 1 ? "playerX" : "playerY",
      turn_cpy === 1 ? "fa-solid" : "fa-regular",
      turn_cpy === 1 ? "fa-xmark" : "fa-o",
      "show-up"
    );
    piece[piece_idx].appendChild(iTag);

    const turnCs = document.querySelectorAll(".turn-c");
    turnCs.forEach((turnC) => {
      turnC.style.border = "1px solid #DADCE0";
      turnC.style.boxShadow = "none";
    });
    turnCs[turn_cpy].style.borderBottom = "2px solid #14bdac";
    turnCs[turn_cpy].style.boxShadow = "2px 2px 6px 2px rgba(0,0,0,0.1)";

    if (turn_cpy === 0) {
      xMark.style.display = "block";
      yMark.style.display = "none";
    } else {
      xMark.style.display = "none";
      yMark.style.display = "block";
    }

    // check if gamemode == 0?

    if (gameMode === 0) {
      turn_cpy = 1 - turn_cpy;
      let bot_move = bestMove(board_cpy, game1Mode);

      if (bot_move === -1) {
        if (
          CheckWin(board_cpy)[0] === 0 ||
          CheckWin(board_cpy)[0] === 1 ||
          CheckWin(board_cpy)[0] === 2
        ) {
          setGameStop(true);
          xMark.style.display = "none";
          yMark.style.display = "none";
          setTurn(-1);
          annouWinner(CheckWin(board_cpy));
        }
      }

      if (board_cpy[bot_move] !== -1) return;
      board_cpy[bot_move] = turn_cpy;

      const bot_iTag = document.createElement("i");
      bot_iTag.classList.add(
        "piece-txt",
        turn_cpy === 1 ? "playerX" : "playerY",
        turn_cpy === 1 ? "fa-solid" : "fa-regular",
        turn_cpy === 1 ? "fa-xmark" : "fa-o",
        "show-up"
      );

      setTimeout(() => {
        if (game1Mode === 0) {
          xMark.style.display = "none";
          yMark.style.display = "block";
        } else {
          xMark.style.display = "block";
          yMark.style.display = "none";
        }

        turnCs.forEach((turnC) => {
          turnC.style.border = "1px solid #DADCE0";
          turnC.style.boxShadow = "none";
        });
        turnCs[1 - game1Mode].style.borderBottom = "2px solid #14bdac";
        turnCs[1 - game1Mode].style.boxShadow =
          "2px 2px 6px 2px rgba(0,0,0,0.1)";
      }, 150);

      setTimeout(() => {
        piece[bot_move].appendChild(bot_iTag);
      }, 400); // 1 piece write time

      setTimeout(() => {
        if (game1Mode === 0) {
          yMark.style.display = "none";
          xMark.style.display = "block";
        } else {
          yMark.style.display = "block";
          xMark.style.display = "none";
        }

        if (
          CheckWin(board_cpy)[0] === 0 ||
          CheckWin(board_cpy)[0] === 1 ||
          CheckWin(board_cpy)[0] === 2
        ) {
          xMark.style.display = "none";
          yMark.style.display = "none";
        } else {
          turnCs.forEach((turnC) => {
            turnC.style.border = "1px solid #DADCE0";
            turnC.style.boxShadow = "none";
          });
          turnCs[game1Mode].style.borderBottom = "2px solid #14bdac";
          turnCs[game1Mode].style.boxShadow = "2px 2px 6px 2px rgba(0,0,0,0.1)";
        }
      }, 700); //Green bar trans time
    }

    setBoard(board_cpy);
    setTurn(1 - turn_cpy);

    let time;
    if (gameMode === 1) time = 0;
    else time = 700;
    setTimeout(() => {
      if (
        CheckWin(board_cpy)[0] === 0 ||
        CheckWin(board_cpy)[0] === 1 ||
        CheckWin(board_cpy)[0] === 2
      ) {
        setGameStop(true);
        xMark.style.display = "none";
        yMark.style.display = "none";
        setTurn(-1);
        annouWinner(CheckWin(board_cpy));
      }
    }, time);
  };

  const resetBoard = (resetTurn) => {
    setGame1Mode(0);
    const xMark = document.querySelector("#turn-X-dis");
    const yMark = document.querySelector("#turn-Y-dis");
    const turnCs = document.querySelectorAll(".turn-c");

    turnCs.forEach((turnC) => {
      turnC.style.border = "1px solid #DADCE0";
      turnC.style.boxShadow = "none";
    });

    if (resetTurn) {
      setGameTurn(1 - gameTurn);
      setTurn(1 - gameTurn);
      if (gameTurn === 0) {
        xMark.style.display = "block";
        yMark.style.display = "none";
      } else {
        xMark.style.display = "none";
        yMark.style.display = "block";
      }
      turnCs[gameTurn].style.borderBottom = "2px solid #14bdac";
      turnCs[gameTurn].style.boxShadow = "2px 2px 6px 2px rgba(0,0,0,0.1)";
    } else {
      setScore([0, 0]);
      turnCs[0].style.borderBottom = "2px solid #14bdac";
      turnCs[0].style.boxShadow = "2px 2px 6px 2px rgba(0,0,0,0.1)";
    }

    if (gameMode === 0) {
      xMark.style.display = "none";
      yMark.style.display = "none";
    }

    setGameStop(false);
    setBoard([-1, -1, -1, -1, -1, -1, -1, -1, -1]);
    const board = document.querySelector(".board");
    const winnerAnns = document.querySelectorAll(".winnerAnn");

    winnerAnns.forEach((anna) => {
      anna.style.display = "none";
    });

    board.style.display = "grid";
    board.style.animation = "none";

    board.classList.remove("zoomIn");
    setTimeout(() => {
      board.classList.add("zoomIn");
    }, 1000);

    const pieces = document.querySelectorAll(".piece");
    pieces.forEach((piece) => {
      const childElement = piece.querySelector(".piece-txt");
      if (childElement) {
        childElement.parentNode.removeChild(childElement);
      }
    });

    if (gameMode === 0) {
      setTurn(-2);
      const turnCs = document.querySelectorAll(".turn-c");
      turnCs.forEach((turnC) => {
        turnC.style.border = "1px solid #DADCE0";
        turnC.style.boxShadow = "none";
      });
      turnCs[0].style.borderBottom = "2px solid #14bdac";
      turnCs[0].style.boxShadow = "2px 2px 6px 2px rgba(0,0,0,0.1)";
      setAllowChangeP(1);
    }
  };

  const changP = (piece_type) => {
    const xMark = document.querySelector("#turn-X-dis");
    const yMark = document.querySelector("#turn-Y-dis");
    const piece = document.querySelectorAll(".piece");
    const turnCs = document.querySelectorAll(".turn-c");

    if (!allowChangeP) return;
    setTurn(piece_type);
    setGame1Mode(1 - piece_type);

    if (piece_type === 0) {
      // Random firstmove HERE!
      document.querySelector(".turn-txt").style.opacity = 0;
      let randMove = Math.floor(Math.random() * 9);
      const board_cpy = [...board];
      board_cpy[randMove] = 1;
      setBoard(board_cpy);

      const rand_iTag = document.createElement("i");
      rand_iTag.classList.add(
        "piece-txt",
        "playerX",
        "fa-solid",
        "fa-xmark",
        "show-up"
      );

      setTimeout(() => {
        document.querySelector(".turn-txt").style.opacity = 1;
        xMark.style.display = "block";
        yMark.style.display = "none";

        turnCs.forEach((turnC) => {
          turnC.style.border = "1px solid #DADCE0";
          turnC.style.boxShadow = "none";
        });
        turnCs[0].style.borderBottom = "2px solid #14bdac";
        turnCs[0].style.boxShadow = "2px 2px 6px 2px rgba(0,0,0,0.1)";
      }, 50);

      setTimeout(() => {
        piece[randMove].appendChild(rand_iTag);
      }, 600);

      setTimeout(() => {
        yMark.style.display = "block";
        xMark.style.display = "none";
        if (
          CheckWin(board_cpy)[0] === 0 ||
          CheckWin(board_cpy)[0] === 1 ||
          CheckWin(board_cpy)[0] === 2
        ) {
          xMark.style.display = "none";
          yMark.style.display = "none";
        }
        turnCs.forEach((turnC) => {
          turnC.style.border = "1px solid #DADCE0";
          turnC.style.boxShadow = "none";
        });
        turnCs[1].style.borderBottom = "2px solid #14bdac";
        turnCs[1].style.boxShadow = "2px 2px 6px 2px rgba(0,0,0,0.1)";
      }, 1100);
    } else {
      xMark.style.display = "block";
      yMark.style.display = "none";
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

    if (piece_type === 2) delay = 700;
    else delay = 800;

    if (piece_type === 0 || piece_type === 1) {
      winMove = document.querySelectorAll(".winMove")[moveID];

      if (piece_type === 0) winMove.style.backgroundColor = "#F2EBD3";
      else winMove.style.backgroundColor = "#545454";

      setTimeout(() => {
        winMove.style.display = "block";
        winMove.classList.add(`s-${move}`);
      }, 0);

      winMove.classList.add("fadeOut");
    }

    setTimeout(() => {
      board.classList.add("fadeOut");
      if (moveID !== -1) winMove.style.display = "none";
      board.style.display = "none";
      winAnnounce[piece_type].style.display = "flex";
    }, delay);

    setTimeout(() => {
      if (piece_type === 0 || piece_type === 1) {
        winMove.classList.remove(`s-${move}`);
        winMove.classList.remove("fadeOut");
      }
      board.classList.remove("fadeOut");
    }, 100);

    if (piece_type === 0 || piece_type === 1) {
      let scr_cpy = [...score];
      scr_cpy[piece_type]++;
      setScore(scr_cpy);
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
                        setScore([0, 0]);
                        const xMark = document.querySelector("#turn-X-dis");
                        xMark.style.display = "none";
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
                        setScore([0, 0]);
                        resetBoard(false);
                        setTurn(1);
                        document.querySelector("#turn-X-dis").style.display =
                          "block";
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
                  <p className="turn-r-c2">{score[1] === 0 ? "-" : score[1]}</p>
                </div>
              </Col>
              <Col className="turn-c turn-c2" xs={3} onClick={() => changP(0)}>
                <div className="turn-r-c">
                  <i className="turn-r-c1 turnY fa-regular fa-o"></i>
                  <p className="turn-r-c2">{score[0] === 0 ? "-" : score[0]}</p>
                </div>
              </Col>
            </Row>
          </div>

          <div className="turn-display">
            <i id="turn-X-dis" className="fa-solid fa-xmark x-turn"></i>
            <i id="turn-Y-dis" className="fa-regular fa-o o-turn"></i>
            {turn === -1 ? (
              <p className="turn-txt">Game Over</p>
            ) : turn >= 0 ? (
              <p className="turn-txt">Turn</p>
            ) : (
              <p className="turn-txt">Start game or select player</p>
            )}
          </div>
        </Col>
      </Row>
      <Row className="cont-r2">
        <Col className="wrapper wrapper2" xs={8}>
          <div className="board zoomIn">
            <div
              className="piece"
              onClick={() => setPos(0)}
              onMouseOver={() => pieceHover(0)}
            ></div>
            <div
              className="piece"
              onClick={() => setPos(1)}
              onMouseOver={() => pieceHover(1)}
            ></div>
            <div
              className="piece"
              onClick={() => setPos(2)}
              onMouseOver={() => pieceHover(2)}
            ></div>
            <div
              className="piece"
              onClick={() => setPos(3)}
              onMouseOver={() => pieceHover(3)}
            ></div>
            <div
              className="piece"
              onClick={() => setPos(4)}
              onMouseOver={() => pieceHover(4)}
            ></div>
            <div
              className="piece"
              onClick={() => setPos(5)}
              onMouseOver={() => pieceHover(5)}
            ></div>
            <div
              className="piece"
              onClick={() => setPos(6)}
              onMouseOver={() => pieceHover(6)}
            ></div>
            <div
              className="piece"
              onClick={() => setPos(7)}
              onMouseOver={() => pieceHover(7)}
            ></div>
            <div
              className="piece"
              onClick={() => setPos(8)}
              onMouseOver={() => pieceHover(8)}
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
      <Row className="cont-r3">
        <Col className="wrapper wrapper3" xs={8}>
          <div 
            className="board-restart"
            onClick={()=>
              {
                setTimeout(() => {
                  resetBoard(gameMode === 0 ? true: false);
                  setTurn(gameMode === 0 ? -2 : gameTurn);
                  if (gameMode === 1) {
                    const xMark = document.querySelector("#turn-X-dis");
                    const yMark = document.querySelector("#turn-Y-dis");
                    const turnCs = document.querySelectorAll(".turn-c");
                    
                    turnCs.forEach((turnC) => {
                      turnC.style.border = "1px solid #DADCE0";
                      turnC.style.boxShadow = "none";
                    });
                    
                    if (gameTurn === 1) {
                      xMark.style.display = "block";
                      yMark.style.display = "none";
                      turnCs[0].style.borderBottom = "2px solid #14bdac";
                      turnCs[0].style.boxShadow = "2px 2px 6px 2px rgba(0,0,0,0.1)";
                    } else {
                      xMark.style.display = "none";
                      yMark.style.display = "block";
                      turnCs[1].style.borderBottom = "2px solid #14bdac";
                      turnCs[1].style.boxShadow = "2px 2px 6px 2px rgba(0,0,0,0.1)";
                    }
                  } 
                  setAllowChangeP(gameMode === 0 ? 1 : 0);
                  setScore(score);
                }, 200)
              }  
            }
          >
            Restart game
          </div>
        </Col>
      </Row>
    </>
  );
}
