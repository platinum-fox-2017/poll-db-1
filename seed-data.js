const sqlite3 = require('sqlite3').verbose();
const fs = require('fs')

let db = new sqlite3.Database('./poll.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the database.');
  });

function readData(callback, closeDb){
    fs.readFile('./voters.csv', 'UTF-8', (err, data) => {
        if (err) throw err;
        let dataToArr = data.split('\n');
        let result = [];
        for(let i=0; i<dataToArr.length; i++){
            let row = dataToArr[i].split(',');
            result.push(row);
        }
        callback(result, closeDb);
      });
}

function insertData(data, callback){
    for(let i=1; i<data.length-1; i++){
        let sql = `INSERT INTO Voters (firstName, lastName, gender, age) Values ('${data[i][0]}', '${data[i][1]}', '${data[i][2]}', ${data[i][3]})`;
        db.all(sql, [], (err) => {
            if (err) {
              throw err;
            }
            console.log(`${data[i][0]} ${data[i][1]} inserted`);
          });
    }
    callback();
}

function closeDb(){
    db.close();
    console.log('Database closed.')
}

readData(insertData, closeDb);
