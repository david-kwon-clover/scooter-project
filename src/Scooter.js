class Scooter {
    static nextSerial = 1;
    constructor(station) {
        this.station = station;
        this.user = null;
        this.serial = Scooter.nextSerial;
        this.charge = 100;
        this.isBroken = false;
        Scooter.nextSerial += 1;
    }

    rent(user) {
        if(this.charge <= 20 && this.isBroken === false) {
            throw new Error("scooter needs to charge");
        }
        if(this.charge > 20 && this.isBroken === true) {
            throw new Error("scooter needs repair");
        }
        this.station = null;
        this.user = user;
    }

    dock(station) {
        this.station = station;
        this.user = null; 
    }

    async recharge() {
        console.log('Starting charge');
    
        await new Promise(resolve => setTimeout(resolve, 3000)); 
        this.charge = 100;

        console.log('Charge complete');
    }
    
    async requestRepair() {
        console.log('Starting charge');
    
        await new Promise(resolve => setTimeout(resolve, 3000)); 
        this.isBroken = false;

        console.log('Repair complete');
    }
}

module.exports = Scooter;
