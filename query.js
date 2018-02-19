const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

// database
// let poll_db = new sqlite3.Database('./poll.db', function(err){
//   if (err){
//     console.log(err);
//   }
// });
// poll_db.close();

function insertTableData(tableName, tableParams){
  // insert into database
  let poll_db = new sqlite3.Database('./poll.db', function(err){
    if (err){
      console.log(err);
    }
  });
  // prep
  let questionMarks = [];
  // tableParams.forEach(() =>{ questionMarks.push('?') });
  for (let i = 0; i < tableParams.length; i++) {
    questionMarks.push('?');
  }
  poll_db.run(`INSERT INTO ${tableName} VALUES (${questionMarks.join(',')})`, tableParams, function(err){
    if (err) {
      console.log(err);
    } else {
      console.log('saved!')
    }
  });
  poll_db.close();
}

function updateTableData(tableName, columnToUpdate, newValue, whereCond){
  // update into database
  let poll_db = new sqlite3.Database('./poll.db', function(err){
    if (err){
      console.log(err);
    }
  });

  poll_db.run(`UPDATE ${tableName} SET ${columnToUpdate} = '${newValue}' WHERE ${whereCond}`, function(err){
    if (err) {
      console.log(err);
    } else {
      console.log('updated!')
    }
  });
  poll_db.close();
}

function deleteData(tableName, whereCond){
  // delete into database
  let poll_db = new sqlite3.Database('./poll.db', function(err){
    if (err){
      console.log(err);
    }
  });

  poll_db.run(`DELETE FROM ${tableName} WHERE ${whereCond}`, function(err){
    if (err) {
      console.log(err);
    } else {
      console.log('deleted!')
    }
  });
  poll_db.close();
}


// Driver code
// ###############################
// insertTableData('voter', [null, 'Teddy', 'Lisman', 'male', '29']);
// updateTableData('voter', 'first_name', 'Fanny', 'voter_id = 154');
// deleteData('voter', 'voter_id = 152');
