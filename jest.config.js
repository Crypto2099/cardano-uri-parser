/** @type {import("jest").Config} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/tests/**/*.test.ts"],
    moduleFileExtensions: [
        "ts",
        "js",
        "json"
    ],
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageReporters: [
        "text",
        "lcov"
    ],
    coverageThreshold: {
        "global": {
            "branches": 90,
            "functions": 90,
            "lines": 90,
            "statements": 90
        }
    }
};
