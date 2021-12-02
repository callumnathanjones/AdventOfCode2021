const fs = require('fs');
const path = require('path')

const FILE_NAME = "depth_data.txt";

/**
 * Returns the number of times a number is larger than it's previous number.
 * @param {number[]} numberArr 
 * @returns {number} Number.
 */
const CalculateNumIncreases = (numberArr) => {
    if (numberArr.length < 2) {
        return 0;
    }

    let numIncreases = 0;

    for (let i = 1; i < numberArr.length; i++) {
        if (numberArr[i] - numberArr[i - 1] > 0) {
            numIncreases++;
        }
    }

    return numIncreases
}

/**
 * Calculates the sums of sub-groups of numbers in a given array.
 * @param {number[]} numArr 
 * @param {number} groupSize 
 * @returns {number[]}
 */
const CalculateNumberGroupSums = (numArr, groupSize) => {
    let ret = [];

    const maxIndex = numArr.length - (numArr.length % groupSize);
    for (let i = 0; i < maxIndex; i++) {
        let sum = 0;
        for (let j = i; j < i + groupSize; j++) {
            sum += numArr[j];
        }
        ret.push(sum);
    }

    return ret;
};

const ReadNumberFile = async (fileName) => {
    const rStream = fs.createReadStream(path.resolve(__dirname, fileName), { encoding : 'utf-8' });

    return new Promise((resolve, reject) => {
        let fileContents = "";

        rStream.on('data', string => {
            fileContents += string;
        });
        
        rStream.on('close', () => {
            resolve(fileContents.split('\n').map(str => parseInt(str)));
        });

        rStream.on('error', reject);
    });
}

const LogAnswer = (str) => {
    console.log('\x1b[32m%s\x1b[0m', str);
}

const CalculatePuzzleAnswer = async () => {
    const numberArr = await ReadNumberFile(FILE_NAME);
    console.log(`There are ${numberArr.length} numbers.`);
    LogAnswer(`There are ${CalculateNumIncreases(numberArr)} number of measurements larger than their previous measurement.`);

    const groupSums = CalculateNumberGroupSums(numberArr, 3);
    console.log(`There are ${groupSums.length} number groups.`);
    LogAnswer(`(Sum group of 3) There are ${CalculateNumIncreases(groupSums)} number of measurements larger than their previous measurement.`)
};

CalculatePuzzleAnswer();