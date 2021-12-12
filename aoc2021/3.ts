const rawInput = await Deno.readTextFile("./3.txt");
const input: string[] = rawInput.split(/\n/);

const instructionsCount = input.length;


const bitsSum = input.reduce((prevVal, currVal) => {
    return prevVal.map((bit, index) => {
        return bit += Number(currVal[index])
    })
}, (new Array(input[0].length).fill(0)))

const gammaRate = bitsSum.map(i => instructionsCount - i > instructionsCount / 2 ? 1 : 0).join('');
const epsilonRate = bitsSum.map(i => instructionsCount - i > instructionsCount / 2 ? 0 : 1).join('');

console.log('1st star anwser: ', parseInt(gammaRate, 2) * parseInt(epsilonRate, 2));

const getMostCommonBit = (bits: string[], pos: number, type: 'co2' | 'oxy') => {
    const sum = bits.reduce((prevVal, currVal) => {
        return prevVal.map((bit, index) => {
            return bit += Number(currVal[index])
        })
    }, (new Array(bits[0].length).fill(0)))
    if (type === 'oxy') {
        return sum.map(i => bits.length - i <= bits.length / 2 ? 1 : 0).join('')[pos]   
    } else {
        return sum.map(i => bits.length - i <= bits.length / 2 ? 0 : 1).join('')[pos]   
    }
}

const getVal = (bits: string[], pos: number, type: 'co2' | 'oxy'): string => {
    if (bits.length === 1) {
        return bits[0];
    } else {
        const mostCommonBit = getMostCommonBit(bits, pos, type);
        return getVal(bits.filter(item => item[pos] === mostCommonBit), pos + 1, type)
    }
}

const oxygenRating = getVal(input, 0, 'oxy');
const co2Rating = getVal(input, 0, 'co2');

console.log('2st star anwser: ', parseInt(oxygenRating, 2) * parseInt(co2Rating, 2));

