const fs = require ('fs')
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

class Politicians {
    constructor() {
    }

    static getData() {
      let data = fs.readFileSync('politicians.csv','utf-8').split('\n')
      return data
    }

    static insertData() {
      let list = this.getData()
      for(let i = 1; i < list.length; i++) {
        if(list[i] !== '') {
          let data = list[i].split(',')
          db.run(`INSERT INTO Politicians (name,party,location,grade_current)
          VALUES($name,$party,$location,$grade_current)`,{
            $name: data[0],
            $party: data[1],
            $location: data[2],
            $grade_current: data[3]
          })
        }
      }
    }
}

class Voters {
  constructor() {

  }

  static getData() {
    let data = fs.readFileSync('voters.csv','utf-8').split('\n')
    return data
  }

  static insertData() {
    let list = this.getData()
    for(let i = 1; i < list.length; i++) {
      if(list[i] !== '') {
        let data = list[i].split(',')
        db.run(`INSERT INTO Voters (first_name,last_name,gender,age)
        VALUES($first_name,$last_name,$gender,$age)`,{
          $first_name: data[0],
          $last_name: data[1],
          $gender: data[2],
          $age: data[3]
        })
      }
    }
  }
}

class Votes {
  constructor() {

  }

  static getData() {
    let data = fs.readFileSync('votes.csv','utf-8').split('\n')
    return data
  }

  static insertData() {
    let list = this.getData()
    for(let i = 1; i < list.length; i++) {
      if(list[i] !== '') {
        let data = list[i].split(',')
        db.run(`INSERT INTO Votes (voterId,politicianId)
        VALUES($voterId,$politicianId)`,{
          $voterId: data[0],
          $politicianId: data[1],
        })
      }
    }
  }
}
// console.log(Politicians.getData())
Politicians.insertData();
Voters.insertData();
Votes.insertData();
