import React, { useContext } from "react";
import { useState } from 'react';
import SettingsContext from "../contexts/settings-context";
import DifficultiesContext from "../contexts/difficulties-context";
import Cell from "./Cell";

const dx = [1, 0, -1,  0, 1,  1, -1, -1];
const dy = [0, 1,  0, -1, 1, -1, -1,  1];

const Board = () => {
    const { settings, dispatch } = useContext(SettingsContext);
    const difficulties = useContext(DifficultiesContext);
    
    const height = difficulties[settings.difficulty].height;
    const width = difficulties[settings.difficulty].width;
    const mines = difficulties[settings.difficulty].mines;
    
    const [isRevealed, setIsRevealed] = useState(
        filledGrid(height, width, false)
    );

    const [board, setBoard] = useState(
        createBoard(height, width, mines)
    );

    if (isCompleted()){
        setIsRevealed(filledGrid(height, width, true));
        dispatch({
            type: 'CHANGE_GAMESTATE',
            gameStatus: 'completed'
        })
    }

    function isCompleted(){
        const h = height;
        const w = width;

        let count = 0;
        isRevealed.map((row) => (
            row.map((cell) => (
                count += (cell === true)
            ))
        ))
        return h*w === (count + mines);
    };

    function filledGrid(h, w, v){
        let grid = [];
        for (let i = 0; i < h; ++i){
            grid.push(new Array(w).fill(v));
        }
        return grid;
    };

    function createBoard(h, w, mine_num){
        const bomb = -1;
        const grid = randomReplace(filledGrid(h, w, 0), mine_num, bomb); 
        return bombCounter(grid, bomb);
    }

    function randomReplace(grid, num, replacement){
        const h = grid.length;
        const w = grid[0].length;
        let positions = [];

        while (positions.length < num){
            const rand = Math.floor(Math.random() * (h*w));
            if (!positions.includes(rand)){
                positions.push(rand);
            }
        }
        positions.map((position) => {
            grid[Math.floor(position / h)][position % w] = replacement;
        })

        return grid;
    }

    function bombCounter(grid, bomb){
        const h = grid.length;
        const w = grid[0].length;

        for (let x = 0; x < h; ++x){
            for (let y = 0; y < w; ++y){
                
                if (grid[x][y] === bomb){
                    for (let direction = 0; direction < 8; ++direction){
                        const nx = x + dx[direction];
                        const ny = y + dy[direction];

                        if (nx < 0 || nx >= w || ny < 0 || ny >= h){
                            continue;
                        }
                    
                        // 隣の爆弾マスには+しない
                        if (grid[nx][ny] === bomb){ continue; }
                        
                        grid[nx][ny] += 1;
                    }
                }
            }
        }

        return grid;
    }

    function dfs(Graph, seen, h, w, x, y){
        
        seen[x][y] = true;

        if (Graph[x][y] !== 0){ return; }
    
        for (let direction = 0; direction < 8; ++direction){
            const nx = x + dx[direction];
            const ny = y + dy[direction];
        
            if (nx < 0 || nx >= h || ny < 0 || ny >= w){
                continue;
            }

            if (seen[nx][ny]){ continue; }

            dfs(Graph, seen, h, w, nx, ny);
        }

        return seen;
    }

    function handleClick(i, j){
        
        const nextIsRevealed = isRevealed.slice();
        
        switch(board[i][j]) {
            case -1:
                setIsRevealed(filledGrid(height, width, true));
                dispatch({
                    type: 'CHANGE_GAMESTATE',
                    gameStatus: 'gameOver'
                })
                return;
            case 0:
                const seen = dfs(board, filledGrid(height, width, false), height, width, i, j);
                setIsRevealed(
                    nextIsRevealed.map((row, i) => ( 
                        row.map((prev, j) => (
                            prev || seen[i][j]
                        ))
                    ))
                );
                return;
            default:
                nextIsRevealed[i][j] = true;
                setIsRevealed(nextIsRevealed);
        }
    }

    return(
        <div className="board">
        {
           isRevealed.map((row, i) => (
                <div className="row" key={i}>
                    {
                        row.map((cell, j) => (
                            <Cell
                                key={String(i) + String(j)}
                                value={board[i][j]}
                                isRevealed={isRevealed[i][j]}
                                handleClick={() => {
                                    handleClick(i, j)
                                }} 
                            />
                        ))
                    }
                </div>
           ))
        }
        </div>
    );
};

export default Board;