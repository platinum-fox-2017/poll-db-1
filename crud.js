const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./data.db')

function insertData(myName, myParty, myLocation, myGrade) {
  db.run(`INSERT INTO Politicians(name, party, location, grade_current)
          VALUES($name, $party, $location, $grade_current)`,
          {
            $name: myName,
            $party: myParty,
            $location: myLocation,
            $grade_current: myGrade
          })
}

function updateData(location, id) {
  db.run(`UPDATE Politicians SET location = '${location}' WHERE id = ${id}`)
}

function deleteData(table, id) {
  db.run(`DELETE FROM '${table}' WHERE id = ${id}`)
}

insertData('Valensio Deva', 'D', 'ID', 8.1234)
updateData('IND', 21)
deleteData('Politicians', 23)
