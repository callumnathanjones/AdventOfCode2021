'use strict';
const { ReadFileToArray } = require('../util');
const Vector2 = require('../vector2');
const Submarine = require('./submarine');

class CrabSubmarine extends Submarine {

    constructor(initialPos) {
        super(initialPos);
    }

    /** @returns {Promise<CrabSubmarine[]>} */
    static async FileToArray(filePath) {
        return (await ReadFileToArray(filePath, ',')).map(str => {
            return new CrabSubmarine(new Vector2(parseInt(str), 0));
        });
    }
}

module.exports = {
    FindMostEfficientLineFromFileConst : async (filePath) => {
        console.log("Fuel usage: constant...");
        const crabs = await CrabSubmarine.FileToArray(filePath);

        let min = 0;
        let max = 0;
        crabs.forEach(crab => {
            if (crab.getPos().x < min) {
                min = crab.getPos().x;
            }
            else if (crab.getPos().x > max) {
                max = crab.getPos().x;
            }
        });

        let minUsedFuel = Number.POSITIVE_INFINITY;
        let minUsedFuelHorizPos = -1;
        for (let i = 0; i <= max; i++) {
            let usedFuel = 0;
            crabs.forEach(crab => {
                usedFuel += Math.abs(i - crab.getPos().x);
                if (usedFuel > minUsedFuel) {
                    return;
                }
            });

            console.log(`Shifting to horiz pos ${i} uses ${usedFuel} fuel.`);

            if (usedFuel < minUsedFuel) {
                minUsedFuel = usedFuel;
                minUsedFuelHorizPos = i;
            }
        }

        return {
            fuel : minUsedFuel,
            horizPos : minUsedFuelHorizPos
        }
    },
    FindMostEfficientLineFromFileLinear : async (filePath) => {
        console.log("Fuel usage: linear...");
        const crabs = await CrabSubmarine.FileToArray(filePath);

        let min = 0;
        let max = 0;
        crabs.forEach(crab => {
            if (crab.getPos().x < min) {
                min = crab.getPos().x;
            }
            else if (crab.getPos().x > max) {
                max = crab.getPos().x;
            }
        });

        let minUsedFuel = Number.POSITIVE_INFINITY;
        let minUsedFuelHorizPos = -1;
        for (let i = min; i <= max; i++) {
            let usedFuel = 0;
            crabs.forEach(crab => {
                const moved = Math.abs(i - crab.getPos().x);
                for (let i = 1; i <= moved; i++) { 
                    usedFuel += i; 
                }
                
                if (usedFuel > minUsedFuel) {
                    return;
                }
            });

            console.log(`Shifting to horiz pos ${i} uses ${usedFuel} fuel.`);

            if (usedFuel < minUsedFuel) {
                minUsedFuel = usedFuel;
                minUsedFuelHorizPos = i;
            }
        }

        return {
            fuel : minUsedFuel,
            horizPos : minUsedFuelHorizPos
        }
    }
};

