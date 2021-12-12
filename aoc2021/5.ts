const rawInput = await Deno.readTextFile("./5.txt");
const input: string[] = rawInput.split(/\n/);

const instructions = input.map(instruction => instruction.split(' -> ').map(cords => cords.split(',')));

let visited: Record<string, number> = {};
instructions.forEach(([start, end]) => {
    const x1  = Number(start[0]);
    const x2  = Number(end[0]);
    const y1  = Number(start[1]);
    const y2  = Number(end[1]);
    if (y2 === y1) {
        for (let i = 0; i <= Math.abs(x1 - x2); i++) {
            const key: string = `${x1 < x2 ? x1 + i : x1 - i}x${y1}`;
            visited[key] = (visited[key] || 0) + 1
        }
    } else if (x2 === x1) {
        for (let i = 0; i <= Math.abs(y1 - y2); i++) {
            const key: string = `${x1}x${y1 < y2 ? y1 + i : y1 - i}`;
            visited[key] = (visited[key] || 0) + 1
        }
    }
})

let twoOrMoreCount = 0;
Object.values(visited).forEach(visits => visits > 1 ? twoOrMoreCount += 1 : false)

console.log('1st star anwser: ',  twoOrMoreCount);

twoOrMoreCount = 0;
visited = {};

instructions.forEach(([start, end]) => {
    const x1  = Number(start[0]);
    const x2  = Number(end[0]);
    const y1  = Number(start[1]);
    const y2  = Number(end[1]);
    if (y2 === y1) {
        for (let i = 0; i <= Math.abs(x1 - x2); i++) {
            const key: string = `${x1 < x2 ? x1 + i : x1 - i}x${y1}`;
            visited[key] = (visited[key] || 0) + 1
        }
    } else if (x2 === x1) {
        for (let i = 0; i <= Math.abs(y1 - y2); i++) {
            const key: string = `${x1}x${y1 < y2 ? y1 + i : y1 - i}`;
            visited[key] = (visited[key] || 0) + 1
        }
    } else {
        for (let i = 0; i <= Math.abs(y1 - y2); i++) {
            const key: string = `${x1 < x2 ? x1 + i : x1 - i}x${y1 < y2 ? y1 + i : y1 - i}`;
            visited[key] = (visited[key] || 0) + 1
        }
    }
})

Object.values(visited).forEach(visits => visits > 1 ? twoOrMoreCount += 1 : false)

console.log('2nd star anwser: ',  twoOrMoreCount);