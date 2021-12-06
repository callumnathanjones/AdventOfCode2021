const path = require('path');
const vents = require('./vents');

const FILE_PATH = path.resolve(__dirname, "input_data.txt");
const OUTPUT_FILE_PATH = path.resolve(__dirname, "grid.txt");

const LogAnswer = (str) => {
    console.log('\x1b[32m%s\x1b[0m', str);
}

const CalculatePuzzleAnswer = async () => {
    let dataSample = await vents.CreateFromFile(FILE_PATH, false);
    LogAnswer(`(Part 1) Num dangerous areas is: ${dataSample.numDangerousAreas}`);

    dataSample = await vents.CreateFromFile(FILE_PATH);
    await dataSample.saveGridToFile(OUTPUT_FILE_PATH);
    LogAnswer(`(Part 2) Num dangerous areas is: ${dataSample.numDangerousAreas}`);
};

CalculatePuzzleAnswer().catch(e => {
    const err = e instanceof Error ? e.stack : JSON.stringify(e, null, 2);
    console.error(`CalculatePuzzleAnswer error! Err: ${err}`);
});