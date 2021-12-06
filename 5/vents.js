'use strict';
const Vector2 = require('./vector2');
const { ReadFileToArray } = require('./util');
const LineSegment2d = require('./line')
const fs = require('fs');

class HydrothermalVentsDataSample {

    /** @type {LineSegment2d[]} */
    #vents = [];

    /** @type {number[][]} */
    #grid = [];

    constructor(inVents, allowDiagonal = true) {
        inVents.forEach(vent => {
            if (!(vent instanceof LineSegment2d)) {
                throw new Error("Param must be an array containing only Line objects.");
            }
            //console.log(`A (${vent.a.toString()}) | B (${vent.b.toString()})`);
        });

        this.allowDiagonal = allowDiagonal;
        this.#vents = inVents;
        this.#processToGrid();
    }

    static async CreateFromFile(filePath, allowDiagonal) {
        let lines = [];

        (await ReadFileToArray(filePath)).forEach(lineStr => {
            const pointsVector = [];
            const pointsStr = lineStr.split('->');
            pointsStr.forEach(point => {
                const nums = point.split(',').map(Number);
                pointsVector.push(new Vector2(...nums));
            });
            
            if (pointsVector.length == 2) {
                lines.push(new LineSegment2d(...pointsVector));
            }
        });

        return new HydrothermalVentsDataSample(lines, allowDiagonal);
    }

    get numDangerousAreas() {
        let ret = 0;

        this.#grid.forEach(row => row.forEach(num => {
            if (num >= 2) {
                ret++;
            }
        }));

        return ret;
    }

    async saveGridToFile(filePath) {
        return new Promise((resolve, reject) => {
            fs.writeFile(filePath, this.#gridToString(), (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    
    #processToGrid() {
        this.#vents.forEach(line => {

            const bounds = line.minMax;
            for (let i = 0; i <= bounds.y.max; i++) {
                const maxJ = !this.#grid[i] || bounds.x.max > this.#grid[i].length - 1 ? bounds.x.max : this.#grid.length - 1;
                for (let j = 0; j <= maxJ; j++) {
                    if (this.#grid[i] == undefined) {
                        this.#grid[i] = [];
                    }

                    if (this.#grid[i][j] == undefined) {
                        this.#grid[i][j] = 0;
                    }
                }
            }
        });

        this.#vents.forEach(line => {
            const bounds = line.minMax;

            const gradient = (line.b.y - line.a.y) / (line.b.x - line.a.x);
            if (gradient == 1 && this.allowDiagonal) {
                for (let i = bounds.y.min; i <= bounds.y.max; i++) {
                    this.#grid[i][bounds.x.min + i - bounds.y.min]++;
                }
            }
            else if (gradient == -1 && this.allowDiagonal) {
                for (let i = bounds.y.min; i <= bounds.y.max; i++) {
                    this.#grid[i][bounds.x.max - (i - bounds.y.min)]++;
                }
            }
            else if (gradient != 1 && gradient != -1) {
                for (let i = bounds.y.min; i <= bounds.y.max; i++) {
                    for (let j = bounds.x.min; j <= bounds.x.max; j++) {
                        this.#grid[i][j]++;
                    }
                }
            }
            
        })

        // const output = this.#gridToString();
        // console.log(output);
    }
    
    #gridToString() {
        return this.#grid.map(row => row.map(num => {
            return (!num ? '.' : num.toString()).padStart(3, ' ');
        }).join('')).join('\n');
    }
}

class VentsService {
    constructor() {}

    async CreateFromFile(filePath, allowDiagonal = true) {
        return await HydrothermalVentsDataSample.CreateFromFile(filePath, allowDiagonal);
    }

}

module.exports = new VentsService();