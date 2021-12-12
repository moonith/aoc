const rawInput = await Deno.readTextFile("./2.txt");
const input: string[] = rawInput.split(/\n/);

let x = 0;
let y = 0;
let z = 0;

input.forEach(instruction => {
    const [dir, dist] = instruction.split(' ');
    switch (dir) {
        case 'up':
            y -= Number(dist);
            break;
        case 'down':
            y += Number(dist);
            break;
        case 'forward':
            x += Number(dist);
            break;
        default:
            break;
    }
})

console.log('1st star anwser: ', x * y);

x = 0;
y = 0;
z = 0;

input.forEach(instruction => {
    const [dir, dist] = instruction.split(' ');
    switch (dir) {
        case 'up':
            z -= Number(dist);
            break;
        case 'down':
            z += Number(dist);
            break;
        case 'forward':
            x += Number(dist);
            y += z * Number(dist);
            break;
        default:
            break;
    }
})


console.log('2nd star anwser: ', x * y);
