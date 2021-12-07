'use strict';
const path = require('path');
const { FindMostEfficientLineFromFile } = require('./crab');

const FILE_PATH = path.resolve(__dirname, "input_data.txt");

const LogAnswer = (str) => {
    console.log('\x1b[32m%s\x1b[0m', str);
}

const CalculatePuzzleAnswer = async () => {
    const {
        constMinUsedFuel, 
        constMinUsedFuelHorizPos, 
        linMinUsedFuel, 
        linMinUsedFuelHorizPos
    } = await FindMostEfficientLineFromFile(FILE_PATH);
    LogAnswer(`(Part 1) The crabs must align to position ${constMinUsedFuelHorizPos}, using total fuel: ${constMinUsedFuel}.`);
    LogAnswer(`(Part 2) The crabs must align to position ${linMinUsedFuelHorizPos}, using total fuel: ${linMinUsedFuel}.`);
};

CalculatePuzzleAnswer().catch(e => {
    const err = e instanceof Error ? e.stack : JSON.stringify(e, null, 2);
    console.error(`CalculatePuzzleAnswer error! Err: ${err}`);
});