'use strict';
const { ReadFileToArray } = require('./util');

class CrabSubmarine {

    hPos = 0;

    constructor(initHPos = 0) {
        this.hPos = initHPos;
    }

    /** @returns {Promise<CrabSubmarine[]>} */
    static async FileToArray(filePath) {
        return (await ReadFileToArray(filePath, ',')).map(str => {
            return new CrabSubmarine(parseInt(str));
        });
    }
}

module.exports = {
    FindMostEfficientLineFromFile : async (filePath) => {
        const crabs = await CrabSubmarine.FileToArray(filePath);

        let min = 0;
        let max = 0;
        crabs.forEach(crab => {
            if (crab.hPos < min) {
                min = crab.hPos;
            }
            else if (crab.hPos > max) {
                max = crab.hPos;
            }
        });

        let constMinUsedFuel = Number.POSITIVE_INFINITY;
        let constMinUsedFuelHorizPos = -1;

        let linMinUsedFuel = Number.POSITIVE_INFINITY;
        let linMinUsedFuelHorizPos = -1;

        for (let i = 0; i <= max; i++) {
            let constUsedFuel = 0;
            let linUsedFuel = 0;
            crabs.forEach(crab => {
                const moved = Math.abs(i - crab.hPos);
                constUsedFuel += moved;
                for (let i = 1; i <= moved; i++) { 
                    linUsedFuel += i; 
                }

                if (constUsedFuel > constMinUsedFuel && linUsedFuel > linMinUsedFuel) {
                    return;
                }
            });

            if (constUsedFuel < constMinUsedFuel) {
                constMinUsedFuel = constUsedFuel;
                constMinUsedFuelHorizPos = i;
            }

            if (linUsedFuel < linMinUsedFuel) {
                linMinUsedFuel = linUsedFuel;
                linMinUsedFuelHorizPos = i;
            }
        }

        return {
            constMinUsedFuel, 
            constMinUsedFuelHorizPos, 
            linMinUsedFuel, 
            linMinUsedFuelHorizPos
        };
    }
};

