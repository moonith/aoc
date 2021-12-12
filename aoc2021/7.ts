const rawInput = await Deno.readTextFile("./7.txt");
const input = rawInput.split(",").map(i => Number(i));

const getFuelCost = (extraCost?: boolean) => {
    let leastFuelCost: number | undefined;
    for (let itemIndex = 0; itemIndex < Math.max(...input); itemIndex++) {
        let fuelCost: number = 0;
        input.forEach((innerItemIndex) => {
            const distance = Math.abs(innerItemIndex - itemIndex);
            const extraDistance = distance * (1 + distance) / 2;
            if (extraCost) {
                fuelCost = fuelCost + distance + extraDistance;
            } else {
                fuelCost = fuelCost + distance;
            }
        })
        if (leastFuelCost === undefined || leastFuelCost > fuelCost) {
            leastFuelCost = fuelCost;
        }
    }
    return leastFuelCost;
}
console.log('1st star anwser:',  getFuelCost());
console.log('2nd star anwser: ',  getFuelCost(true));
