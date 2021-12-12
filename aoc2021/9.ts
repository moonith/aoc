const rawInput = await Deno.readTextFile("./9.txt");
const input = rawInput.split('\n').map(i => i.split(""));

let lowPointsSum = 0;
const lowPointsCoords = [];
const getAdjacentNodes = (grid: string[][], line: string[], gridLineIndex: number, lineItemIndex: number) => {
    return [
        line[lineItemIndex - 1], //left
        line[lineItemIndex + 1], // right
        grid[gridLineIndex - 1] ? // top
            grid[gridLineIndex - 1][lineItemIndex] : undefined,
        grid[gridLineIndex + 1] ? // bottom
            grid[gridLineIndex + 1][lineItemIndex] : undefined,
    ]

}

input.forEach((item, index) => {
    item.forEach((innerItem, innerIndex) => {
        const adjacentNodes = getAdjacentNodes(input, item, index, innerIndex);
        if (adjacentNodes.filter(node => !node || Number(node) > Number(innerItem)).length === 4) {
            lowPointsSum = lowPointsSum + Number(innerItem) + 1;
            lowPointsCoords.push(innerIndex + "x" + index);
        }
    })
})

const isInBasin = (rootValue: string, adjacentValue: string) => {
    return adjacentValue && 
        adjacentValue !== "9" && 
        Number(adjacentValue) !== Number(rootValue);
}

const getBasin = (root: string, grp) => {
    if (!grp.includes(root)) {
        grp.push(root);
        const [rootX, rootY] = root.split("x");
        const rootValue = input[rootY][rootX];
        const [left, right, top, bottom] = getAdjacentNodes(input, input[rootY], Number(rootY), Number(rootX));
        if (isInBasin(rootValue, left)) {
            const leftCord = (Number(rootX) - 1) + "x" + rootY;
            getBasin(leftCord, grp)
        } 
        if (isInBasin(rootValue, right)) {
            const rightCord = (Number(rootX) + 1) + "x" + rootY;
            getBasin(rightCord, grp)
        } 
        if (isInBasin(rootValue, top)) {
            const topCord = rootX + "x" + (Number(rootY) - 1);
            getBasin(topCord, grp)
        } 
        if (isInBasin(rootValue, bottom)) {
            const bottomCord  = rootX + "x" + (Number(rootY) + 1);
            getBasin(bottomCord, grp)
        }
    }
}

const basins = []
lowPointsCoords.forEach(point => {
    const basin = [];
    getBasin(point, basin);
    basins.push(basin);
})

console.log(
    basins
        .sort((a, b) => b.length - a.length)
        .slice(0, 3)
        .reduce((acc, val) => acc *= val.length, 1)
)