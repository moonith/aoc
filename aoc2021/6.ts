const rawInput = await Deno.readTextFile("./6.txt");
const input = rawInput.split(",");

let baseShoal: number[] = input.map(i => Number(i));

const newReproduceTime = (rt: number): number => {
    if (rt === 0) {
        return 6;
    } else {
        return rt - 1;
    }
}

let shoal: Record<number, number> = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0 
}
baseShoal.forEach(rt => {
    shoal[rt] += 1;
})

const getShoal = (rootShoal:Record<number, number>, days: number) => {
    let newShoal = {...rootShoal}
    for (let i = 0; i < days; i++) {
        newShoal = {
            0: newShoal[1],
            1: newShoal[2],
            2: newShoal[3],
            3: newShoal[4],
            4: newShoal[5],
            5: newShoal[6],
            6: newShoal[7] + newShoal[0],
            7: newShoal[8],
            8: newShoal[0]
        }
    }
    return newShoal
}

console.log('1st star anwser: ',  Object.values(getShoal(shoal, 80)).reduce((acc, curr) => curr + acc, 0));
console.log('2nd star anwser: ',  Object.values(getShoal(shoal, 256)).reduce((acc, curr) => curr + acc, 0));
