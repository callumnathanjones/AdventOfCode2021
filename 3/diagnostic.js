'use strict';
const { ReadFileToArray } = require('./util');

class DiagnosticDataSample {

    #binaryNums = [];

    /**
     * @param {string[]} binaryNums 
     */
    constructor(binaryNums) {
        binaryNums.forEach(str => {
            if (typeof str != "string" || isNaN(parseInt(str, 2))) {
                throw new Error("All numbers must be a binary");
            }

            this.#binaryNums.push(str.trim());
        });
    }

    #calculateMostCommonBits(inBinaryArr, fallbackBit = 0, range = null, startIndex = null) {
        if (fallbackBit != 0 && fallbackBit != 1) {
            throw new Error("fallbackVal must be 0 or 1!");
        }

        /** Counts the number of occurances for 1s and 0s. 1 adds 1, 0 minuses 1 */
        let numTally = [];

        inBinaryArr.forEach(str => {
            const start =  typeof startIndex != "number" || startIndex >= str.length ? 0 : startIndex;
            const maxIndex = typeof range != "number" || start + range >= str.length ? str.length : start + range;
            for (let i = start; i < maxIndex; i++) {
                
                const digit = parseInt(str[i]);

                if (!isNaN(digit)) {
                    const tallyIndex = i - start;
                    if (!numTally[tallyIndex]) {
                        numTally[tallyIndex] = 0;
                    }
                    
                    numTally[tallyIndex] += digit == 1 ? 1 : -1;
                }
            }
        });

        let resBinary = '';

        for (let i = 0; i < numTally.length; i++) {
            if (numTally[i] == 0) {
                resBinary += fallbackBit.toString();
            }
            else {
                resBinary += numTally[i] > 0 ? '1' : '0';
            }
        }

        return resBinary;
    }
    
    get lifeSupportRating() {
        return this.c02ScrubberRating * this.oxygenGeneratorRating;
    }

    get c02ScrubberRating() {

        if (!this.#binaryNums.length) {
            return 0;
        }

        let filteredNums = this.#binaryNums;
        for (let i = 0; i < this.#binaryNums[0].length; i++) {
            const leastCommonBit = this.#calculateMostCommonBits(filteredNums, 1, 1, i) == '1' ? '0' : '1';
            filteredNums = filteredNums.filter(str => str.length && str[i] == leastCommonBit);

            if (filteredNums.length <= 1) {
                break;
            }
        }
        
        if (!filteredNums.length) {
            return 0;
        }

        const ratingBinary = this.#calculateMostCommonBits(filteredNums);
        return parseInt(ratingBinary, 2);
    }

    get oxygenGeneratorRating() {
        if (!this.#binaryNums.length) {
            return 0;
        }

        let filteredNums = this.#binaryNums;
        for (let i = 0; i < this.#binaryNums[0].length; i++) {
            const mostCommonBit = this.#calculateMostCommonBits(filteredNums, 1, 1, i);
            filteredNums = filteredNums.filter(str => str.length && str[i] == mostCommonBit);

            if (filteredNums.length <= 1) {
                break;
            }
        }
        
        if (!filteredNums.length) {
            return 0;
        }

        const ratingBinary = this.#calculateMostCommonBits(filteredNums);
        return parseInt(ratingBinary, 2);
    }

    get powerConsumption() {
        const gammaRateBinary = this.#calculateMostCommonBits(this.#binaryNums);
        const epsilonRateBinary = gammaRateBinary.split('').map(str => 1 - parseInt(str)).join(''); 
        return parseInt(gammaRateBinary, 2) * parseInt(epsilonRateBinary, 2);
    }
}

module.exports = {
    CreateDataSampleFromFile : async (filePath) => {
        const binaryNums = await ReadFileToArray(filePath);
        return new DiagnosticDataSample(binaryNums);
    }
}