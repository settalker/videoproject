import React, { useState, useEffect } from 'react';

const GRID_SIZE = 3;
const CELL_SIZE = 100;

interface Tile {
  value: number;
  position: number;
}

export default function PuzzleGame() {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [moves, setMoves] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const initializePuzzle = () => {
    const numbers = Array.from({ length: GRID_SIZE * GRID_SIZE - 1 }, (_, i) => i + 1);
    numbers.push(0); // Empty tile
    const shuffled = shuffleArray([...numbers]);
    
    if (!isSolvable(shuffled)) {
      // Make it solvable by swapping two adjacent non-empty tiles
      const idx1 = shuffled.findIndex(n => n !== 0);
      const idx2 = shuffled.findIndex((n, i) => n !== 0 && i > idx1);
      [shuffled[idx1], shuffled[idx2]] = [shuffled[idx2], shuffled[idx1]];
    }

    setTiles(shuffled.map((value, position) => ({ value, position })));
    setMoves(0);
    setIsComplete(false);
  };

  useEffect(() => {
    initializePuzzle();
  }, []);

  const isSolvable = (numbers: number[]): boolean => {
    let inversions = 0;
    for (let i = 0; i < numbers.length - 1; i++) {
      for (let j = i + 1; j < numbers.length; j++) {
        if (numbers[i] && numbers[j] && numbers[i] > numbers[j]) {
          inversions++;
        }
      }
    }
    return inversions % 2 === 0;
  };

  const shuffleArray = (array: number[]): number[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleTileClick = (clickedTile: Tile) => {
    if (isComplete) return;

    const emptyTileIndex = tiles.findIndex(tile => tile.value === 0);
    const clickedTileIndex = tiles.findIndex(tile => tile.value === clickedTile.value);

    if (isAdjacent(clickedTileIndex, emptyTileIndex)) {
      const newTiles = [...tiles];
      [newTiles[clickedTileIndex], newTiles[emptyTileIndex]] = 
        [newTiles[emptyTileIndex], newTiles[clickedTileIndex]];
      
      setTiles(newTiles);
      setMoves(prev => prev + 1);

      // Check if puzzle is solved
      const isSolved = newTiles.every((tile, index) => 
        tile.value === (index === GRID_SIZE * GRID_SIZE - 1 ? 0 : index + 1)
      );
      
      if (isSolved) {
        setIsComplete(true);
      }
    }
  };

  const isAdjacent = (index1: number, index2: number): boolean => {
    const row1 = Math.floor(index1 / GRID_SIZE);
    const col1 = index1 % GRID_SIZE;
    const row2 = Math.floor(index2 / GRID_SIZE);
    const col2 = index2 % GRID_SIZE;

    return Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1;
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="mb-4 text-center">
        <h2 className="text-2xl font-bold mb-2">Puzzle Game</h2>
        <p className="text-gray-600 dark:text-gray-300">Moves: {moves}</p>
      </div>
      
      <div className="relative">
        <div 
          className="grid gap-1 bg-gray-200 dark:bg-gray-700 p-1 rounded"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
          }}
        >
          {tiles.map((tile, index) => (
            <button
              key={tile.value}
              onClick={() => handleTileClick(tile)}
              className={`
                h-[100px] w-[100px] flex items-center justify-center
                text-2xl font-bold rounded transition-all duration-200
                ${tile.value === 0 ? 'invisible' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}
              `}
              disabled={isComplete || tile.value === 0}
            >
              {tile.value === 0 ? '' : tile.value}
            </button>
          ))}
        </div>

        {isComplete && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/75 rounded">
            <div className="text-center text-white">
              <h3 className="text-xl font-bold mb-4">Puzzle Solved!</h3>
              <p className="mb-4">Completed in {moves} moves</p>
              <button
                onClick={initializePuzzle}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded text-white transition-colors"
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 space-x-4">
        <button
          onClick={initializePuzzle}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded text-white transition-colors"
        >
          New Game
        </button>
      </div>
    </div>
  );
}