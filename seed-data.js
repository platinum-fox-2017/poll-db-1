const sqlite3 = require('sqlite3').verbose();
const fs = require('fs')

let db = new sqlite3.Database('./poll.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the database.');
  });

function readDataVoters(callback){
    fs.readFile('./voters.csv', 'UTF-8', (err, data) => {
        if (err) throw err;
        let dataToArr = data.trim().split('\n');
        let result = [];
        for(let i=0; i<dataToArr.length; i++){
            let row = dataToArr[i].split(',');
            result.push(row);
        }
        callback(result);
      });
}

function insertDataVoters(data){
    db.serialize(function() {
        var stmt = db.prepare("INSERT INTO Voters (firstName, lastName, gender, age) VALUES (?, ?, ?, ?)");
        for (var i = 1; i < data.length; i++) {
            stmt.run(data[i][0], data[i][1], data[i][2], data[i][3]);
        }
        stmt.finalize();
    });
}

function readDataPoliticians(callback){
    fs.readFile('./politicians.csv', 'UTF-8', (err, data) => {
        if (err) throw err;
        let dataToArr = data.trim().split('\n');
        let result = [];
        for(let i=0; i<dataToArr.length; i++){
            let row = dataToArr[i].split(',');
            result.push(row);
        }
        callback(result);
      });
}

function insertDataPoliticians(data){
    db.serialize(function() {
        var stmt = db.prepare("INSERT INTO Politicians (name, party, location, gradeCurrent) VALUES (?, ?, ?, ?)");
        for (var i = 1; i < data.length; i++) {
            stmt.run(data[i][0], data[i][1], data[i][2], data[i][3]);
        }
        stmt.finalize();
    });
}

function readDataVotes(callback, closeDb){
    fs.readFile('./votes.csv', 'UTF-8', (err, data) => {
        if (err) throw err;
        let dataToArr = data.trim().split('\n');
        let result = [];
        for(let i=0; i<dataToArr.length; i++){
            let row = dataToArr[i].split(',');
            result.push(row);
        }
        callback(result, closeDb);
      });
}

function insertDataVotes(data, callback){
    db.serialize(function() {
        var stmt = db.prepare("INSERT INTO Votes (idVoters, idPoliticians) VALUES (?, ?)");
        for (var i = 1; i < data.length; i++) {
            stmt.run(data[i][0], data[i][1]);
        }
        stmt.finalize();
    });
    callback();
}

function closeDb(){
    db.close();
}

readDataVoters(insertDataVoters);
readDataPoliticians(insertDataPoliticians)
readDataVotes(insertDataVotes, closeDb)
