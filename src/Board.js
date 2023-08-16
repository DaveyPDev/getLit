import React, { useState } from 'react';
import Cell from './Cell';
import './Board.css';

/** Game board of Lights out.
 *
 * Properties:
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks — clicks are on individual cells
 *
 **/

  // Initiate board
  function Board({ nrows, ncols, chanceLightStartsOn }) {
    const [board, setBoard] = useState(createBoard());
    const [gameWon, setGameWon] = useState(false);
  
    // Create a board nrows high/ncols wide, each cell randomly lit or unlit
    function createBoard() {
      return Array.from({ length: nrows }, () =>
        Array.from({ length: ncols }, () => Math.random() < chanceLightStartsOn)
      );
    }
  
    // Reset game
    function resetBoard() {
      setBoard(createBoard());
      setGameWon(false); // Reset gameWon state
    }
  
    // Check if the game is won
    function checkWin() {
      return board.every((row) => row.every((cell) => !cell));
    }
  
    // Handle cell click
    function flipCellsAround(coord) {
      if (gameWon) return; // Don't allow cell flipping if game is won
  
      setBoard((oldBoard) => {
        const [y, x] = coord.split('-').map(Number);
  
        const flipCell = (y, x, boardCopy) => {
          if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
            boardCopy[y][x] = !boardCopy[y][x];
          }
        };
  
        const newBoard = oldBoard.map((row) => [...row]);
  
        flipCell(y, x, newBoard);
        flipCell(y - 1, x, newBoard); // Above
        flipCell(y + 1, x, newBoard); // Below
        flipCell(y, x - 1, newBoard); // Left
        flipCell(y, x + 1, newBoard); // Right
  
        // Check if the game is won after flipping cells
        if (checkWin()) {
          setGameWon(true);
        }
  
        return newBoard;
      });
    }
  
    // Make table board
    return (
      <div className="Board">
        {gameWon ? (
          <div className="Board-win">
            You Won! <button onClick={resetBoard}>Play Again</button>
          </div>
        ) : (
          <div>
            {board.map((row, y) => (
              <div key={y} className="Board-row">
                {row.map((cell, x) => (
                  <Cell
                    key={`${y}-${x}`}
                    isLit={cell}
                    flipCellsAroundMe={() => flipCellsAround(`${y}-${x}`)}
                  />
                ))}
              </div>
            ))}
            <button onClick={resetBoard}>Reset</button>
          </div>
        )}
      </div>
    );
  }
  
  export default Board;
  