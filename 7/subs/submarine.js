'use strict';
const Vector2 = require('../vector2');

class Submarine
{
    pos = new Vector2();
    #aim = 0;

    constructor(initialPos = new Vector2()) {
        if (initialPos instanceof Vector2) { 
            this.pos = initialPos;
        }
    }

    /**
     * Moves the submarine using a command.
     * Does not account for aim. (Day 2 Part 1 answer).
     * @deprecated
     * @param {string} inCommand 
     */
    moveByCommandDeprecated(inCommand) {
        const keywords = inCommand.split(' ');
        if (keywords.length == 2) {
            const magnitude = parseInt(keywords[1]);

            switch(keywords[0]) {
                case "up":
                    this.move(new Vector2(0, magnitude));
                    break;
                case "down":
                    this.move(new Vector2(0, -magnitude));
                    break;
                case "forward":
                    this.move(new Vector2(0, magnitude));
                    break;
            }
        }
    }

    /**
     * Moves the submarine using a command.
     * @param {string} inCommand 
     */
    moveByCommand(inCommand) {
        const keywords = inCommand.split(' ');
        if (keywords.length == 2) {
            const magnitude = parseInt(keywords[1]);

            switch(keywords[0]) {
                case "up":
                    this.#aim += magnitude;
                    break;
                case "down":
                    this.#aim -= magnitude;
                    break;
                case "forward":
                    this.move(new Vector2(0, this.#aim * magnitude, magnitude));
                    break;
            }
        }
    }

    move(vector) {
        this.pos = this.pos.add(vector);
    }

    setPos(vector) {
        this.pos = vector;
    }

    getPos() {
        return this.pos;
    }
}

module.exports = Submarine;