import { CheckWin } from "./CheckWin";

function gameOver(board) {
  if (CheckWin(board)[0] === -1) return false;
  return true;
}

function evaluate(board, depth) {
  if (CheckWin(board)[0] === 1) return 1 - depth; // X
  else if (CheckWin(board)[0] === 0) return depth - 1; // O
  else return 0;
}

function minimax(board, depth, maximizingPlayer, alpha, beta) {
  if (gameOver(board)) {
      return evaluate(board, depth);
  }

  if (maximizingPlayer) {
    let maxEva = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === -1) {
        board[i] = 1;
        const eva = minimax(board, depth + 1, false, alpha, beta);
        board[i] = -1;
        maxEva = Math.max(maxEva, eva);
        alpha = Math.max(alpha, eva);
        if (beta <= alpha) {
          break;
        }
      }
    }
    return maxEva;
  } else {
    let minEva = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === -1) {
        board[i] = 0;
        const eva = minimax(board, depth + 1, true, alpha, beta);
        board[i] = -1;
        minEva = Math.min(minEva, eva);
        beta = Math.min(beta, eva);
        if (beta <= alpha) {
          break;
        }
      }
    }
    return minEva;
  }
}

function bestMove(board) {
  let bestEva = -Infinity;
  let bestMove = null;
  for (let i = 0; i < 9; i++) {
      if (board[i] === -1) {
          board[i] = 1;
          const eva = minimax(board, 0, false, -Infinity, Infinity);
          board[i] = -1;
          if (eva > bestEva) {
              bestEva = eva;
              bestMove = i;
          }
      }
  }
  return bestMove;
}
