const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('polldb.db');
const fs = require ('fs')


let readPolitician = fs.readFileSync('politicians.csv','utf8')
let readVoter = fs.readFileSync('voters.csv','utf8')
let readVote = fs.readFileSync('votes.csv','utf8')

db.serialize(function() {
  let dataPolitician = readPolitician.split('\n')
  let query = 'insert into Politicians values'
  for(let i=1;i<dataPolitician.length;i++){
    let dataRow = dataPolitician[i].split(',')
    query+=`(null,"${dataRow[0]}","${dataRow[1]}","${dataRow[2]}",${dataRow[3]}),` 
  }

  let newQuery = query.substring(0, query.length - 1)
  // db.run(newQuery)

  //-------------voters-------------------------
  let dataVoter = readVoter.split('\n')
  let arrVoter = []
  for(let j =1;j<dataVoter.length;j++){
    arrVoter.push(dataVoter[j].split(','))
  }

  for(let k =0;k<arrVoter.length;k++){
    // console.log(arrVoter[k][0])
    //   db.run(`insert into Voters values(
    //   null,
    //   "${arrVoter[k][0]}",
    //   "${arrVoter[k][1]}",
    //   "${arrVoter[k][2]}",
    //   ${arrVoter[k][3]}
    // )`)
  }


//votes
let dataVotes = readVote.split('\n')
let queryVotes = 'insert into Votes values'
for(let l=1;l<dataVotes.length;l++){
  let dataRowVote = dataVotes[l].split(',')
  queryVotes+= `(null,${dataRowVote[0]},${dataRowVote[1]}),`
}

let newQueryVote = queryVotes.substring(0,queryVotes.length-1)
  // db.run(newQueryVote)




});
 
db.close();
