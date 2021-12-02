'use strict';
const fs = require('fs');

module.exports = {
    TypeCheck : (value, expectedType) => {
        if (typeof value != expectedType) {
            throw new Error(`value must be of type ${expectedType}`);
        }
    },

    InstanceCheck : (value, expectedType) => {
        if (!(value instanceof expectedType)) {
            throw new Error(`value must be of type ${expectedType}`);
        }
    },

    ReadFileToArray : async (filePath, delimitter = '\n') => {
        const rStream = fs.createReadStream(filePath, { encoding : 'utf-8' });
    
        return new Promise((resolve, reject) => {
            let fileContents = "";
    
            rStream.on('data', string => {
                fileContents += string;
            });
            
            rStream.on('close', () => {
                resolve(fileContents.split(delimitter));
            });
    
            rStream.on('error', reject);
        });
    }
}