'use strict'
const { 
    TypeCheck, 
    InstanceCheck,
    ReadFileToArray
} = require('./util');

class DepthDataSample {

    #numberArr = [];

    constructor(numberArr) {
        InstanceCheck(numberArr, Array);
        numberArr.forEach(num => TypeCheck(num, "number"));
        this.#numberArr = numberArr;
    }

    CalculateNumIncreases(SlidingWindowSize = 1) {
        if (SlidingWindowSize < 1 || this.#numberArr.length < 2) {
            return 0;
        }

        const evalArray = this.#CalculateNumberGroupSums(this.#numberArr, SlidingWindowSize);
        let numIncreases = 0;

        for (let i = 1; i < evalArray.length; i++) {
            if (evalArray[i] - evalArray[i - 1] > 0) {
                numIncreases++;
            }
        }

        return numIncreases
    }

    #CalculateNumberGroupSums = (numArr, groupSize) => {
        if (groupSize == 1) {
            return numArr;
        }

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
}

module.exports = {
    CreateSampleFromFile : async (absoluteFilePath) => {
        const numberArr = (await ReadFileToArray(absoluteFilePath)).map(str => parseInt(str));
        return new DepthDataSample(numberArr);
    }
};