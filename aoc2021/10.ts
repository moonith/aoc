const rawInput = await Deno.readTextFile("./10.txt");
const input = rawInput.split('\n');

const errorValue = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137
}
const opening = ["(", "[", "{", "<"];
const closing = [")", "]", "}", ">"];
const findAndRemovePairs = (pattern) => {
    const newPattern = pattern.replace(/{}/g, "").replace(/<>/g, "").replace(/\(\)/g, "").replace(/\[\]/g, "");
    if (newPattern.includes("[]") || newPattern.includes("{}") || newPattern.includes("()") || newPattern.includes("<>")) {
        return findAndRemovePairs(newPattern)
    }
    return newPattern;
}
const bracketsErrors: Record<string, number> = {}
const notCorruptedInstructions: string[] = [];

input.forEach(instruction => {
    const left = findAndRemovePairs(instruction);
    left.split("").forEach((inst, indx) => {
        if (opening.includes(inst) && closing.includes(left[indx + 1])) {
            bracketsErrors[left[indx + 1]] = 
            bracketsErrors[left[indx + 1]] 
                ? bracketsErrors[left[indx + 1]] + 1 
                : 1
            notCorruptedInstructions.push(instruction);
        }
    })
})

const corruptedInstructions: string[] = input.filter(inst => !notCorruptedInstructions.includes(inst));

let errorSum = 0;
Object.entries(bracketsErrors).forEach(([key, value]) => {
    errorSum += errorValue[key] * value;
})

const reverseBracket = {
    "(": ")",
    "[": "]",
    "{": "}",
    "<": ">"
}
const closingValue = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4
}
const additions: number[] = [];
corruptedInstructions.forEach(instruction => {
    const closing = [];
    const left = findAndRemovePairs(instruction);
    left.split("").reverse().forEach(item => {
        closing.push(reverseBracket[item])
    })
    additions.push(closing.reduce((acc, val) => acc = acc * 5 + closingValue[val], 0));
})

console.log(additions.sort((b, a) => b -a )[(additions.length -1) / 2]);