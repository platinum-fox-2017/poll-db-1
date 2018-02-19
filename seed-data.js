const fs = require('fs')

let data1 = fs.readFileSync('./politicians.csv', 'utf8').trim().split('\n')
let data2 = fs.readFileSync('./voters.csv', 'utf8').trim().split('\n')
let data3 = fs.readFileSync('./votes.csv', 'utf8').trim().split('\n')

const sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('poll.db', (err) => {
    if (err) {
        return console.error(err.message);
      }
      console.log('Connected to the in-memory SQlite database.');
})

class Parser {
    static arrmap (arr){
        return arr.map(x => x.split(',')).splice(1)
    }
    static insert (arr, str){
        for (let i = 0; i < arr.length; i++){
            db.run(str, arr[i], (err) =>{
                if (err) return console.log(err.message)
                console.log(`Rows inserted ${i+1}`)
            })
        }
    }
}

let politician = Parser.arrmap(data1)
let insertPolitician = 'INSERT INTO politicians(politician_name, party, location, grade_current) VALUES (?,?,?,?)';
Parser.insert(politician, insertPolitician)

let voter = Parser.arrmap(data2)
let insertVoter = 'INSERT INTO voters(first_name, last_name, gender, age) VALUES (?,?,?,?)'
Parser.insert(voter, insertVoter)

let votes = Parser.arrmap(data3)
let insertVotes = 'INSERT INTO votes(voter_id, politician_id) VALUES (?,?)'
Parser.insert(votes, insertVotes)

// close the database connection
db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
  });