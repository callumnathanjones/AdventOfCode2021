'use strict';
const { ReadFileToArray } = require('./util');

class LanternFishGroup {
    #timer = 0;
    #timerElapsedCallback = null;
    #groupSize = 1;

    get groupSize() { return this.#groupSize; }
    get timer() { return this.#timer; }

    constructor(startTime, groupSize = 1, onTimerElapsedCallback = null) {
        if (isNaN(startTime) || startTime < 0) {
            throw new Error("Invalid startTime")
        }
        this.#groupSize = groupSize;
        this.#timer = startTime;
        this.#timerElapsedCallback = onTimerElapsedCallback;
    }

    onDayPassed() {
        this.#timer--;
        if (this.#timer < 0) {
            this.#timer = 6;

            if (this.#timerElapsedCallback) {
                this.#timerElapsedCallback(this.#groupSize);
            }
        }
    }
}

module.exports = {
    SimulateFromFile : async (filePath, numDays = 80) => {
        /** @type {LanternFishGroup[]} */
        const fish = [];
        let numFishToAdd = 0;
        const addFish = (num, inGroupSize = 1) => {
            const newFish = new LanternFishGroup(num, inGroupSize, (outGroupSize) => {
                numFishToAdd += outGroupSize;
            });
            fish.push(newFish);
        };
        (await ReadFileToArray(filePath, ',')).forEach(str => addFish(parseInt(str)));

        for (let i= 0; i < numDays; i++) {
            console.log(`Simulating day ${i + 1}...`);
            fish.forEach(fishy => fishy.onDayPassed());

            if (numFishToAdd > 0) {
                addFish(8, numFishToAdd);
                numFishToAdd = 0;
            }
        }

        let totalFish = 0;
        for (let i = 0; i < fish.length; i++) {
            totalFish += fish[i].groupSize;
        }
        return totalFish;
    }, 
}