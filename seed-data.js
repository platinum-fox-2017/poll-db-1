// Import SQLite3 Modul
const sqlite3 = require('sqlite3').verbose();

const fs = require('fs')

// Database Object
let db = new sqlite3.Database('poll.db')

class ReadData{
    constructor(){
        this.data = []
    }


    readFile(source,callback){
        fs.readFile(source,'UTF-8', (err, data) => {
            if (err){
                throw err;
            } else{
                let splitData = data.split('\n')
                let newData = []
                for(let i = 0; i < splitData.length; i++){
                    let splitComma = splitData[i].split(",")
                    newData.push(splitComma)
                }
                
                callback(newData)
            }
        });
    }

    processData(source,callback){
        this.readFile(source,(readFileData)=>{
            let convertData = []
            for(let i = 1; i < readFileData.length; i++){
                let obj = {}
                for(let j = 0;j < readFileData[i].length; j++){
                    obj[readFileData[0][j]] = readFileData[i][j]
                }
                convertData.push(obj)
            }

            callback(convertData)
        })
    }

    updateTable(object,nameTable,id){
        let string = `SET `
        let obj = {}
        Object.keys(object).forEach(function(key,index){
            if(index === Object.keys(object).length - 1){
                string += `${key} = $${key}`
            }else{
                string += `${key} = $${key},`
            }
            obj[`$${key}`] = `${object[key]}`
        })
        db.run(`UPDATE ${nameTable}
                    ${string}
                    WHERE id = ${id};`,obj)
    }

    deleteTable(nameTable,id){
        db.run(`DELETE FROM ${nameTable}
                WHERE id = ${id};`)
    }

    insert(object,nameTable){
        let string = `null, `
        Object.keys(object).forEach((key,index)=>{
            if(key === 'voterId'){
                string += `${Number(object[key])},`
            }else if(key === 'politicianId'){
                string += Number(object[key])
            }else if(key === 'age' && Object.keys(object).length - 1){
                string += Number(object[key])
            }else if(index === Object.keys(object).length - 1){
                string += `"${object[key]}"`
            }else{
                string += `"${object[key]}",`
            }
            
        })
        db.run(`INSERT INTO ${nameTable}
                    VALUES (${string});`)
    }

    seed_data(source,table){
        this.processData(source,(convertData)=>{
            for(let i = 0; i < convertData.length; i++){
                let string = ""
                Object.keys(convertData[i]).forEach(function(key,index){

                    if(key === 'voterId'){
                        string += `${Number(convertData[i][key])},`
                    }else if(key === 'politicianId'){
                        string += Number(convertData[i][key])
                    }else if(key === 'age' && Object.keys(convertData[i]).length - 1){
                        string += Number(convertData[i][key])
                    }else if(index === Object.keys(convertData[i]).length - 1){
                        string += `"${convertData[i][key]}"`
                    }else{
                        string += `"${convertData[i][key]}",`
                    }
                })
                let text = `null, ${string}`
                
                db.run(`INSERT INTO ${table}
                    VALUES(${text});`)
            }
        })
    }
}

let data = new ReadData()

let votersObj = {
    first_name: "Kevin",
    last_name: "Ajah",
    gender: "male",
    age: 24
}

// data.seed_data('voters.csv','Voters')
// Update Param 1 bentuk object, param 2 string nama table
// where for ID
// data.updateTable(votersObj,'Voters',421)
// insert param 1 bentuk object, param 2 nama table
// data.insert(votersObj,'Voters')
// data.deleteTable('Voters',421)
