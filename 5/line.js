'use strict';

class LineSegment2d {

    /** @type {Vector2} */
    a = null;
    /** @type {Vector2} */
    b = null;

    get dot() {
        const ab = this.b.minus(this.a);
        return ab.dot(ab);
    }

    get length() {
        return Math.sqrt(this.dot);
    }

    get minMax() {
        return {
            x : {
                min : this.a.x < this.b.x ? this.a.x : this.b.x,
                max : this.a.x > this.b.x ? this.a.x : this.b.x,
            },
            y : {
                min : this.a.y < this.b.y ? this.a.y : this.b.y,
                max : this.a.y > this.b.y ? this.a.y : this.b.y,
            }
        }
    }

    constructor(pointA, pointB) {
        this.a = pointA;
        this.b = pointB;
    }
}

module.exports = LineSegment2d;