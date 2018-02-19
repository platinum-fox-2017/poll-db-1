const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');
const Table = require('cli-table');

db.all(`SELECT name, party, grade_current FROM Politicians
  WHERE party = 'R' AND grade_current BETWEEN 9 AND 11`,
  (error, data) => {
    let table = new Table({
      head: ['Name', 'Party', 'Grade Current'],
      colWidths: [20, 10, 15]
      });
    for(let i=0; i<data.length; i++){
      table.push([data[i].name, data[i].party, data[i].grade_current])
    }
    console.log(table.toString());
  }
);

db.all(`SELECT COUNT(*) as totalVote, name FROM Votes
  INNER JOIN Politicians ON Votes.politicianId = Politicians.id
  WHERE Politicians.name = 'Olympia Snowe'`,
  (error, data) => {
    let table = new Table({
      head: ['Total Vote', 'Name'],
      colWidths: [20, 20]
      });
      table.push([data[0].totalVote, data[0].name])
    console.log(table.toString());
  }
);

db.all(`SELECT name, COUNT(*) as totalVote FROM Politicians
  INNER JOIN Votes ON Politicians.id = Votes.politicianId
  WHERE Politicians.name LIKE 'Adam%'
  GROUP BY name`,
  (error, data) => {
    let table = new Table({
      head: ['Name', 'Total Vote'],
      colWidths: [20, 20]
      });
    for(let i=0; i<data.length; i++){
      table.push([data[i].name, data[i].totalVote])
    }
    console.log(table.toString());
  }
);

db.all(`SELECT COUNT(*) as totalVote, name, party, location FROM Votes
  LEFT JOIN Politicians ON Votes.politicianId = Politicians.id
  GROUP BY name
  ORDER BY totalVote desc
  LIMIT 3`,
  (err, data) => {
    let table = new Table({
      head: ['Total Vote', 'Name', 'Party', 'Location'],
      colWidths: [20, 20, 10, 10]
      });
    for(let i=0; i<data.length; i++){
      table.push([data[i].totalVote, data[i].name, data[i].party, data[i].location])
    }
    console.log(table.toString());
  }
);

db.all(`SELECT first_name, last_name, gender, age FROM Voters
  LEFT JOIN Votes ON Voters.id = Votes.voterId
  WHERE Votes.politicianId = 17
  GROUP BY first_name`,
  (err, data) => {
    let table = new Table({
      head: ['First Name', 'Last Name', 'Gender', 'Age'],
      colWidths: [20, 20, 10, 10]
      });
    for(let i=0; i<data.length; i++){
      table.push([data[i].first_name, data[i].last_name, data[i].gender, data[i].age])
    }
    console.log(table.toString());
  }
);
