const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

function insertPoliticians(name,party,location,grade_current){
    db.run(`insert into Politicians values(null,"${name}","${party}","${location}",${grade_current})`)
}

function insertVoters(first_name,last_name,gender,age){
    db.run(`insert into Voters values(null,"${first_name}","${last_name}","${gender}","${age}")`)
}

// insertPoliticians('reza','demokrat','jakarta',100)
// insertVoters('gustaf','rohimah','female',20)
//================================================================================================
function updatePoliticians(id,name,party,location,grade_current){
    db.run(`update Politicians set name = "${name}",party = "${party}",
     location = "${location}",grade_current = ${grade_current} where id = ${id}`)
}

function updateVoters(id,first_name,last_name,gender,age){
    db.run(`update Voters set first_name = "${first_name}",last_name = "${last_name}",
    gender = "${gender}", age = "${age}" where id = ${id}`)
}

// updatePoliticians(21,'kevin','pan','bandung',100)
// updateVoters(151,'david','harry','male',25)
//========================================================================================

function deletePoliticians(id){
    db.run(`delete from Politicians where id = ${id}`)
}

function deleteVoters(id){
    db.run(`delete from Voters where id = ${id}`)
}

// deletePoliticians(21)
// deleteVoters(151)