const rawInput = await Deno.readTextFile("./11.txt");
const input = rawInput.split('\n');

let matrix = input.map(i => i.split("").map(i => Number(i)));

let flashCount = 0;

const increaseAdjacentNodes = (y, x) => {
    const [lt, t, rt, l, r, bl, b, br] = [ 
        [y - 1, x - 1], [y - 1, x], [y - 1, x + 1], [y, x - 1], [y, x + 1], [y + 1, x - 1], [y + 1, x], [y + 1, x + 1]
    ];
    matrix[y][x] = 0;
    flashCount += 1;
    cordsFlashed.push(`${y},${x}`);
    [lt, t, rt, l, r, bl, b, br].forEach(([newY, newX]) => {
        if (newY >= 0 && newX >= 0 && newY < matrix.length && newX < matrix[0].length && !cordsFlashed.includes(`${newY},${newX}`)) {
            if (matrix[newY][newX] === 9) {
                increaseAdjacentNodes(newY, newX)
            } else {
                matrix[newY][newX] += 1; 
            }
        }
    })
}

let cordsFlashed = [];

for (let i = 1; i <= 100; i++) {
    matrix.forEach((row, y) => {
        row.forEach((item, x) => {
            if (matrix[y][x] === 9) {
                increaseAdjacentNodes(y, x)
            } else {
                matrix[y][x] += 1;
            }
        })
    })
    cordsFlashed.forEach(cord => matrix[cord.split(",")[0]][cord.split(",")[1]] = 0)
    cordsFlashed = [];
}

console.log('1st star anwser:',  flashCount);

matrix = input.map(i => i.split("").map(i => Number(i)));

let allFlashed = false;
let stepCounter = 0;
while (!allFlashed) {
    stepCounter += 1;
    matrix.forEach((row, y) => {
        row.forEach((item, x) => {
            if (matrix[y][x] === 9) {
                increaseAdjacentNodes(y, x)
            } else {
                matrix[y][x] += 1;
            }
        })
    })
    cordsFlashed.forEach(cord => matrix[cord.split(",")[0]][cord.split(",")[1]] = 0)
    if (cordsFlashed.length === matrix.length * matrix[0].length) {
        allFlashed = true
    }
    cordsFlashed = [];
}

console.log('2nd star anwser: ', stepCounter);