const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

class Politicians {
    constructor() {
        this.data = new Array()
    }

    getData() {
        let data = fs.readFileSync('politicians.csv', 'UTF-8').split('\n')
        for (let i = 1; i < data.length; i++) {
            this.data.push(data[i]);
        }
    }

    seedData() {
        let data = '';
        for (let i = 0; i < this.data.length; i++) {
            let splitdata = this.data[i].split(',')
            data += '(' + null + ',' + `'${splitdata[0]}'` + ',' + `'${splitdata[1]}'` + ',' + `'${splitdata[2]}'` + ',' + splitdata[3] +  ')'
            if (this.data.length -1 === i) {
                data += '';
            } else {
                data += ',';
            }
        }
        db.run(`INSERT INTO politicians VALUES ${data}`);
    }

    insertData(name, party, location, grade_current) {
        db.run('INSERT INTO politicians VALUES(null, ?,  ?,  ?,  ?)', name, party, location, grade_current)
    }

    updateData(id, name, party, location, grade_current) {
        db.run('UPDATE politicians SET name = ?, party = ?, location = ?, grade_current = ? WHERE id = ?', name, party, location, grade_current, id);
    }

    deleteData(id) {
        db.run('DELETE FROM politicians WHERE id = ?', id);
    }

    findPartyandGrade(party, start, end) {
        db.all(`SELECT * FROM politicians WHERE party = '${party}' AND grade_current BETWEEN ${start} AND ${end} ORDER BY grade_current ASC`, (err, row) => {
            if(err) throw err
            console.log(row)
        });
    }

    findTotalVote(name) {
        db.all(`SELECT count(votes.politicianId) as TotalVote, name FROM politicians INNER JOIN votes on votes.politicianId = politicians.id WHERE name = '${name}'`, (err, row) => {
            if(err) throw err
            console.log(row)
        })
    }

    findSimiliarName(name) {
        db.all(`SELECT name, count(votes.politicianId) as TotalVote FROM politicians INNER JOIN votes ON votes.politicianId = politicians.id WHERE politicians.name LIKE '${name}%' GROUP BY politicians.name `, (err, row) => {
            if(err) throw err
            console.log(row)
        });
    }

    findMaxVotes() {
        db.all(`SELECT count(votes.politicianId) as TotalVote, name, party, location FROM politicians INNER JOIN votes ON votes.politicianId = politicians.id GROUP BY name ORDER BY TotalVote DESC LIMIT 3`, (err, row) => {
            if(err) throw err
            console.log(row);
        });
    }

    findVoters(name) {
        db.all(`SELECT voters.first_name, voters.last_name, voters.gender, voters.age FROM politicians 
        INNER JOIN votes ON votes.politicianId = politicians.id 
        INNER JOIN voters ON voters.id = votes.voterId WHERE name = '${name}'`, (err, row) => {
            if(err) throw err
            console.log(row)
        });
    }

}


class Voters {
    constructor() {
        this.data = new Array()
    }

    getData() {
        let data = fs.readFileSync('voters.csv', 'UTF-8').split('\n')
        for (let i = 1; i < data.length; i++) {
            this.data.push(data[i]);
        }
    }

    seedData() {
        let data = '';
        for (let i = 0; i < this.data.length; i++) {
            let splitdata = this.data[i].split(',')
            data += "("+ null + "," + `"${splitdata[0]}"` +  "," +  `"${splitdata[1]}"`+ "," + `"${splitdata[2]}"` + "," + splitdata[3] +")"
            if (this.data.length - 1 === i) {
                data += '';
            } else {
                data += ',';
            }
        }
        
        db.run(`INSERT INTO voters VALUES${data}`)
    }
}


class Votes {

    constructor() {
        this.data = new Array()
    }

    getData() {
        let data = fs.readFileSync('votes.csv', 'UTF-8').split('\n')
        for (let i = 1; i < data.length; i++) {
           this.data.push(data[i]);
        }
    }

    seedData() {
    let data = '';
    for (let i = 0; i < this.data.length; i++) {
        let splitdata = this.data[i].split(',')
        data += '(' + null + ',' + splitdata[0] + ',' + splitdata[1] + ')'
        if (this.data.length - 1 === i) {
            data += '';
        } else {
            data += ',';
        }
    }
    db.run(`INSERT INTO votes VALUES${data}`)
    }
}

let politicians = new Politicians
let voters = new Voters
let votes = new Votes

//Turn on to get data
politicians.getData()
voters.getData()
votes.getData()


//Seed data first time
// politicians.seedData()
// voters.seedData()
// votes.seedData()

//Insert Data
// politicians.insertData('Gustaf Pahlevi', 'G', 'J', '9.012')


//Update Data
// politicians.updateData(21, 'Pahlevi', 'P', 'JKT', '0.123')

//Delete Data
// politicians.deleteData(21)


//Get data where politicians have party and have grade_current
// politicians.findPartyandGrade('R', 9, 11);

//Get data politician total vote
// politicians.findTotalVote('Olympia Snowe');

//Get similiar politicians name
// politicians.findSimiliarName('Adam');

//Get Max Votes
// politicians.findMaxVotes();

//Get Voters
politicians.findVoters('Olympia Snowe');