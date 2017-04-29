// sequence is Array<xy>, where x is either R (for right) or L (for left), and y is number of blocks to go;
// startDirection is one of cardinal points - ("W" || "N" || "E" || "S");

function getManhattanDistance(sequence, startDirection) {
    const leftDirectionsSequence = ["W", "S", "E", "N"];
    const rightDirectionsSequence = ["W", "N", "E", "S"];
    let numberOfSteps = 0;
    let direction = startDirection;
    let sequenceOfPositions = [];
    steps.reduce((position, step) => {
        if (step.includes("L")) {
            const indexOfDirection = leftDirectionsSequence.indexOf(direction);
            if (indexOfDirection === 3) {
                direction = leftDirectionsSequence[0];
            } else {
                direction = leftDirectionsSequence[indexOfDirection + 1];
            }
        } else {
            const indexOfDirection = rightDirectionsSequence.indexOf(direction);
            if (indexOfDirection === 3) {
                direction = rightDirectionsSequence[0];
            } else {
                direction = rightDirectionsSequence[indexOfDirection + 1];
            }
        }
        numberOfSteps = Number(step.slice(1));
        switch (direction) {
            case "N":
                findIntersectionsVisitedMoreThanOnce(sequenceOfPositions, position, numberOfSteps, "y", false);
                position.y += numberOfSteps;
                break;
            case "S":
                findIntersectionsVisitedMoreThanOnce(sequenceOfPositions, position, numberOfSteps, "y", true);
                position.y -= numberOfSteps;
                break;
            case "W":
                findIntersectionsVisitedMoreThanOnce(sequenceOfPositions, position, numberOfSteps, "x", true);
                position.x -= numberOfSteps;
                break;
            case "E":
                findIntersectionsVisitedMoreThanOnce(sequenceOfPositions, position, numberOfSteps, "x", false);
                position.x += numberOfSteps;
                break;
            
        }
        return position;
    }, {
        y: 0,
        x: 0
    })
}

function findIntersectionsVisitedMoreThanOnce(array, startPoint, numberOfSteps, direction, doesGoBack) {
    let i = 0;
    var startingPoint = JSON.parse(JSON.stringify(startPoint));
    var foundDuplicate = false;
    while (i < numberOfSteps) {
        if (doesGoBack) {
            if (direction === "x") {
                startingPoint.x -= 1;
                array.push(`X:${startingPoint.x},Y:${startingPoint.y}`);
            } else {
                startingPoint.y -= 1;
                array.push(`X:${startingPoint.x},Y:${startingPoint.y}`);
            }
        } else {
            if (direction === "x") {
                startingPoint.x += 1;
                array.push(`X:${startingPoint.x},Y:${startingPoint.y}`);
            } else {
                startingPoint.y += 1;
                array.push(`X:${startingPoint.x},Y:${startingPoint.y}`);
            }
        }
        if (array.slice(0, -1).indexOf(`X:${startingPoint.x},Y:${startingPoint.y}`) !== -1) {
            console.log("------------DUPLICATE-------------");
            console.log("ManhatanDistance", Math.abs(startingPoint.x) + Math.abs(startingPoint.y));
            console.log("GridPostion", `X:${startingPoint.x},Y:${startingPoint.y}`);
            console.log("----------------------------------");           
            return true;
        }
        i += 1;
    }
    return false
}

const steps = "R1, R1, R3, R1, R1, L2, R5, L2, R5, R1, R4, L2, R3, L3, R4, L5, R4, R4, R1, L5, L4, R5, R3, L1, R4, R3, L2, L1, R3, L4, R3, L2, R5, R190, R3, R5, L5, L1, R54, L3, L4, L1, R4, R1, R3, L1, L1, R2, L2, R2, R5, L3, R4, R76, L3, R4, R191, R5, R5, L5, L4, L5, L3, R1, R3, R2, L2, L2, L4, L5, L4, R5, R4, R4, R2, R3, R4, L3, L2, R5, R3, L2, L1, R2, L3, R2, L1, L1, R1, L3, R5, L5, L1, L2, R5, R3, L3, R3, R5, R2, R5, R5, L5, L5, R2, L3, L5, L2, L1, R2, R2, L2, R2, L3, L2, R3, L5, R4, L4, L5, R3, L4, R1, R3, R2, R4, L2, L3, R2, L5, R5, R4, L2, R4, L1, L3, L1, L3, R1, R2, R1, L5, R5, R3, L3, L3, L2, R4, R2, L5, L1, L1, L5, L4, L1, L1, R1".split(", ")
getManhattanDistance(steps, "N");
