const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

class Manipulate {
    constructor(first_name,last_name,gender,age){
        this.first_name = first_name;
        this.last_name = last_name;
        this.gender = gender;
        this.age = age;
    }
    static create(object){
        db.run(`insert into voter(first_name,last_name,gender,age)
        values("${object.first_name}",'${object.last_name}','${object.gender}','${object.age}')`);
    }
    static update(object,id){
        db.run(`update voter 
        set first_name = "${object.first_name}",
            last_name = "${object.last_name}",
            gender = '${object.gender}',
            age = '${object.age}'
            where id = '${id}'`);
    }
    static delete(id){
        db.run(`delete from voter where id = '${id}'`);
    }
}

let dennis = new Manipulate('dennis','wong','monster',25);
// Manipulate.create(dennis);
let duncan = new Manipulate('Duncan',"O'Reilly",'male',75);
// Manipulate.update(duncan,25);
Manipulate.delete(151);
