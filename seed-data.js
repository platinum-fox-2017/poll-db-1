const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');
const fs = require ('fs')

let politicians = fs.readFileSync('politicians.csv','utf-8').split('\n')
let voters = fs.readFileSync('voters.csv','utf-8').split('\n')
let votes = fs.readFileSync('votes.csv','utf-8').split('\n')

db.serialize(function() {
  let array = []
    // for(let i = 0 ; i < politicians.length ; i++){
    //   array.push(politicians[i].split(','))
    // }

    // query = 'insert into politicians values '
    // for(let i = 1 ; i < array.length-1 ; i++){
    //   let temp = ['null']
    //   for(let j = 0 ; j < array[i].length ; j++){
    //     if(j === 3){
    //       temp.push(Number(array[i][j]))
    //     }else{
    //       temp.push(`"${array[i][j]}"`)
    //     }
    //   }
    //   query += `(${temp}),`
    // }
    // let string = query.substring(0,[query.length-1])
    // db.all(string, function(err) {if (err) throw err})
    //=====================================================================
    //======================================================================
    // for(let i = 0 ; i < voters.length ; i++){
    //   array.push(voters[i].split(','))
    // }

    // query = 'insert into voters values '
    // for(let i = 1 ; i < array.length-1 ; i++){
    //   let temp = ['null']
    //   for(let j = 0 ; j < array[i].length ; j++){
    //     if(j === 3){
    //       temp.push(Number(array[i][j]))
    //     }else{
    //       temp.push(`"${array[i][j]}"`)
    //     }
    //   }
    //   query += `(${temp}),`
    // }
    // let string = query.substring(0,[query.length-1])

    // db.all(string, function(err) {if (err) throw err})
    //===================================================================
    //===================================================================
    // for(let i = 0 ; i < votes.length ; i++){
    //   array.push(votes[i].split(','))
    // }

    // query = 'insert into votes values '
    // for(let i = 1 ; i < array.length-1 ; i++){
    //   let temp = []
    //   for(let j = 0 ; j < array[i].length ; j++){
    //       temp.push(`${array[i][j]}`)
    //   }
    //   query += `(${temp}),`
    // }
    // let string = query.substring(0,[query.length-1])

    // db.all(string, function(err) {if (err) throw err})


  });
   
  db.close();