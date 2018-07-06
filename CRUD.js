'use strict'
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

const insertData = (table,param) => {
  let input = table.toLowerCase()
  if(input === 'politicians') {
    db.run(`INSERT INTO Politicians (name,party,location,grade_current)
    VALUES($name,$party,$location,$grade_current)`,{
      $name: param.name,
      $party: param.party,
      $location: param.location,
      $grade_current: param.grade_current
    })
  } else if(input === 'voters') {
    db.run(`INSERT INTO Voters (first_name,last_name,gender,age)
    VALUES($first_name,$last_name,$gender,$age)`,{
      $first_name: param.first_name,
      $last_name: param.last_name,
      $gender: param.gender,
      $age:
    })
  } else if(input === 'votes') {
    db.run(`INSERT INTO votes (voterId,politicianId)
    VALUES($voterId,$politicianId)`,{
      $voterId: param.voterId,
      $politicianid: param.politicianId
    })
  }
}

const deleteData = (table,id) => {
  db.run(`DELETE FROM '${table}' WHERE id = ${id}`)
}

const updatePolitician = (id,name,party,location,grade_current) => {
  db.run(`UPDATE Politicians SET name = "${name}", party = "${party}", location = "${location}", grade_current = ${grade_current}
  WHERE id = ${id}`)
}

const updateVoters = (id,first_name,last_name,gender,age) => {
  db.run(`UPDATE Voters SET first_name = "${first_name}", last_name = "${last_name}", gender = "${gender}", age = ${age}
  WHERE id = ${id}`)
}

const updateVotes = (id,voterId,politicianId) => {
  db.run(`UPDATE Votes SET voterId = ${voterId}, politicianId = ${politicianId} WHERE id = ${id}`)
}
