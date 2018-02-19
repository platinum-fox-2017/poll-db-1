const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

function insertVoter(first_name, last_name, gender, age){
  db.run(`INSERT INTO Voters(first_name, last_name, gender, age)
      VALUES($first_name, $last_name, $gender, $age)`,{
        $first_name: first_name,
        $last_name: last_name,
        $gender: gender,
        $age: age
      })
}

function instertPolitician(name, party, location, grade_current){
  db.run(`INSERT INTO Politicians(name, party, location, grade_current)
    VALUES($name, $party, $location, $grade_current)`,{
      $name: name,
      $party: party,
      $location: location,
      $grade_current: grade_current
      })
}

// insertVoter('Fachrizal', 'Gita', 'male', 20);
// instertPolitician('Devalensio', 'Gerindra', 'Bogor', 11.48);

function updateVoter(id, first_name, last_name, gender, age){
  db.run(`UPDATE Voters SET first_name = '${first_name}', last_name = '${last_name}', gender = '${gender}', age = ${age} WHERE id = ${id}`)
}

function updatePolitician(id, name, party, location, grade_current){
  db.run(`UPDATE Politicians SET name = '${name}', party = '${party}', location = '${location}', grade_current = ${grade_current} WHERE id = ${id}`)
}

// updateVoter(152, 'Fachrizal', 'Gita', 'male', 25);
// updatePolitician(21, 'Devalensio', 'PKS', 'Bogor', 11.48);

function deleteData(table, id){
  db.run(`DELETE FROM '${table}' WHERE id = ${id} `)
}

// deleteData('Voters', 152);
