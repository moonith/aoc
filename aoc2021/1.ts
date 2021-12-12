const rawInput = await Deno.readTextFile("./1.txt");
const input: string[] = rawInput.split(/\n/);

let count = 0;

input.reduce((prevVal, currVal) => {
    if (prevVal && Number(prevVal) < Number(currVal)) {
        count += 1;
    }
    return currVal;
}, '')

console.log('1st star anwser: ', count);

count = 0;

input.reduce((prevVal, currVal, index) => {
    const currWindowValue = Number(input[index]) + Number(input[index +  1]) + Number(input[index +  2]);
    if (prevVal && prevVal < currWindowValue) {
        count += 1;
    }
    return Number(input[index]) + Number(input[index +  1]) + Number(input[index +  2]);
}, 0)

console.log('2nd star anwser: ', count);
