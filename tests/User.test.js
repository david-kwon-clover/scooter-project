const { describe, it, expect, beforeEach, test } = require("@jest/globals");
const User = require("../src/User.js");

describe("User", () => {
  let testUser;

  beforeEach(() => {
    testUser = new User("dkwon", "fartguy123", 27);
  });

  describe("User properties", () => {
    it("should have a username property with a string value", () => {
        expect(testUser).toHaveProperty("username", "dkwon");
    });

    it("should have a password property with a string value", () => {
        expect(testUser).toHaveProperty("password", "fartguy123");
    });

    it("should have an age property with a number value", () => {
        expect(testUser).toHaveProperty("age", 27);
    });

    it("should have a loggedIn property with a boolean value", () => {
        expect(testUser).toHaveProperty("loggedIn", false);
    });
    
    it("should start off not logged in", () => {
        expect(testUser.loggedIn).toBe(false);
    });
  });

  describe("User methods", () => {
    describe("login(password) method", () => {
        it("should log in a user with correct password", () => {
            testUser.login("fartguy123");
            expect(testUser.loggedIn).toBe(true);
        })
        it("should handle error for incorrect password", () => {
            expect(() => {testUser.login("dingus743")}).toThrow("incorrect password");
        })
    });
    
    describe("logout() method", () => {
        it("should log out user", () => {
            testUser.login("fartguy123");
            testUser.logout();
            expect(testUser.loggedIn).toBe(false);
        })
    });
  });
});
