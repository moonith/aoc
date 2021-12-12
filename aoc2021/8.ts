const rawInput = await Deno.readTextFile("./8.txt");
const input = rawInput.split('\n');

const data: string[][] = input.map(i => i.split(" | "));

const getSum = (data: string[]) => {
    const segmentScreen: Record<string, string> = { a: '', b: '', c: '', d: '', e: '', f: '', g: '' };
    
    const getDigit = (digitPattern: string[]) => {
        const digit: string[] = [];
        digitPattern.forEach(dpe => { 
            if (digitPattern.filter(dp => dp === dpe).length > 1) {
                if (!digit.includes(dpe)) {
                    digit.push(dpe)
                }
            } else if (dpe.includes(",")){
                digit.push(`(${dpe})`)
            } else {
                digit.push(dpe)
            }
        })
        return digit.join("").replace(/,/g, '');
    }
    
    const getDigits = (screen: Record<string, string>) => {
        const {a, b, c, d, e, f, g} = screen;
        return ({
            0: getDigit([a, b, c, e, f, g]),
            1: getDigit([c, f]),
            2: getDigit([a, c, d, e, g]),
            3: getDigit([a, c, d, f, g]),
            4: getDigit([b, c, d, f]),
            5: getDigit([a, b, d, f, g]),
            6: getDigit([a, b, d, e, f, g]),
            7: getDigit([a, c, f]),
            8: getDigit([a, b, c, d, e, f, g]),
            9: getDigit([a, b, c, d, f, g]),
        })
    }
    
    data[0].split(" ").sort((a, b) => a.length - b.length).forEach(signal => {
        if (signal.length === 2) {
            // 1
            segmentScreen.c += signal.split("");
            segmentScreen.f += signal.split("");
        } else if (signal.length === 3) {
            // 7
            const {c} = segmentScreen;
            segmentScreen.a += signal.replace(new RegExp(c.replace(/,/g, '|'), "g"), "");
        } else if (signal.length === 4) {
            // 4
            const {c} = segmentScreen;
            const narrowedSignal = signal.replace(new RegExp(c.replace(/,/g, '|'), "g"), "");
            segmentScreen.b += narrowedSignal.split("");
            segmentScreen.d += narrowedSignal.split("");
        } else if (signal.length === 7) {
            // 8
            const {a, c, b} = segmentScreen;
            const narrowedSignal = signal
                .replace(new RegExp(a.replace(/,/g, '|'), "g"), "")
                .replace(new RegExp(b.replace(/,/g, '|'), "g"), "")
                .replace(new RegExp(c.replace(/,/g, '|'), "g"), "");
            segmentScreen.e += narrowedSignal.split("");
            segmentScreen.g += narrowedSignal.split("");
    
        }
    })
    
    const digits: Record<number, string> = getDigits(segmentScreen);
    
    const fiveDigitGrp: string[] = data[0].split(" ").map((item, index) => {
        if (item.length === 5) {
            return item
        } 
        return '';
    }).filter(String)
    
    const sixDigitGrp: string[] = data[0].split(" ").map((item, index) => {
        if (item.length === 6) {
            return item
        } 
        return '';
    }).filter(String)
    
    const doesArrayContainArray = (arr1: string[], arr2: string[]) => {
        let include = true;
        arr2.forEach(item => {
            if (!arr1.includes(item)) {
                include = false;
            }
        })
        return include;
    }
    
    const fiveDigitsPatternsIndexes: number[] = [2, 3, 5];
    const sixDigitsPatternsIndexes: number[] = [0, 6, 9];
    sixDigitsPatternsIndexes.forEach(index => {
        const matches: string = digits[index].replace(/\(([^)]+)\)/g, "");
        const digitWiring = sixDigitGrp.find(item => {
            const itemSorted = item.split("");
            const valueSorted = matches.split("");
            return doesArrayContainArray(itemSorted, valueSorted)
        });
       if (digitWiring) {
            digits[index] = digitWiring;
        }
    })
    
    fiveDigitsPatternsIndexes.forEach(index => {
        const matches: string = digits[index].replace(/\(([^)]+)\)/g, "");
        const digitWiring = fiveDigitGrp.find(item => {
            const itemSorted = item.split("");
            const valueSorted = matches.split("");
            return doesArrayContainArray(itemSorted, valueSorted)
        });
       if (digitWiring) {
            digits[index] = digitWiring;
        }
    })
    
    const reversedDigits = Object.assign({}, ...Object.entries(digits).map(([a,b]) => ({ [b.split("").sort().join("")]: a })));
    return data[1].split(" ").reduce((acc, val)=> {
        return acc + reversedDigits[val.split("").sort().join("")]
    }, '')
}

const totalSum = data.reduce((acc, val) => {
    return acc + Number(getSum(val))
}, 0)
console.log(totalSum)
