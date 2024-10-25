const { describe, it, expect, beforeEach, test } = require("@jest/globals");
const ScooterApp = require("../src/ScooterApp.js");
const Scooter = require("../src/Scooter.js");
const User = require("../src/User.js");

describe("ScooterApp", () => {
  let testScooter;
  let testApp;
  let testUser;

  beforeEach(() => {
    testApp = new ScooterApp();
    testScooter = new Scooter("Union Station");
    testUser = new User("cityExplorer", "loveScooting", 31);
  });

  describe("ScooterApp properties", () => {
    it("should have a stations property with an object value containing station locations and arrays of scooters", () => {
      testApp.createScooter("Union Station");
      testApp.createScooter("Union Station");
      testApp.createScooter("Central Park");
      testApp.createScooter("Convention Center");
      testApp.createScooter("Convention Center");
      testApp.createScooter("Convention Center");
      expect(testApp).toHaveProperty("stations");
      expect(testApp.stations).toHaveProperty("Union Station");
      expect(testApp.stations).toHaveProperty("Central Park");
      expect(testApp.stations).toHaveProperty("Convention Center");
      expect(testApp.stations["Union Station"].length).toBe(2);
      expect(testApp.stations["Central Park"].length).toBe(1);
      expect(testApp.stations["Convention Center"].length).toBe(3);
      expect(testApp.stations["Union Station"][0]).toBeInstanceOf(Scooter);
      expect(testApp.stations["Central Park"][0]).toBeInstanceOf(Scooter);
      expect(testApp.stations["Convention Center"][0]).toBeInstanceOf(Scooter);
    });

    it("should have no scooters at any stations initially", () => {
      expect(testApp.stations["Union Station"].length).toBe(0);
      expect(testApp.stations["Central Park"].length).toBe(0);
      expect(testApp.stations["Convention Center"].length).toBe(0);
    });

    it("should have a registeredUsers property with an object value with keys of usernames to store all users", () => {
      testApp.registerUser("dingus", "iLikeWaffles27", 24);
      testApp.registerUser("bigChonker", "wonderfulBeans17", 32);
      expect(testApp).toHaveProperty("registeredUsers");
      expect(testApp.registeredUsers).toHaveProperty("dingus");
      expect(testApp.registeredUsers).toHaveProperty("bigChonker");
      expect(testApp.registeredUsers["dingus"]).toEqual({
        username: "dingus",
        password: "iLikeWaffles27",
        age: 24,
        loggedIn: false,
      });
      expect(testApp.registeredUsers["dingus"]).toBeInstanceOf(User);
      expect(testApp.registeredUsers["bigChonker"]).toEqual({
        username: "bigChonker",
        password: "wonderfulBeans17",
        age: 32,
        loggedIn: false,
      });
      expect(testApp.registeredUsers["bigChonker"]).toBeInstanceOf(User);
    });

    it("should have no registered users initially", () => {
      expect(testApp.registeredUsers).toEqual({});
    });
  });

  describe("ScooterApp methods", () => {
    describe("registerUser(username, password, age) method", () => {
      it("should register and return the user successfully", () => {
        testApp.registerUser("dingus", "iLikeWaffles27", 24);
        expect(testApp.registeredUsers).toHaveProperty("dingus");
        expect(testApp.registeredUsers["dingus"]).toEqual({
          username: "dingus",
          password: "iLikeWaffles27",
          age: 24,
          loggedIn: false,
        });
      });

      it("should handle error if user is already registered", () => {
        testApp.registerUser("dingus", "iLikeWaffles27", 24);
        expect(() => {
          testApp.registerUser("dingus", "iLikeWaffles27", 24);
        }).toThrow("already registered");
      });

      it("should handle error if user is too young to register", () => {
        expect(() => {
          testApp.registerUser("dingus", "iLikeWaffles27", 7);
        }).toThrow("too young to register");
      });
    });

    describe("loginUser(username, password) method", () => {
      it("should successfully login a user", () => {
        testApp.registerUser("dingus", "iLikeWaffles27", 24);
        const loggedInUser = testApp.loginUser("dingus", "iLikeWaffles27");
        expect(loggedInUser).toEqual({
          username: "dingus",
          password: "iLikeWaffles27",
          age: 24,
          loggedIn: true,
        });
      });

      it("should log a message upon successful login", () => {
        const consoleSpy = jest.spyOn(console, "log");
        testApp.registerUser("dingus", "iLikeWaffles27", 24);
        const loggedInUser = testApp.loginUser("dingus", "iLikeWaffles27");
        expect(consoleSpy).toHaveBeenCalledWith("user has been logged in");
      });

      it("should handle error if user cannot be located", () => {
        testApp.registerUser("dingus", "iLikeWaffles27", 24);
        expect(() => {
          testApp.loginUser("dongus", "iLikeWaffles27");
        }).toThrow("Username or password is incorrect");
      });

      it("should handle error is password is incorrect", () => {
        testApp.registerUser("dingus", "iLikeWaffles27", 24);
        expect(() => {
          testApp.loginUser("dingus", "iLikePancakes92");
        }).toThrow("Username or password is incorrect");
      });
    });

    describe("logoutUser(username) method", () => {
      it("should successfully logout a user", () => {
        testApp.registerUser("dingus", "iLikeWaffles27", 24);
        testApp.loginUser("dingus", "iLikeWaffles27");
        testApp.logoutUser("dingus");
        expect(testApp.registeredUsers["dingus"].loggedIn).toBe(false);
      });

      it("should log a message upon successful logout", () => {
        const consoleSpy = jest.spyOn(console, "log");
        testApp.registerUser("dingus", "iLikeWaffles27", 24);
        testApp.loginUser("dingus", "iLikeWaffles27");
        testApp.logoutUser("dingus");
        expect(consoleSpy).toHaveBeenCalledWith("user is logged out");
      });

      it("should handle error if user cannot be located", () => {
        expect(() => {
          testApp.logoutUser("schlongus");
        }).toThrow("no such user is logged in");
      });
    });

    describe("createScooter(station) method", () => {
      it("should successfully create a scooter and add it to the station's list", () => {
        testApp.createScooter("Union Station");
        expect(testApp.stations["Union Station"][0]).toBeInstanceOf(Scooter);
      });

      it("should successfully set the scooter station property", () => {
        testApp.createScooter("Union Station");
        expect(testApp.stations["Union Station"][0].station).toBe(
          "Union Station"
        );
      });

      it("should log a message upon successful creation", () => {
        const consoleSpy = jest.spyOn(console, "log");
        testApp.createScooter("Union Station");
        expect(consoleSpy).toHaveBeenCalledWith("created new scooter");
      });

      it("should return the scooter upon successful creation", () => {
        expect(testApp.createScooter("Union Station")).toEqual({
          station: "Union Station",
          user: null,
          serial: 28,
          charge: 100,
          isBroken: false,
        });
      });

      it("should handle error is station does not exist", () => {
        expect(() => {
          testApp.createScooter("Narnia");
        }).toThrow("no such station error");
      });
    });

    describe("dockScooter(scooter, station) method", () => {
      it("should successfully add the scooter to the station's list", () => {
        testScooter.rent(testUser);
        testApp.dockScooter(testScooter, "Convention Center");
        expect(testApp.stations["Convention Center"][0]).toEqual(testScooter);
      });

      it("should log a message upon successful docking", () => {
        const consoleSpy = jest.spyOn(console, "log");
        testScooter.rent(testUser);
        testApp.dockScooter(testScooter, "Convention Center");
        expect(consoleSpy).toHaveBeenCalledWith("scooter is docked");
      });

      it("should handle error if station does not exist", () => {
        testScooter.rent(testUser);
        expect(() => {
          testApp.dockScooter(testScooter, "Polar Express");
        }).toThrow("no such station");
      });

      it("should handle error if scooter is already at station", () => {
        testApp.dockScooter(testScooter, "Union Station");
        expect(() => {
          testApp.dockScooter(testScooter, "Union Station");
        }).toThrow("scooter already at station");
      });
    });

    describe("rentScooter(scooter, user) method", () => {
      it("should locate the scooter at one of the stations and remove it", () => {
        const rentScooter = testApp.createScooter("Convention Center");
        testApp.rentScooter(rentScooter, testUser);
        expect(testApp.stations["Convention Center"]).toHaveLength(0);
      });

      it("should successfully rent the scooter to user", () => {
        const rentScooter = testApp.createScooter("Convention Center");
        testApp.rentScooter(rentScooter, testUser);
        expect(rentScooter.user).toEqual(testUser);
      });

      it("should log a message upon successfully renting scooter to user", () => {
        const consoleSpy = jest.spyOn(console, "log");
        const rentScooter = testApp.createScooter("Convention Center");
        testApp.rentScooter(rentScooter, testUser);
        expect(consoleSpy).toHaveBeenCalledWith("scooter is rented");
      });

      it("should handle error if scooter is already rented", () => {
        const rentScooter = testApp.createScooter("Convention Center");
        const newUser = new User("newGuy", "wowza", 34);
        testApp.rentScooter(rentScooter, testUser);
        expect(() => {
          testApp.rentScooter(rentScooter, newUser);
        }).toThrow("scooter already rented");
      });
    });
  });
});
