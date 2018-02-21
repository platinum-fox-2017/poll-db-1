const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll.db')

var fs = require('fs')
var votersData = fs.readFileSync('./voters.csv').toString().trim().split("\n")
var politiciansData = fs.readFileSync('./politicians.csv').toString().trim().split("\n")
var votesData = fs.readFileSync('./votes.csv').toString().trim().split("\n")

db.serialize(function(){
    var stmt = db.prepare('INSERT INTO Voters(first_name, last_name, gender, age) VALUES (?,?,?,?)')
    
    for(let i=1; i<votersData.length; i++){
        let voters = votersData[i].split(',')
        let firstName = voters[0]
        let lastName = voters[1]
        let gender = voters[2]
        let age = voters[3] 
        stmt.run([firstName,lastName,gender,age])
    }
    stmt.finalize()
    console.log('Insert Data Voters Success')


    var stmt = db.prepare('INSERT INTO Politicians(name, party, location, grade_current) VALUES(?,?,?,?)')
    
    for(let i=1; i<politiciansData.length; i++){
        let politicians = politiciansData[i].split(',')
        let name = politicians[0]
        let party = politicians[1]
        let location = politicians [2]
        let grade = politicians[3]
        stmt.run([name,party,location,grade])
    }
    stmt.finalize()
    console.log('Insert Data Politicians Success')


    var stmt = db.prepare('INSERT INTO Voting(voterId, politicianId) VALUES (?,?)')
    for(let i=1; i<votesData.length; i++ ){
        let voting = votesData[i].split(',')
        let voterId = voting[0]
        let politicianId = voting[1]

        stmt.run([voterId, politicianId])
    }
    stmt.finalize()
    console.log('Insert Data Voting Success')
})
db.close()

    