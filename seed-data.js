const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('polldb.db');
const fs = require ('fs')


let readPolitician = fs.readFileSync('politicians.csv','utf8')
// console.log(readPolitician.split('\n'))
let readVoter = fs.readFileSync('voters.csv','utf8')
let readVote = fs.readFileSync('votes.csv','utf8')

db.serialize(function() {
  let dataPolitician = readPolitician.split('\n')
  // for(let i=1;i<dataPolitician.length;i++){
  //   // console.log(dataPolitician[i].split(','),'---------')
  //   let dataRow = dataPolitician[i].split(',')
  //   // console.log('-----'+dataRow[0]+'--------')
  //   db.run(`insert into Politicians
  //   values (null,'${dataRow[0]}','${dataRow[1]}','${dataRow[2]}',${dataRow[3]})`,function(err){
  //     if(err){
  //       console.log(err)
  //     }
  //   })  
  // }

  //voters
  let dataVoter = readVoter.split('\n')
  // for(let j=1;j<dataVoter.length;j++){
  //   let dataRowVoter = dataVoter[j].split(',')
  //   // console.log(dataRowVoter[0])
  //   db.run(`insert into Voters values(
  //     null,
  //     "${dataRowVoter[0]}",
  //     "${dataRowVoter[1]}",
  //     "${dataRowVoter[2]}",
  //     ${dataRowVoter[3]}
  //   )`,function(err){
  //     if(err){
  //       console.log(err)
  //     }
  //   })
  // }

//votes
let dataVotes = readVote.split('\n')
// console.log(dataVotes,'----------')
for(let k=1;k<dataVotes.length;k++){
  let dataRowVote = dataVotes[k].split(',')
  
  // console.log(dataRowVote[0])
  // db.run(`insert into Votes values(
  //   null,
  //   ${dataRowVote[0]},
  //   ${dataRowVote[1]}
  // )`)
}
});
 
db.close();
