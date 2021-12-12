const rawInput = await Deno.readTextFile("./1.txt");

const input: string[] = rawInput.split("");

let floor: number = 0;
let instructionsBeforeBasementIndex: number[] = []
input.forEach((direction, i) => {
    if (direction === ")") {
        if (floor === 0) {
            instructionsBeforeBasementIndex.push(i + 1)
        }
        floor -= 1;
    } else {
        floor += 1;
    }
})

console.log('1st star anwser: ', floor);
console.log('2nd star anwser: ', instructionsBeforeBasementIndex[0]);
