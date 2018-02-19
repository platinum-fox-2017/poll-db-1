const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');
const fs = require ('fs')

let politicians = fs.readFileSync('politicians.csv','utf-8').split('\n')
let voters = fs.readFileSync('voters.csv','utf-8').split('\n')
let votes = fs.readFileSync('votes.csv','utf-8').split('\n')

db.serialize(function() {
    let result = []
    // for(let i = 0 ;i < politicians.length-1 ; i++){
    //     result.push(politicians[i].split(','))
    // }
   
    // for(let i = 1 ; i < result.length ; i++){
    //     db.run(`insert into Politicians values(null,'${result[i][0]}','${result[i][1]}','${result[i][2]}',${result[i][3]})`)
    // }
    //====================================================================
    // for(let i = 0 ;i < voters.length-1 ; i++){
    //     result.push(voters[i].split(','))
    // }
   
    // for(let i = 1 ; i < result.length ; i++){
    //     db.run(`insert into Voters values(null,"${result[i][0]}","${result[i][1]}","${result[i][2]}",${result[i][3]})`)
    // }
    //==========================================================================
    // for(let i = 0 ;i < votes.length-1 ; i++){
    //     result.push(votes[i].split(','))
    // }
       
    // for(let i = 1 ; i < result.length ; i++){
    //     db.run(`insert into Votes values(${result[i][0]},${result[i][1]})`)
    // }
  });
   
  db.close();