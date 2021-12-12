const rawInput = await Deno.readTextFile("./4.txt");
const input: string[] = rawInput.split(/\n\n/);

const numbers = input[0].split(",");

const boards = input.slice(1).map(board => board.split(/\n/).map(row => row.split(/\s/).filter(col => col !== "")));

const checkBoard = (board: string[][], types: string[]) => {
    for (let rowIndex = 0; rowIndex < board[0].length; rowIndex++) {
        const row = board[rowIndex];

        if (!row.filter((cell, x) => !types.includes(cell)).length) {
            return true; // row bingo
        }
    }
    for (let colIndex = 0; colIndex < board[0].length; colIndex++) {
        const col: string[] = [];
        board.forEach(row => {
            col.push(row[colIndex])
        })
        if (!col.filter((cell, x) => !types.includes(cell)).length) {
            return true; // col bingo
        }
    }
    return false;
}


// chujowo zrobione
let unmarkedSum = 0;
let lastNumber: string = '';
for (let index = 0; index < numbers.length; index++) {
    const types = numbers.slice(0, index + 1)
    for (let boardIndex = 0; boardIndex < boards.length; boardIndex++) {
        const board = boards[boardIndex];
        if (!lastNumber && checkBoard(board, types)) {
            board.forEach( row => {
                row.forEach(cell => {
                    if (!types.includes(cell)) {
                        unmarkedSum += Number(cell);
                    }
                })
            }, 0)
            lastNumber = types[types.length - 1];
            break;
        }
    }
}

console.log('1st star anwser: ',  unmarkedSum * Number(lastNumber));

// chujowo zrobione
const bingoedBoards: {
    boardId: number;
    types: number[];
    sum: number;
}[] = [];

boards.forEach((board, boardId) => {
    numbers.forEach((number, numId) => {
        const types = numbers.slice(0, numId + 1)
        if (!bingoedBoards.find(bb => bb.boardId === boardId) && checkBoard(board, types)) {
            bingoedBoards.push({boardId: boardId, types: types.map(type => Number(type)), sum: board.reduce((acc, curr) => {
                curr.forEach(cell => {
                    if (!types.includes(cell)) {
                        acc += Number(cell); 
                    }
                })
                return acc;
            }, 0)});
        }
    })
})

const {types, sum} = bingoedBoards.sort((a, b) =>  b.types.length - a.types.length)[0]


console.log('2nd star anwser: ',  sum * Number(types[types.length - 1]));
