const User = require("./User.js");
const Scooter = require("./Scooter.js");

class ScooterApp {
  constructor() {
    this.stations = {
      "Union Station": [],
      "Central Park": [],
      "Convention Center": [],
    };
    this.registeredUsers = {};
  }

  registerUser(username, password, age) {
    if (this.registeredUsers[username]) {
      throw new Error("already registered");
    }
    if (age < 18) {
      throw new Error("too young to register");
    }

    const registeredUser = new User(username, password, age);
    this.registeredUsers[registeredUser.username] = registeredUser;
    console.log("user has been registered");
    return registeredUser;
  }

  loginUser(username, password) {
    const targetUser = this.registeredUsers[username];
    if (!targetUser || password !== targetUser.password) {
      throw new Error("Username or password is incorrect");
    }
    targetUser.login(password);
    console.log("user has been logged in");
    return this.registeredUsers[username];
  }

  logoutUser(username) {
    try {
      this.registeredUsers[username].logout();
    } catch {
      throw new Error("no such user is logged in");
    } finally {
      console.log("user is logged out");
    }
  }

  createScooter(station) {
    if (!Object.keys(this.stations).includes(station)) {
      throw new Error("no such station error");
    }
    const newScooter = new Scooter(station);
    this.stations[station].push(newScooter);
    console.log("created new scooter");
    return newScooter;
  }

  dockScooter(scooter, station) {
    if (!this.stations[station]) {
      throw new Error("no such station");
    }
    let targetStationSerials = [];
    if (this.stations[station].length > 0) {
      targetStationSerials = this.stations[station].map((scooter) => {
        return scooter.serial;
      });
    }
    if (targetStationSerials.includes(scooter.serial)) {
      throw new Error("scooter already at station");
    }

    scooter.dock(station);
    this.stations[station].push(scooter);
    console.log("scooter is docked");
  }

  rentScooter(scooter, user) {
    if (scooter.user) {
      throw new Error("scooter already rented");
    }
    const targetSerial = scooter.serial;
    const targetStation = this.stations[scooter.station];
    const targetSerials = targetStation.map((scooter) => {
      return scooter.serial;
    });
    const targetIndex = targetStation.indexOf(targetSerials.find((serial) => {
      return serial === targetSerial;
    }));
    scooter.rent(user);
    targetStation.splice(targetIndex, 1);
    console.log("scooter is rented");
  }
}

module.exports = ScooterApp;
