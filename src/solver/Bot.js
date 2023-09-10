// Constants

function transBoard(board, mode) {
  let board_cpy = [...board];
  let char_set;
  if (mode === 1) char_set = [' ', 'X', 'O'];
  else char_set = [' ', 'O', 'X'];
  for (let i=0; i<9; i++) {
    if (board[i] === -1) board_cpy[i] = char_set[0]
    else if (board[i] === 1) board_cpy[i] = char_set[1]
    else board_cpy[i] = char_set[2]
  }
  return board_cpy;
}


// Function to check if the game is over
function gameOver(board) {
// Check rows, columns, and diagonals for a win
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] !== " " && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }

  // Check for a tie
  return !board.includes(" ");
}

// Function to evaluate the current board
function evaluate(board) {
  // Check for a win
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] === "X" && board[b] === "X" && board[c] === "X") {
      return 1;
    } else if (board[a] === "O" && board[b] === "O" && board[c] === "O") {
      return -1;
    }
  }

  // The game is a tie
  return 0;
}

// Minimax algorithm with alpha-beta pruning
function minimax(board, depth, maximizingPlayer, alpha, beta) {
  if (gameOver(board)) {
    return evaluate(board);
  }

  if (maximizingPlayer) {
    let maxEval = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === " ") {
        board[i] = "X";
        const eva = minimax(board, depth + 1, false, alpha, beta);
        board[i] = " ";
        maxEval = Math.max(maxEval, eva);
        alpha = Math.max(alpha, eva);
        if (beta <= alpha) {
          break;
        }
      }
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === " ") {
        board[i] = "O";
        const eva = minimax(board, depth + 1, true, alpha, beta);
        board[i] = " ";
        minEval = Math.min(minEval, eva);
        beta = Math.min(beta, eva);
        if (beta <= alpha) {
          break;
        }
      }
    }
    return minEval;
  }
}

// Function to find the best move for the AI player (X)
export function bestMove(old_board, mode) {
  let board;
  board = transBoard(old_board, mode);

  let bestEval = -Infinity;
  let bestMoveIndex = -1;

  for (let i = 0; i < 9; i++) {
    if (board[i] === " ") {
      board[i] = "X";
      const eva = minimax(board, 0, false, -Infinity, Infinity);
      board[i] = " ";

      if (eva > bestEval) {
        bestEval = eva;
        bestMoveIndex = i;
      }
    }
  }
  return bestMoveIndex;
}