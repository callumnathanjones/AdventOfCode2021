'use strict';
const path = require('path');
const { 
    FindMostEfficientLineFromFileConst,
    FindMostEfficientLineFromFileLinear
} = require('./subs/crab');

const FILE_PATH = path.resolve(__dirname, "input_data.txt");

const LogAnswer = (str) => {
    console.log('\x1b[32m%s\x1b[0m', str);
}

const CalculatePuzzleAnswer = async () => {
    const part1 = await FindMostEfficientLineFromFileConst(FILE_PATH);
    LogAnswer(`(Part 1) The crabs must align to position ${part1.horizPos}, using total fuel: ${part1.fuel}.`);

    const part2 = await FindMostEfficientLineFromFileLinear(FILE_PATH);
    LogAnswer(`(Part 2) The crabs must align to position ${part2.horizPos}, using total fuel: ${part2.fuel}.`);
};

CalculatePuzzleAnswer().catch(e => {
    const err = e instanceof Error ? e.stack : JSON.stringify(e, null, 2);
    console.error(`CalculatePuzzleAnswer error! Err: ${err}`);
});