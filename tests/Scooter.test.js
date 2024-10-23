const { describe, it, expect } = require("@jest/globals");

describe("example test", () => {
    it("basic test", () => {
        expect(true).toBe(true);
    })
})

describe("Scooter properties", () => {
    it("should have a station property with a string value of location", () => {
        
    })

    it("should have a station property with a null value if checked out", () => {

    })

    it("should have a user property with a User instance if checked out", () => {

    })

    it("should have a user property with a null value if docked", () => {

    })

    it("should have a serial property with a numnber value", () => {

    })

    it("should have a nextSerial static property with a number value starting at 1 and incrementing for each instance of Scooter created", () => {

    })

    it("should have a charge property with a number value from 0 to 100", () => {

    })

    it("should have a isBroken property with a boolean value", () => {

    })

    it("should start off docked - valid string station and null user", () => {

    })

    it("should start off with a charge value of 100", () => {

    })

    it("should start off with a isBroken value of false", () => {

    })

})