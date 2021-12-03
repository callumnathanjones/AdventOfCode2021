const path = require('path');
const diagnostic = require('./diagnostic');

const FILE_PATH = path.resolve(__dirname, "input_data.txt");

const LogAnswer = (str) => {
    console.log('\x1b[32m%s\x1b[0m', str);
}

const CalculatePuzzleAnswer = async () => {
    const dataSample = await diagnostic.CreateDataSampleFromFile(FILE_PATH);

    const powerConsumption = dataSample.powerConsumption;
    LogAnswer(`(Part 1) Total power consumption is ${powerConsumption}`);
    
    console.log(`Oxygen rating: ${dataSample.oxygenGeneratorRating}`);
    console.log(`c02 rating: ${dataSample.c02ScrubberRating}`);
    const lifeSupportRating = dataSample.lifeSupportRating;
    LogAnswer(`(Part 2) Life support rating is ${lifeSupportRating}`);
};

CalculatePuzzleAnswer().catch(e => {
    const err = e instanceof Error ? e.stack : JSON.stringify(e, null, 2);
    console.error(`CalculatePuzzleAnswer error! Err: ${err}`);
});