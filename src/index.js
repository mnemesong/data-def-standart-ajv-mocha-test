const assert = require("assert");
const dataDefStandartAjv = require("data-def-standart-ajv");
const Ajv = require("ajv");
const ajv = new Ajv();

module.exports = {};

const stringifySchema = (schema) => {
    const result = !!schema.schema
        ? JSON.stringify(schema.schema)
        : "<no schema>";
    return (result.length > 50)
        ? result.substring(0, 50) + "..."
        : result;
};
const testSchema = (schemaVer, testValid = true) => {
    describe("test schema " + stringifySchema(schemaVer), () => {
        const valid = ajv.compile(dataDefStandartAjv.schemaVersion);
        const result = valid(schemaVer);
        if (testValid) {
            it("test schema of schema", () => {
                if (!result) console.log("invalid reason: ", valid.errors);
                assert.ok(result);
            });
            if (result) {
                schemaVer.validValues.forEach(v => {
                    it("test valid value " + JSON.stringify(v), () => {
                        const valid = ajv.compile(schemaVer.schema);
                        const result = valid(v);
                        if (!result) console.log("invalid reason: ", valid.errors);
                        assert.ok(result);
                    });
                });
                schemaVer.invalidValues.forEach(v => {
                    it("test invalid value " + JSON.stringify(v), () => {
                        const valid = ajv.compile(schemaVer.schema);
                        const result = valid(v);
                        assert.ok(!result);
                    });
                });
            }
        } else {
            it("test schema " + stringifySchema(schemaVer) + " is invalid", () => {
                const finalResult = [result];
                if (result) {
                    schemaVer.validValues.forEach(v => {
                        const valid = ajv.compile(schemaVer.schema);
                        const result = valid(v);
                        finalResult.push(result);
                    });
                    schemaVer.invalidValues.forEach(v => {
                        const valid = ajv.compile(schemaVer.schema);
                        const result = valid(v);
                        finalResult.push(!result);
                    });
                }
                assert.ok(finalResult.includes(false), "schema, thats should be invalid is valid");
            });
        }
    });
};
module.exports.testSchema = testSchema;

const stringifyValue = (valueVer) => {
    const result = !!valueVer.value
        ? JSON.stringify(valueVer.value)
        : "";
    return (result.length > 50)
        ? result.substring(0, 50) + "..."
        : result;
};
const testValue = (valueVer, testValid = true) => {
    describe("test value " + stringifyValue(valueVer), () => {
        const valid = ajv.compile(dataDefStandartAjv.valueVersion);
        const result = valid(valueVer);
        if (testValid) {
            it("test schema of value", () => {
                if (!result) console.log("invalid reason: ", valid.errors);
                assert.ok(result);
            });
            if (result) {
                it("test is valid value", () => {
                    const valid = ajv.compile(valueVer.schema);
                    const result = valid(valueVer.value);
                    if (!result) console.log("invalid reason: ", valid.errors);
                    assert.ok(result);
                });
            }
        } else {
            it("test value is invalid", () => {
                const finalResult = [result];
                if (result) {
                    const valid = ajv.compile(valueVer.schema);
                    const result2 = valid(valueVer.value);
                    finalResult.push(result2);
                }
                assert.ok(finalResult.includes(false), "schema, thats should be invalid is valid");
            });
        }
    });
};
module.exports.testValue = testValue;