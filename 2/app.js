const path = require('path');
const Vector3 = require('./vector3');
const Submarine = require('./submarine');
const {
    ReadFileToArray
} = require('./util');

const FILE_PATH = path.resolve(__dirname, "input_data.txt");

const LogAnswer = (str) => {
    console.log('\x1b[32m%s\x1b[0m', str);
}

const CalculatePuzzleAnswer = async () => {
    const commands = await ReadFileToArray(FILE_PATH);
    const sub = new Submarine();

    commands.forEach(command => {
        sub.moveByCommandDeprecated(command);
    });

    const part1FinalPos = sub.getPos();
    const part1Answer = Math.abs(part1FinalPos.y * part1FinalPos.z);
    LogAnswer(`(Part 1) You get ${part1Answer} if you multiply the final horizontal position by the final depth.`);
    
    sub.setPos(new Vector3(0, 0, 0));
    commands.forEach(command => {
        sub.moveByCommand(command);
    });

    const part2FinalPos = sub.getPos();
    const part2Answer = Math.abs(part2FinalPos.y * part2FinalPos.z);
    LogAnswer(`(Part 2) You get ${part2Answer} if you multiply the final horizontal position by the final depth.`);
};

CalculatePuzzleAnswer().catch(e => {
    const err = e instanceof Error ? e.stack : JSON.stringify(e, null, 2);
    console.error(`CalculatePuzzleAnswer error! Err: ${err}`);
});