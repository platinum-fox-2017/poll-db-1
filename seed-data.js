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
      let query = `INSERT INTO Politicians (name,party,location,grade_current) VALUES `
      for(let i = 0; i < arrData.length; i++) {
        if(arrData[i] !== '') {
        query+=`("${arrData[i][0]}","${arrData[i][1]}","${arrData[i][2]}",${arrData[i][3]}),`
        }
      }
      let newQuery = query.slice(0,query.length-1)
      db.run(newQuery)
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
      if(list[i] !== '') {
      arrData.push(list[i].split(','))
      }
    }
    let query = `INSERT INTO Voters (first_name,last_name,gender,age) VALUES `
    for(let i = 0; i <= arrData.length-1; i++) {
      if(arrData[i] !== '') {
      query+=`("${arrData[i][0]}","${arrData[i][1]}","${arrData[i][2]}",${arrData[i][3]}),`
      }
    }
    let newQuery = query.slice(0,query.length-1)
    db.run(newQuery)
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
      if(list[i] !== '') {
      arrData.push(list[i].split(','))
      }
    }
    let query = `INSERT INTO Votes (voterId,politicianId) VALUES `
    for(let i = 0; i < arrData.length; i++) {
      if(arrData[i] !== '') {
      query+=`(${arrData[i][0]},${arrData[i][1]}),`
      }
    }
    let newQuery = query.slice(0,query.length-1)
    db.run(newQuery)
  }
}

Politicians.insertData();
Voters.insertData();
Votes.insertData();
