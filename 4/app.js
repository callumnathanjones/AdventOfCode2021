const path = require('path');
const bingo = require('./bingo');

const FILE_PATH = path.resolve(__dirname, "input_data.txt");

const LogAnswer = (str) => {
    console.log('\x1b[32m%s\x1b[0m', str);
}

const CalculatePuzzleAnswer = async () => {
    const { firstWinningScore, lastWinningScore } = await bingo.SimulateGameFromFile(FILE_PATH);
    LogAnswer(`(Part 1) First-winning bingo score is ${firstWinningScore}.`);
    LogAnswer(`(Part 2) Last-winning bingo score is ${lastWinningScore}.`);
};

CalculatePuzzleAnswer().catch(e => {
    const err = e instanceof Error ? e.stack : JSON.stringify(e, null, 2);
    console.error(`CalculatePuzzleAnswer error! Err: ${err}`);
});