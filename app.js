const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database.db')
const fs = require('fs')

const insertData = (table, input) => {
    if (table === 'Politician') {
        db.run(`INSERT INTO ${table} VALUES (
            NULL,
            '${input.name}',
            '${input.party}',
            '${input.location}',
            ${input.grade_current}
        );`)
    } else if (table === 'Voter') {
        db.run(`INSERT INTO ${table} VALUES (
            NULL,
            '${input.first_name}',
            '${input.last_name}',
            '${input.gender}',
            ${input.age}
        );`)
    } else if (table === 'Vote') {
        db.run(`INSERT INTO ${table} VALUES (
            NULL,
            ${input.politicianId},
            ${input.votersId}
        );`)
    }
}

const deleteData = (table, id) => {
    db.run(`
    DELETE FROM ${table} WHERE id = ${id}
    `)
}

const updateData = (table, column, data, id) => {
    db.run(`UPDATE ${table}
    SET ${column} = '${data}'
    WHERE id = ${id};`)
}

let dataPolitician = {
    name: "Andrew",
    party: "Freedom",
    location: "ID",
    grade_current: 30.0
}

let datavoter = {
    first_name: 'Andrew',
    last_name: 'Kusuma',
    gender: 'male',
    age: 25
}

let datavote = {
    politicianId: 21,
    votersId: 150
}

// insertData('Politician', dataPolitician)
// insertData('Voter', datavoter)
// insertData('Vote', datavote)
// deleteData('Politician', 21)
// updateData('Politician', 'name', 'aaaaa', 23)

// const selectData =
db.all(`select politician.name,
politician.party,
politician.grade_current
from politician where politician.party = 'R'
AND
politician.grade_current
BETWEEN 9 AND 11;`, (err, data) => {
        if (err) {
            console.log(err)

        } else {
            console.log(data)

        }
    })

db.all(`SELECT COUNT(*) as totalVote,
name
from Politician INNER JOIN Vote ON Politician.id = Vote.politicianId
WHERE Politician.name = 'Olympia Snowe'`, (err, data) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log(data)

        }
    })

db.all(``)
