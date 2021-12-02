const path = require('path');
const depth = require('./depth');

const DEPTH_DATA_PATH = path.resolve(__dirname, "depth_data.txt");

const LogAnswer = (str) => {
    console.log('\x1b[32m%s\x1b[0m', str);
}

const CalculatePuzzleAnswer = async () => {
    const sample = await depth.CreateSampleFromFile(DEPTH_DATA_PATH);
    LogAnswer(`There are ${sample.CalculateNumIncreases()} number of measurements larger than their previous measurement.`);
    LogAnswer(`(Sum group of 3) There are ${sample.CalculateNumIncreases(3)} number of measurements larger than their previous measurement.`);
};

CalculatePuzzleAnswer();