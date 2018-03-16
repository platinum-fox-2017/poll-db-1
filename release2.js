"use strict"
const sqlite = require('sqlite3').verbose();

const db = new sqlite.Database('./voting.db')

const argv = process.argv;

function readArgv(input1,input2,input3,input4,input5,input6,input7) {
  if(input1==='insert'){
    insertData(input2,input3,input4,input5,input6)
  }
  else if (input1==='update') {
    updateData(input2,input3,input4,input5,input6,input7)
  }
  else if (input1==='delete') {
    deleteData(input2,input3)
  }
}
function insertData(input2,input3,input4,input5,input6){
  //for(let i=0;i<arrPol.length;i++){
  if(input2==='politicians')
  {
    db.serialize(function() {
      let stmt = db.prepare("INSERT INTO politicians (name, party, location,grade_current) VALUES (?,?,?,?)");
      stmt.run(input3,input4,input5,input6);
      stmt.finalize();
    });
    db.close();
  }
  else if(input2==='voters')
  {
    db.serialize(function() {
      let stmt = db.prepare("INSERT INTO voters (first_name, last_name, gender,age) VALUES (?,?,?,?)");
      stmt.run(input3,input4,input5,input6);
      stmt.finalize();
    });
    db.close();
  }
  else if(input2==='votes')
  {
    db.serialize(function() {
      let stmt = db.prepare("INSERT INTO votes (voterId,politiciansId) VALUES (?,?)");
      stmt.run(input3,input4);
      stmt.finalize();
    });
    db.close();
  }
}

function updateData(input2,input3,input4,input5,input6,input7){
  //for(let i=0;i<arrPol.length;i++){
  if(input2==='politicians')
  {
    db.serialize(function() {
      let stmt = db.prepare("UPDATE politicians SET name=?,party=?,location=?,grade_current=? WHERE politiciansId=?");
      stmt.run(input4,input5,input6,input7,input3);
      stmt.finalize();
    });
    db.close();
  }
  else if(input2==='voters')
  {
    db.serialize(function() {
        let stmt = db.prepare("UPDATE voters SET first_name=?,last_name=?,gender=?,age=? WHERE votersId=?");
      stmt.run(input4,input5,input6,input7,input3);
      stmt.finalize();
    });
    db.close();
  }
  else if(input2==='votes')
  {
    db.serialize(function() {
      let stmt = db.prepare("UPDATE votes SET voterId=?,politiciansId=? WHERE votesId=?");
      stmt.run(input4,input5,input3);
      stmt.finalize();
    });
    db.close();
  }
}

function deleteData(input2,input3){
  if(input2==='politicians')
  {
    db.serialize(function() {
      let stmt = db.prepare("DELETE FROM politicians WHERE politiciansId=?");
      stmt.run(input3);
      stmt.finalize();
    });
    db.close();
  }
  else if(input2==='voters')
  {
    db.serialize(function() {
      let stmt = db.prepare("DELETE FROM voters WHERE votersId=?");
      stmt.run(input3);
      stmt.finalize();
    });
    db.close();
  }
  else if(input2==='votes')
  {
    db.serialize(function() {
      let stmt = db.prepare("DELETE FROM votes WHERE votesId=?");
      stmt.run(input3);
      stmt.finalize();
    });
    db.close();
  }
}

readArgv(argv[2],argv[3],argv[4],argv[5],argv[6],argv[7],argv[8]);
