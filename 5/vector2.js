'use strict';

class Vector2 {
    x = 0;
    y = 0;

    constructor(x = 0, y = 0) {
        for (let i = 0; i < arguments.length; i++) {
            if (isNaN(arguments[i])) {
                throw new Error("All Vector2 constructor parameters must be numbers!");
            }
        }

        this.x = x;
        this.y = y;
    }

    toString() {
        return `X: ${this.x.toString()} | Y: ${this.y.toString()}`
    }

    isZero(tolerance = 0.0001) {
        return this.x < tolerance && this.y < tolerance;
    }

    dot(otherVector) {
        if (!(otherVector instanceof Vector2)) {
            throw new Error("Param must be a Vector2!")
        }

        return (this.x * otherVector.x) + (this.y * otherVector.y);
    }

    add(otherVector) {
        if (!(otherVector instanceof Vector2)) {
            throw new Error("Param must be a Vector2!")
        }

        return new Vector2(
            this.x + otherVector.x,
            this.y + otherVector.y
        );
    }

    minus(otherVector) {
        if (!(otherVector instanceof Vector2)) {
            throw new Error("Param must be a Vector2!")
        }

        return new Vector2(
            this.x - otherVector.x,
            this.y - otherVector.y
        );
    }
}

module.exports = Vector2;