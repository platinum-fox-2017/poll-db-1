const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('polldb.db');

// Insert data ke tabel yang diinginkan
// Update data yang diinginkan berdasarkan id data
// Delete data yang diinginkan berdasarkan id data

const insertDataPolitician = function(name,party,location,grade_current){
  db.run(`insert into Politicians (name,party,location,grade_current)
  values ("${name}","${party}","${location}",${grade_current})`)

}

// insertDataPolitician("Joko","PDI","Jakbar",10.23456)

const insertDataVoter = function(first_name, last_name, gender, age){
  db.run(`insert into Voters (first_name, last_name, gender, age)
  values ("${first_name}","${last_name}","${gender}",${age})`)

}
// insertDataVoter("ani","lunch","female",30)

const updateDataPolitician = (obj)=>{
  db.run(`update Politicians set name = "${obj.name}",
  party = "${obj.party}",
  location = "${obj.location}",
  grade_current = ${obj.grade_current}
  where id = ${obj.id}`)
}
const updateDataVoter = (objVoter)=>{
  db.run(`update Voters set first_name = "${objVoter.first_name}",
  last_name = "${objVoter.last_name}",
  gender = "${objVoter.gender}",
  age = ${objVoter.age}
  where id = ${objVoter.id}`)
}
let update = {id:21,
  name: 'joko gilbert',
  party : 'Demokrat',
  location : 'jabar',
  grade_current : 11.9876543}

// updateDataPolitician(update)
let voter = {
  id:151,
  first_name : "Abigail",
  last_name : "B'ruin",
  gender : "female",
  age : 32
}
// updateDataVoter(voter)

const deleteData = (tabel,id)=>{
  db.run(`delete from ${tabel}
  where id =${id}`)

}

deleteData('Politicians',21)