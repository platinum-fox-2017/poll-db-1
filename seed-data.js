const fs = require ('fs')
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

class Politicians {
    constructor(name,party,location,grade_current) {
        this.name = name
        this.party = party
        this.location = location
        this.grade_current = grade_current
    }

    static getData(file) {
        let data = fs.readFileSync(file,'utf-8').split('\r\n')
        console.log(data)
    }
}

Politicians.getData('politicians.csv')