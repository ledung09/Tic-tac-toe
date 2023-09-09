export function CheckWin(board) {
  // 2 = tie
  // 0 / 1 = O / X
  // -1 = undone

  // Check row
  if (board[0] === board[1] && board[1] === board[2] && board[2] !== -1) 
    return [board[0], 'r1'];
  if (board[3] === board[4] && board[4] === board[5] && board[5] !== -1) 
    return [board[3], 'r2'];
  if (board[6] === board[7] && board[7] === board[8] && board[8] !== -1) 
    return [board[6], 'r3'];

  // Check col
  if (board[0] === board[3] && board[3] === board[6] && board[6] !== -1) 
    return [board[0], 'c1'];
  if (board[1] === board[4] && board[4] === board[7] && board[7] !== -1) 
    return [board[1], 'c2'];
  if (board[2] === board[5] && board[5] === board[8] && board[8] !== -1) 
    return [board[2], 'c3'];

  // Check diag
  if (board[0] === board[4] && board[4] === board[8] && board[8] !== -1) 
    return [board[0], 'd1'];
  if (board[2] === board[4] && board[4] === board[6] && board[6] !== -1) 
    return [board[2], 'd2'];

  // Tie case
  if (board.indexOf(-1) === -1) return [2, ''];

  return [-1, ''];
}
