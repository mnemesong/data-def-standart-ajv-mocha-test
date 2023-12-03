# data-def-standart-ajv-mocha-test
Mocha tests for data-def-standart-ajv schemas and values


## Example of usage
```javascript
const dataDefMochaTest = require("data-def-standart-ajv-mocha-test");

const schemaVer = {
    schema: {
        type: ["string", "array"],
        contains: {
            type: "string"
        }
    },
    validValues: ["sdasfa  asda", ["asd", "dsad"], [12, 13]],
    invalidValues: [null, 12, { k: "v" }, [12, 13]],
}
dataDefMochaTest.testSchema(schemaVer); //run tests for schemaVer

const valueVer = {
    schema: {
        type: "null"
    },
    value: null,
}
dataDefMochaTest.testValue(valueVer); //run tests for valueVer
```


## Api
```javascript
module.exports = {
    testSchema: ... //function of type (schemaVersion) => void, that runs mocha tests of schemaVersion,
    //where schemaVersion is schemaVersion from package "data-def-standart-ajv"
    testValue: ... //function of type (valueVersion) => void, that runs mocha tests of valueVersion,
    //where valueVersion is valueVersion from package "data-def-standart-ajv"
}
```

## License 
MIT


## Author
Anatoly Starodubtsev