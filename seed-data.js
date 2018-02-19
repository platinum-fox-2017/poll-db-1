const fs = require ('fs');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

let politicians_data = fs.readFileSync('./politicians.csv','utf-8');
let voters_data = fs.readFileSync('./voters.csv','utf-8');
let votes_data = fs.readFileSync('./votes.csv','utf-8');

politicians_data = (politicians_data.trim().split('\n'));
voters_data = (voters_data.trim().split('\n'));
votes_data = (votes_data.trim().split('\n'));

class Politicians {
    static insert(){
        politicians_data.forEach((v,i,a)=>{
            if(i !== 0){
                v = v.split(',');
                console.log(v);
                console.log(v[0]);
                db.run(`insert into candidate(name,party,location,grade_current)
                values('${v[0]}','${v[1]}','${v[2]}','${v[3]}')`);
            }
        })
    }
}
class Voters {
    static insert(){
        voters_data.forEach((v,i,a)=>{
            if(i !== 0){
                v = v.split(',');
                console.log(v);
                db.run(`insert into voter (first_name,last_name,gender,age)
                values('${v[0]}',"${v[1]}",'${v[2]}',${v[3]})`);
            }
        })
    }
}
class Votes {
    static insert(){
        votes_data.forEach((v,i,a)=>{
            if(i !== 0){
                v = v.split(',');
                db.run(`insert into votes (voter_id,candidate_id)
                values(${v[0]},${v[1]})`);
            }
        })
    }
}
// Politicians.insert();
// Voters.insert();
// Votes.insert();
