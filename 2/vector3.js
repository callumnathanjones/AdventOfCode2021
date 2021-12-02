'use strict';

class Vector3 {
    x = 0; // left/right
    y = 0; // up/down
    z = 0; // back/forth

    constructor(x = 0, y = 0, z = 0) {
        for (let i = 0; i < arguments.length; i++) {
            if (isNaN(arguments[i])) {
                throw new Error("All Vector3 constructor parameters must be numbers!");
            }
        }

        this.x = x;
        this.y = y;
        this.z = z;
    }

    add(otherVector) {
        if (!(otherVector instanceof Vector3)) {
            throw new Error("Param must be a Vector3!")
        }
        this.x += otherVector.x;
        this.y += otherVector.y;
        this.z += otherVector.z;
    }
}

module.exports = Vector3;