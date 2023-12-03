const index = require("../src/index");

const schemaValidExamples = [
    {
        schema: {
            type: "null"
        },
        validValues: [null],
        invalidValues: [12, "ajasd", { type: null }],
    },
    {
        schema: {
            type: ["string", "array"],
            contains: {
                type: "string"
            }
        },
        validValues: ["sdasfa  asda", ["asd", "dsad"]],
        invalidValues: [null, 12, { k: "v" }, [12, 13]],
    },
    {
        schema: {
            type: "object",
            properties: {
                k1: {
                    type: "string",
                    nullable: true
                },
                k2: {
                    type: "integer"
                }
            },
            required: ["k1"]
        },
        validValues: [{ k1: "dasd" }, { k1: null, k2: 12 }],
        invalidValues: [null, 12, { k: "v" }, [12, 13], { k1: 12, k2: 12 }],
    },
];
schemaValidExamples.forEach(s => {
    index.testSchema(s);
});

const schemaInvalidExamples = [
    {
        schema: {
        },
        validValues: [null],
    },
    {
        schema: {
            type: "null"
        },
        validValues: [null],
    },
    {
        schema: {
            type: ["string", "array"],
            contains: {
                type: "string"
            }
        },
        validValues: ["sdasfa  asda", ["asd", "dsad"], [12, 13]],
        invalidValues: [null, 12, { k: "v" }, [12, 13]],
    },
    {
        schema: {
            type: "object",
            properties: {
                k1: {
                    type: "string",
                    nullable: true
                },
                k2: {
                    type: "integer"
                }
            },
            required: ["k1"]
        },
        validValues: [{ k1: "dasd" }, { k1: null, k2: 12 }],
        invalidValues: [null, 12, { k: "v" }, [12, 13], { k1: 12, k2: 12 }, { k1: "dasd" },],
    },
];
schemaInvalidExamples.forEach(s => {
    index.testSchema(s, false);
});

const valueValidExamples = [
    {
        schema: {
            type: "null"
        },
        value: null,
    },
    {
        schema: {
            type: ["string", "array"],
            contains: {
                type: "string"
            }
        },
        value: ["asd", "dsad"],
    },
    {
        schema: {
            type: ["string", "array"],
            contains: {
                type: "string"
            }
        },
        value: "sdasfa  asda",
    },
    {
        schema: {
            type: "object",
            properties: {
                k1: {
                    type: "string",
                    nullable: true
                },
                k2: {
                    type: "integer"
                }
            },
            required: ["k1"]
        },
        value: { k1: "dasd" },
    },
    {
        schema: {
            type: "object",
            properties: {
                k1: {
                    type: "string",
                    nullable: true
                },
                k2: {
                    type: "integer"
                }
            },
            required: ["k1"]
        },
        value: { k1: null, k2: 12 },
    },
];
valueValidExamples.forEach(s => {
    index.testValue(s);
});

const valueInvalidExamples = [
    {
        schema: {
            type: "null"
        },
        value: 12,
    },
    {
        schema: {
            type: "null"
        },
    },
    {
        schema: {
            type: ["string", "array"],
            contains: {
                type: "string"
            }
        },
        invalidValues: [null, 12, { k: "v" }, [12, 13]],
    },
    {
        schema1: {
            type: "object",
            properties: {
                k1: {
                    type: "string",
                    nullable: true
                },
                k2: {
                    type: "integer"
                }
            },
            required: ["k1"]
        },
        value: { k1: "v" },
    },
];
valueInvalidExamples.forEach(s => {
    index.testValue(s, false);
});