'use strict';
const path = require('path');
const fish = require('./fish');

const FILE_PATH = path.resolve(__dirname, "input_data.txt");

const LogAnswer = (str) => {
    console.log('\x1b[32m%s\x1b[0m', str);
}

const CalculatePuzzleAnswer = async () => {
    const numLanternFish80Days = await fish.SimulateFromFile(FILE_PATH, 80);
    LogAnswer(`(Part 1) Number of fish after 80 days: ${numLanternFish80Days}`);

    const numLanternFish256Days = await fish.SimulateFromFile(FILE_PATH, 256);
    LogAnswer(`(Part 2) Number of fish after 256 days: ${numLanternFish256Days}`);
};

CalculatePuzzleAnswer().catch(e => {
    const err = e instanceof Error ? e.stack : JSON.stringify(e, null, 2);
    console.error(`CalculatePuzzleAnswer error! Err: ${err}`);
});