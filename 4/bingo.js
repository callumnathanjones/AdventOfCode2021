'use strict';
const { ReadFileToArray } = require('./util');

class BingoBoardEntry {
    #marked = false;
    #number = 0;

    constructor(num) {
        this.#number = num;
    }

    get num() { return this.#number; }
    get marked() { return this.#marked; }

    onNumberPlayed(num) {
        if (this.#number == num) {
            this.#marked = true;
        }
    }
}

class BingoBoard {

    static #boardIdCounter = 0;

    /** @type {BingoBoardEntry[][]} */
    #rows = [];
    #lastPlayedNum = 1;
    #boardId = BingoBoard.#boardIdCounter++;

    constructor() {
        // console.log(`Board created. Id = ${this.#boardId}`);
    }

    get numRows() {
        return this.#rows.length;
    }

    get score() {
        let unmarkedTotal = 0;
        for (let i = 0; i < this.#rows.length; i++) {
            const row = this.#rows[i];
            for (let j = 0; j < row.length; j++) {
                if (!row[j].marked) {
                    unmarkedTotal += row[j].num;
                }
            }
        } 
        return unmarkedTotal * this.#lastPlayedNum;
    }

    onNumberPlayed(inNum) {
        this.#lastPlayedNum = inNum;
        this.#rows.forEach(row => { 
            row.forEach(num => {
                const wasMarked = num.marked;
                num.onNumberPlayed(inNum);
                if (!wasMarked && num.marked) {
                    this.debugLogBoard();
                }
            }) 
        });
    }

    addRow(numArr) {
        if (!(Array.isArray(numArr)) || numArr.some(num => isNaN(num))) { 
            throw new Error("Invalid row");
        }

        this.#rows.push(numArr.map(num => new BingoBoardEntry(num)));
    }

    isWinningBoard() {
        let winningColumns = [];

        for (let i = 0; i < this.#rows.length; i++) {
            const row = this.#rows[i];
            let winningRow = true;

            for (let j = 0; j < row.length; j++) {
                const num = row[j];

                if (winningColumns[j] == undefined) {
                    winningColumns[j] = true;
                }

                if (!num.marked) {
                    winningRow = false;
                    winningColumns[j] = false;
                }
            }

            if (winningRow) {
                return true;
            }
        }

        return winningColumns.some(col => col);
    }

    debugLogBoard() {
        let output = '';
        this.#rows.forEach(row => {
            let rowString = '';
            row.forEach(num => {
                const entryStr = num.marked ? 'X' : num.num.toString();
                rowString += entryStr.padStart(3, ' ') + ', ';
            });
            output += rowString += '\n';
        });
        console.log(`--------------------------\nBoard: ${this.#boardId}\n${output}--------------------------`);
    }
}

class BingoGame {

    /** @type {BingoBoard[]} */
    #boardsInPlay = [];
    #boardsWonLastTurn = [];

    constructor() {}

    addBoard(board) {
        if (!(board instanceof BingoBoard)) {
            throw new Error("Invalid board object!");
        }
        this.#boardsInPlay.push(board);
    }

    playNumber(inNum) {
        console.log(`(BingoGame) Number played: ${inNum}`);
        this.#boardsWonLastTurn = [];
        for (let i = this.#boardsInPlay.length - 1; i >= 0; i--) {
            const board = this.#boardsInPlay[i];
            board.onNumberPlayed(inNum);
            if (board.isWinningBoard()) {
                this.#boardsWonLastTurn.push(board);
                this.#boardsInPlay.splice(i, 1);
            }
        }
    }

    getBoardsInPlay() {
        return this.#boardsInPlay;
    }

    getWinningBoardsLastTurn() {
        return this.#boardsWonLastTurn;
    }
}

module.exports = {
    SimulateGameFromFile : async (filePath) => {
        const fileContents = await ReadFileToArray(filePath);
        const game = new BingoGame();

        let newBoard = new BingoBoard();
        for (let i = 1; i < fileContents.length; i++) {
            if (fileContents[i].length) {
                const rowData = [];
                
                fileContents[i].split(' ').forEach(str => {
                    const num = parseInt(str);
                    if (!isNaN(num)) {
                        rowData.push(num);
                    }
                });

                if (rowData.length) {
                    newBoard.addRow(rowData);
                    continue;
                }
            }

            // empty row
            if (newBoard.numRows) {
                game.addBoard(newBoard);
                newBoard = new BingoBoard();
            }
        }

        if (newBoard.numRows) {
            game.addBoard(newBoard);
        }
        
        const gameStats = {
            firstWinningScore : null,
            lastWinningScore : null,
        };

        const gameInput = fileContents[0].split(',').map(str => parseInt(str));
        for (let i = 0; i < gameInput.length; i++) {
            game.playNumber(gameInput[i]);

            const winningBoards = game.getWinningBoardsLastTurn();
            const boardsInPlay = game.getBoardsInPlay();
            
            if (winningBoards.length) {
                gameStats.lastWinningScore = winningBoards[0].score;

                if (gameStats.firstWinningScore == null) {
                    gameStats.firstWinningScore = winningBoards[0].score;
                }
            }

            if (!boardsInPlay.length) {
                return gameStats;
            }
        }
    }
}