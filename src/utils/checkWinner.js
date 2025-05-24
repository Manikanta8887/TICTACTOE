export const checkWinner = (grid) => {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6],            
  ];

  for (const [a, b, c] of winPatterns) {
    const cellA = grid[a];
    const cellB = grid[b];
    const cellC = grid[c];

    if (
      cellA &&
      cellB &&
      cellC &&
      cellA.player === cellB.player &&
      cellA.player === cellC.player
    ) {
      return [a, b, c];
    }
  }

  return null;
};
