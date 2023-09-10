export function CheckWin(board) {
  // 2 = tie
  // 0 / 1 = O / X
  // -1 = undone

  const winPatterns = [
    [0, 1, 2, "r1"],
    [3, 4, 5, "r2"],
    [6, 7, 8, "r3"],
    [0, 3, 6, "c1"],
    [1, 4, 7, "c2"],
    [2, 5, 8, "c3"],
    [0, 4, 8, "d1"],
    [2, 4, 6, "d2"],
  ];

  for (const pattern of winPatterns) {
    const [a, b, c, move] = pattern;
    if (board[a] !== -1 && board[a] === board[b] && board[a] === board[c]) {
      return [board[a], move];
    }
  }

  // Tie case
  if (board.indexOf(-1) === -1) return [2, ""];

  return [-1, ""]; // Undone
}
