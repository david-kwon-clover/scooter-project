const { describe, it, expect } = require("@jest/globals");
const Scooter = require("../src/Scooter.js");

describe("example test", () => {
  it("basic test", () => {
    expect(true).toBe(true);
  });
});

describe("Scooter properties", () => {
  it("should have a station property with a string value of location", () => {});

  it("should have a station property with a null value if checked out", () => {});

  it("should have a user property with a User instance if checked out", () => {});

  it("should have a user property with a null value if docked", () => {});

  it("should have a serial property with a numnber value", () => {});

  it("should have a nextSerial static property with a number value starting at 1 and incrementing for each instance of Scooter created", () => {});

  it("should have a charge property with a number value from 0 to 100", () => {});

  it("should have a isBroken property with a boolean value", () => {});

  it("should start off docked - valid string station and null user", () => {});

  it("should start off with a charge value of 100", () => {});

  it("should start off with a isBroken value of false", () => {});
});

describe("Scooter methods", () => {
  describe("rent(user) method", () => {
    it("should rent to user if Scooter is above 20% charge and not broken", () => {});

    it("should handle errors for insufficient charge", () => {});

    it("should handle errors for broken Scooters", () => {});
  });

  describe("dock(station) method", () => {
    it("should return scooter to the station", () => {});

    it("should clear the user", () => {});
  });

  describe("recharge() method", () => {
    it("should recharge a Scooter instance", async () => {
      const scooter = new Scooter();
      await scooter.charge();
      expect(scooter.charge).toBe(100);
    });
  });

  describe("requestRepair() method", () => {
    it("should repair a Scooter instance", async () => {
      const scooter = new Scooter();
      scooter.isBroken = true;
      await scooter.requestRepair();
      expect(scooter.isBroken).toBe(false);
    });
  });
});
