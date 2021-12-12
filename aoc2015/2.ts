const rawInput = await Deno.readTextFile("./2.txt");

const input: string[] = rawInput.split("\n");
let totalSquareFeet: number = 0;

input.forEach(element => {
    const [w, l, h]: number[] = element.split("x").map(i => Number(i));
    const side1 = 2 * l * w  
    const side2 = 2 * w * h 
    const side3 = 2 * h * l
    totalSquareFeet += side1 + side2 + side3 + Math.min(side1, side2, side3)/2;
});

let ribbonLength: number = 0;

input.forEach(element => {
    const [w, l, h]: number[] = element.split("x").map(i => Number(i));
    const [x, y] = [w, l, h].sort((a, b) => b - a).slice()
    ribbonLength += (w * l * h + 2 * x + 2 * y);
});

console.log('1st star anwser: ', ribbonLength);