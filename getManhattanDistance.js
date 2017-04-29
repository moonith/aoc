// sequence is Array<xy>, where x is either R (for right) or L (for left), and y is number of blocks to go;
// startDirection is one of cardinal points - ("W" || "N" || "E" || "S");

function getManhattanDistance(sequence, startDirection) {
    const leftDirectionsSequence = ["W", "S", "E", "N"];
    const rightDirectionsSequence = ["W", "N", "E", "S"];
    let numberOfSteps = 0;
    let direction = startDirection;
    final_position = steps.reduce((position, step) => {
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
        if (direction === "N") {
            position.y += numberOfSteps;
        } else if (direction === "S") {
            position.y -= numberOfSteps;
        } else if (direction === "W") {
            position.x -= numberOfSteps;
        } else if (direction === "E") {
            position.x += numberOfSteps;
        }
        return position;
    }, {
        y: 0,
        x: 0
    })
    return {
        ManhatanDistance: Math.abs(final_position.y) + Math.abs(final_position.x),
        GridPostion: final_position
    }
}


// test
const steps = ["R1","R1","R3","R1","R1","L2","R5","L2","R5","R1","R4","L2","R3","L3","R4","L5","R4","R4","R1","L5"];
console.log("Blocks From Drop", getManhattanDistance(steps, "N"))
