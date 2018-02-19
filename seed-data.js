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
      let arrData = []
      for(let i = 1; i < list.length; i++) {
        arrData.push(list[i].split(','))
      }
      for(let i = 0; i < arrData.length; i++) {
        if(arrData[i] !== '') {
          db.run(`INSERT INTO Politicians (name,party,location,grade_current)
          VALUES($name,$party,$location,$grade_current)`,{
            $name: arrData[i][0],
            $party: arrData[i][1],
            $location: arrData[i][2],
            $grade_current: arrData[i][3]
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
    let arrData = []
    for(let i = 1; i < list.length; i++) {
      arrData.push(list[i].split(','))
    }
    for(let i = 0; i < arrData.length; i++) {
      if(arrData[i] !== '') {
        db.run(`INSERT INTO Voters (first_name,last_name,gender,age)
        VALUES($first_name,$last_name,$gender,$age)`,{
          $first_name: arrData[i][0],
          $last_name: arrData[i][1],
          $gender: arrData[i][2],
          $age: arrData[i][3]
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
    let arrData = []
    for(let i = 1; i < list.length; i++) {
      arrData.push(list[i].split(','))
    }
    for(let i = 0; i < arrData.length; i++) {
      if(arrData[i] !== '') {
        db.run(`INSERT INTO Votes (voterId,politicianId)
        VALUES($voterId,$politicianId)`,{
          $voterId: arrData[i][0],
          $politicianId: arrData[i][1],
        })
      }
    }
  }
}

Politicians.insertData();
Voters.insertData();
Votes.insertData();
